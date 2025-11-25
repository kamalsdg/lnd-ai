"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

type TermsDialogProps = {
  open: boolean
  onAccept: () => void
  onDecline: () => void
}

export function TermsDialog({ open, onAccept, onDecline }: TermsDialogProps) {
  const [agreed, setAgreed] = useState(false)

  const handleAccept = () => {
    if (agreed) {
      onAccept()
      setAgreed(false) // Reset for next time
    }
  }

  const handleDecline = () => {
    setAgreed(false)
    onDecline()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleDecline()}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read and accept the terms and conditions to use the voice agent.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By using this voice agent service, you agree to be bound by these terms and conditions. 
                If you do not agree to these terms, please do not use the service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Voice Data Collection</h3>
              <p className="text-muted-foreground">
                This service requires access to your microphone to function. Voice data will be processed 
                in real-time and may be temporarily stored for the duration of your conversation. We do not 
                permanently store voice recordings without your explicit consent.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Privacy and Data Protection</h3>
              <p className="text-muted-foreground">
                We are committed to protecting your privacy. All conversations are encrypted during transmission. 
                Personal information shared during conversations will be handled in accordance with our Privacy Policy 
                and applicable data protection laws.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Service Availability</h3>
              <p className="text-muted-foreground">
                We strive to maintain service availability but cannot guarantee uninterrupted access. 
                The service may be temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">5. User Responsibilities</h3>
              <p className="text-muted-foreground">
                You agree to use the voice agent service responsibly and lawfully. You must not use the service 
                for any illegal activities, harassment, or to transmit harmful content.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">6. Limitation of Liability</h3>
              <p className="text-muted-foreground">
                The voice agent is provided "as is" without warranties of any kind. We are not liable for any 
                damages arising from your use of the service, including but not limited to direct, indirect, 
                incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">7. Changes to Terms</h3>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Continued use of the service after 
                changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">8. Contact Information</h3>
              <p className="text-muted-foreground">
                If you have questions about these terms, please contact us through our support channels.
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex items-center space-x-2 py-4">
          <Checkbox 
            id="terms-agreement" 
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
          />
          <Label 
            htmlFor="terms-agreement" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and agree to the terms and conditions
          </Label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept} disabled={!agreed}>
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
