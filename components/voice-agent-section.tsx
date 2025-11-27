"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, Volume2, Phone, Loader2 } from "lucide-react"
import { Conversation, ConversationContent, ConversationScrollButton, ConversationEmptyState } from "@/components/ui/conversation"
import { ConversationBar, ConversationBarRef } from "@/components/ui/conversation-bar"
import { TermsDialog } from "@/components/ui/terms-dialog"
import { toast } from "sonner"

// ConversationMessage interface for conversation history
type ConversationMessage = {
  id: string
  source: "user" | "ai"
  message: string
  timestamp: Date
}

// Inline Message component for testing
function MessageComponent({ source, content, timestamp }: { source: "user" | "ai"; content: string; timestamp?: Date }) {
  const isUser = source === "user"
  return (
    <div className={`flex w-full gap-3 px-4 py-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[80%] flex-col gap-1 rounded-lg px-4 py-2 shadow-sm ${isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </div>
        {timestamp && (
          <div className={`text-xs opacity-70 ${isUser ? "text-right" : "text-left"}`}>
            {timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
}

const TERMS_ACCEPTANCE_KEY = "voice-ai-terms-accepted"

export default function VoiceAgentSection() {
  // State management
  const [agentId] = useState(process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "")
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [showTermsDialog, setShowTermsDialog] = useState<boolean>(false)
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const [pendingConnection, setPendingConnection] = useState<boolean>(false)
  const conversationBarRef = useRef<ConversationBarRef>(null)

  // Check localStorage on mount to see if terms were previously accepted
  useEffect(() => {
    const hasAccepted = localStorage.getItem(TERMS_ACCEPTANCE_KEY) === "true"
    if (hasAccepted) {
      setTermsAccepted(true)
    }
  }, [])

  // Callback functions for conversation events
  const handleMessage = (message: any) => {
    // Handle different possible message formats
    const source = message.source || message.from || "ai"
    const content = message.message || message.content || message.text || String(message)
    
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        source: source as "user" | "ai",
        message: content,
        timestamp: new Date(),
      },
    ])
  }

  const handleConnecting = () => {
    setIsConnecting(true)
    setIsConnected(false)
    toast.info("Connecting...", {
      description: "Establishing connection to voice agent.",
    })
  }

  const handleConnect = () => {
    setIsConnecting(false)
    setIsConnected(true)
    setPendingConnection(false)
    toast.success("Connected", {
      description: "Voice agent is ready. You can start speaking now.",
    })
  }

  const handleTermsAccept = () => {
    setTermsAccepted(true)
    setShowTermsDialog(false)
    // Save acceptance to localStorage
    localStorage.setItem(TERMS_ACCEPTANCE_KEY, "true")
    
    if (pendingConnection) {
      setPendingConnection(false)
      // Automatically start the connection after accepting terms
      setTimeout(() => {
        conversationBarRef.current?.triggerConnection()
      }, 100)
    }
    
    toast.success("Terms Accepted", {
      description: "Connecting to voice agent...",
    })
  }

  const handleTermsDecline = () => {
    setShowTermsDialog(false)
    setPendingConnection(false)
    toast.info("Terms Declined", {
      description: "You must accept the terms to use the voice agent.",
    })
  }

  const handleConnectionRequest = () => {
    if (!termsAccepted) {
      setPendingConnection(true)
      setShowTermsDialog(true)
      return false
    }
    return true
  }

  const handleDisconnect = () => {
    setIsConnecting(false)
    setIsConnected(false)
    toast.info("Disconnected", {
      description: "Voice agent connection has been closed.",
    })
  }

  const handleError = (error: Error) => {
    console.error("Connection error:", error)
    setIsConnecting(false)
    setIsConnected(false)

    // Determine error type and show appropriate user-friendly message
    const errorMessage = error.message.toLowerCase()

    if (errorMessage.includes("permission") || errorMessage.includes("notallowederror")) {
      toast.error("Microphone Access Required", {
        description: "Please allow microphone access in your browser settings to use voice features.",
      })
    } else if (errorMessage.includes("notfounderror") || errorMessage.includes("no microphone")) {
      toast.error("Microphone Not Found", {
        description: "No microphone detected. Please connect a microphone and try again.",
      })
    } else if (errorMessage.includes("network") || errorMessage.includes("connection") || errorMessage.includes("timeout")) {
      toast.error("Connection Failed", {
        description: "Unable to connect to the voice agent. Please check your internet connection and try again.",
      })
    } else if (errorMessage.includes("agent") || errorMessage.includes("invalid")) {
      toast.error("Invalid Agent Configuration", {
        description: "Please check your Agent ID and try again.",
      })
    } else {
      toast.error("Connection Error", {
        description: "Unable to connect to the voice agent. Please try again later.",
      })
    }
  }



  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/sdg-logo.jpg"
                alt="SDG Logo"
                width={160}
                height={53}
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              {termsAccepted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTermsDialog(true)}
                  className="text-muted-foreground"
                >
                  View Terms
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Phone className="h-4 w-4" />
            Powered by ElevenLabs
          </div>

          <h1 className="mb-6 text-balance font-sans text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Intelligent Voice Assistant
          </h1>

          <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Experience natural conversations with our AI-powered voice agent. Seamlessly integrated, professionally
            designed, and ready to transform your customer interactions.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Mic className="mr-2 h-5 w-5" />
              Start Conversation
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Voice Agent Integration Section */}
      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-balance font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Voice Agent Integration
            </h2>
            <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
              Connect your ElevenLabs voice agent below to enable real-time voice interactions.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">

            {/* Connection Status */}
            {(isConnecting || isConnected) && (
              <div className="mb-4 flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
                {isConnecting && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
                    <span className="text-sm font-medium text-foreground">Connecting to voice agent...</span>
                  </>
                )}
                {isConnected && (
                  <>
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Connected - Ready to chat</span>
                  </>
                )}
              </div>
            )}

            {/* Conversation Interface */}
            <Card className="flex flex-col border-2 border-border bg-card shadow-sm overflow-hidden">
              {/* Conversation History */}
              <div className="h-[400px] overflow-hidden">
                <Conversation className="h-full" initial="smooth" resize="smooth">
                  <ConversationContent>
                    {messages.length === 0 ? (
                      <ConversationEmptyState
                        icon={<Mic className="h-10 w-10" />}
                        title="Start a conversation"
                        description="Click the phone button below to connect with the AI voice agent"
                      />
                    ) : (
                      messages.map((msg) => (
                        <MessageComponent
                          key={msg.id}
                          source={msg.source}
                          content={msg.message}
                          timestamp={msg.timestamp}
                        />
                      ))
                    )}
                  </ConversationContent>
                  <ConversationScrollButton />
                </Conversation>
              </div>

              {/* Conversation Bar */}
              <ConversationBar
                ref={conversationBarRef}
                agentId={agentId}
                onConnecting={handleConnecting}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onError={handleError}
                onMessage={handleMessage}
                onConnectionRequest={handleConnectionRequest}
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Natural Conversations</h3>
              <p className="leading-relaxed text-muted-foreground">
                Engage users with lifelike voice interactions powered by advanced AI technology.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Volume2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Professional Quality</h3>
              <p className="leading-relaxed text-muted-foreground">
                Crystal-clear audio with enterprise-grade reliability and performance.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Seamless Integration</h3>
              <p className="leading-relaxed text-muted-foreground">
                Quick setup with minimal configuration required. Ready in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions Dialog */}
      <TermsDialog
        open={showTermsDialog}
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
      />

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SD Guthrie Berhad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
