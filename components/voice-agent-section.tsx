"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, Volume2, Phone } from "lucide-react"

export default function VoiceAgentSection() {
  const [agentId, setAgentId] = useState("")

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Volume2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Voice AI</span>
            </div>
            <Button variant="outline" size="sm">
              Documentation
            </Button>
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
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Voice Agent Integration
            </h2>
            <p className="mb-12 text-pretty leading-relaxed text-muted-foreground">
              Connect your ElevenLabs voice agent below to enable real-time voice interactions.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="border-2 border-border bg-card p-8 shadow-sm sm:p-12">
              {/* Configuration */}
              <div className="mb-8">
                <label htmlFor="agent-id" className="mb-2 block text-sm font-medium text-foreground">
                  ElevenLabs Agent ID
                </label>
                <input
                  id="agent-id"
                  type="text"
                  placeholder="Enter your agent ID here..."
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  Find your agent ID in the ElevenLabs dashboard under Agent Settings.
                </p>
              </div>

              {/* Agent Embed Area */}
              <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-border bg-secondary/50">
                <div className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
                  {/* Placeholder for ElevenLabs widget */}
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Mic className="h-10 w-10 text-primary" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">Your Voice Agent Will Appear Here</h3>

                  <p className="mb-6 max-w-md text-balance text-sm leading-relaxed text-muted-foreground">
                    Once you configure your ElevenLabs agent ID above, the interactive voice interface will be embedded
                    in this space. Users can click to start speaking with your AI assistant.
                  </p>

                  {/* Integration Instructions */}
                  <div className="mt-8 w-full max-w-md rounded-lg border border-border bg-background p-6 text-left">
                    <h4 className="mb-3 font-semibold text-foreground">Integration Steps:</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          1
                        </span>
                        <span>Create your voice agent in ElevenLabs</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          2
                        </span>
                        <span>Copy the agent ID from your dashboard</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          3
                        </span>
                        <span>Paste it in the field above</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          4
                        </span>
                        <span>Add the ElevenLabs embed script to this component</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!agentId}
                >
                  Configure Agent
                </Button>
              </div>
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

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">© 2025 Voice AI. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-primary">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
