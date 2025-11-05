import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchProfile: {
    name: string;
    avatar: string;
    niche: string;
  };
}

export function MatchModal({ isOpen, onClose, matchProfile }: MatchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                It's a Match!
              </span>
              <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
          <img 
            src={matchProfile.avatar} 
            alt={matchProfile.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          
          <div className="text-center">
            <h3 className="text-xl font-semibold">{matchProfile.name}</h3>
            <Badge variant="secondary" className="mt-2">{matchProfile.niche}</Badge>
          </div>

          <p className="text-sm text-muted-foreground text-center px-4">
            You both liked each other! Start a conversation to explore collaboration opportunities.
          </p>

          <div className="flex flex-col gap-2 w-full mt-4">
            <Button 
              disabled 
              className="w-full relative"
            >
              <Lock className="w-4 h-4 mr-2" />
              Start Chat
              <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">
                Premium
              </Badge>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Keep Swiping
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-2">
            💎 Upgrade to Premium to unlock chat and advanced features
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
