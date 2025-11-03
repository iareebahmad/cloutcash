import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Users, Briefcase, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "creator" | "brand";
  onSuccess?: () => void;
}

// Validation schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  name: z.string().min(1, "Name is required").max(100),
  handle: z.string().min(1, "Handle/Brand name is required").max(100),
  followerCount: z.number().min(0).optional(),
  marketingBudget: z.number().min(0).optional(),
});

export const SignupModal = ({ isOpen, onClose, defaultType = "creator", onSuccess }: SignupModalProps) => {
  const [userType, setUserType] = useState<"creator" | "brand">(defaultType);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [marketingBudget, setMarketingBudget] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validationData = {
        email,
        name,
        handle,
        followerCount: followerCount ? parseInt(followerCount) : undefined,
        marketingBudget: marketingBudget ? parseInt(marketingBudget) : undefined,
      };

      const result = signupSchema.safeParse(validationData);
      if (!result.success) {
        toast({
          title: "Validation Error",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Sign up user
      const redirectUrl = `${window.location.origin}/`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: name,
            user_type: userType,
            handle,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update profile with additional data
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            handle,
            follower_count: userType === "creator" ? parseInt(followerCount || "0") : null,
            marketing_budget: userType === "brand" ? parseInt(marketingBudget || "0") : null,
            niche: "", // Can be added later
            profile_completed: false,
          })
          .eq("user_id", authData.user.id);

        if (profileError) throw profileError;

        // Generate mock matches
        await generateMockMatches(authData.user.id);

        toast({
          title: "Success!",
          description: `Welcome aboard! You're all set to start matching.`,
        });

        // Reset form
        setEmail("");
        setName("");
        setHandle("");
        setFollowerCount("");
        setMarketingBudget("");
        setPassword("");
        onClose();
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockMatches = async (userId: string) => {
    // This would typically be done by an edge function with more sophisticated logic
    // For now, we'll just create a placeholder
    console.log("Mock matches will be generated for user:", userId);
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
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
            />
          </div>

          {userType === "creator" && (
            <div className="space-y-2">
              <Label htmlFor="followers">Follower Count (approx.)</Label>
              <Input
                id="followers"
                type="number"
                placeholder="e.g., 50000"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
              />
            </div>
          )}

          {userType === "brand" && (
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Marketing Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 100000"
                value={marketingBudget}
                onChange={(e) => setMarketingBudget(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Start Matching"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
