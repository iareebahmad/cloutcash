import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  id: string;
  full_name: string;
  user_type: string;
  handle?: string;
  follower_count?: number;
  marketing_budget?: number;
  niche?: string;
  profile_completed: boolean;
}

interface Match {
  id: string;
  match_score: number;
  status: string;
  brand?: Profile;
  creator?: Profile;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfileAndMatches();
    }
  }, [user]);

  const fetchProfileAndMatches = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch matches
      const { data: matchesData, error: matchesError } = await supabase
        .from("matches")
        .select(`
          *,
          creator:profiles!matches_creator_id_fkey(*),
          brand:profiles!matches_brand_id_fkey(*)
        `)
        .or(`creator_id.eq.${profileData.id},brand_id.eq.${profileData.id}`)
        .order("match_score", { ascending: false })
        .limit(3);

      if (matchesError) throw matchesError;
      setMatches(matchesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProfileCompletion = () => {
    if (!profile) return 0;
    let completed = 0;
    const fields = ["full_name", "handle", "niche"];
    
    if (profile.user_type === "creator") {
      fields.push("follower_count");
    } else {
      fields.push("marketing_budget");
    }

    fields.forEach((field) => {
      if (profile[field as keyof Profile]) completed++;
    });

    return Math.round((completed / fields.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion();
  const isCreator = profile?.user_type === "creator";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {profile?.full_name}!
          </h1>
          <p className="text-muted-foreground">
            Your {isCreator ? "creator" : "brand"} dashboard
          </p>
        </div>

        {/* Profile Completion Card */}
        <Card className="mb-8 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Profile Completion
            </CardTitle>
            <CardDescription>
              {profileCompletion === 100
                ? "Your profile is complete! You're getting maximum matches."
                : "Complete your profile to get better matches"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={profileCompletion} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {profileCompletion}% complete
              </p>
              {profileCompletion < 100 && (
                <Button variant="outline" className="w-full sm:w-auto">
                  Complete Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{matches.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-3xl font-bold">
                  {matches.length > 0
                    ? Math.round(
                        matches.reduce((acc, m) => acc + m.match_score, 0) / matches.length
                      )
                    : 0}
                  %
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-3xl font-bold">
                  {matches.filter((m) => m.status === "pending").length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Top 3 Matches</CardTitle>
            <CardDescription>
              {isCreator
                ? "Brands that match your profile and audience"
                : "Creators that match your brand and campaign goals"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {matches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No matches yet. Complete your profile to get matched!
                </p>
                <Button>Start Matching</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => {
                  const matchProfile = isCreator ? match.brand : match.creator;
                  return (
                    <div
                      key={match.id}
                      className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {matchProfile?.full_name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {matchProfile?.handle && `@${matchProfile.handle}`}
                          </p>
                          {matchProfile?.niche && (
                            <Badge variant="secondary">{matchProfile.niche}</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {match.match_score}%
                          </div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Connect
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-8 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-bold mb-2">Ready for More Matches?</h2>
          <p className="text-muted-foreground mb-6">
            Access the full dashboard to see all your matches, analytics, and campaign tools
          </p>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Access Full Dashboard (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
};
