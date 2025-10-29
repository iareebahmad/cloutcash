import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "creator" | "brand";
}

export const SignupModal = ({ isOpen, onClose, defaultType = "creator" }: SignupModalProps) => {
  const [userType, setUserType] = useState<"creator" | "brand">(defaultType);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder backend logic
    toast({
      title: "Success!",
      description: `Welcome aboard! We'll send you an email at ${email} to get started.`,
    });
    
    // Reset form
    setEmail("");
    setName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join CloutCash</DialogTitle>
          <DialogDescription>
            Start matching with the perfect {userType === "creator" ? "brands" : "creators"} today
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            type="button"
            variant={userType === "creator" ? "default" : "outline"}
            onClick={() => setUserType("creator")}
            className="h-auto py-4 flex flex-col items-center gap-2"
          >
            <Users className="h-5 w-5" />
            <span>Creator</span>
          </Button>
          <Button
            type="button"
            variant={userType === "brand" ? "default" : "outline"}
            onClick={() => setUserType("brand")}
            className="h-auto py-4 flex flex-col items-center gap-2"
          >
            <Briefcase className="h-5 w-5" />
            <span>Brand</span>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle">
              {userType === "creator" ? "Instagram Handle" : "Brand Name"}
            </Label>
            <Input
              id="handle"
              placeholder={userType === "creator" ? "@yourhandle" : "Your Brand"}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Start Matching
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
