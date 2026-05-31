"use client";

import { DOC_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";

interface GuestSignupPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const guestBenefits = [
  "Save to History",
  "Access previous generations",
  "Continue generating without limits",
];

export default function GuestSignupPrompt({
  open,
  onOpenChange,
}: GuestSignupPromptProps) {
  const router = useRouter();

  const handleSignUp = () => {
    onOpenChange(false);
    router.push(DOC_ROUTES.AUTH.SIGN_UP);
  };

  const handleLogin = () => {
    onOpenChange(false);
    router.push(DOC_ROUTES.AUTH.LOGIN);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl border-border/60 p-0 overflow-hidden">
        <div className="p-6 space-y-5">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-primary" />
              You’ve used your free guest generation
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Create your account to keep building and unlock your saved design
              workflow.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3">
            {guestBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={handleSignUp}
            >
              Create Free Account
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
