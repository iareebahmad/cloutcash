import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatchFilters as MatchFiltersType } from '@/types/matchmaking';
import { SlidersHorizontal, Lock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MatchFiltersProps {
  onFilterChange: (filters: MatchFiltersType) => void;
}

export function MatchFilters({ onFilterChange }: MatchFiltersProps) {
  const [filters, setFilters] = useState<MatchFiltersType>({});
  const [selectedNiche, setSelectedNiche] = useState<string>('');
  const [selectedFollowers, setSelectedFollowers] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  const niches = ['Fashion', 'Beauty', 'Fitness', 'Food', 'Travel', 'Technology', 'Gaming', 'Lifestyle'];
  const followerBrackets = ['10k-60k', '60k-260k', '260k+'];
  const budgetBrackets = ['Under 20k', '20k-50k', '50k+'];

  const handleNicheChange = (value: string) => {
    setSelectedNiche(value);
    const newFilters = { ...filters, niches: value ? [value] : undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFollowersChange = (value: string) => {
    setSelectedFollowers(value);
  };

  const handleBudgetChange = (value: string) => {
    setSelectedBudget(value);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedNiche('');
    setSelectedFollowers('');
    setSelectedBudget('');
    onFilterChange({});
  };

  const activeFilterCount = selectedNiche ? 1 : 0;

  return (
    <div className="w-full">
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-4 h-4" />
          <h3 className="font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={selectedNiche} onValueChange={handleNicheChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {niches.map(niche => (
                  <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Follower Bracket */}
          <div>
            <label className="text-sm font-medium mb-2 block">Followers</label>
            <Select value={selectedFollowers} onValueChange={handleFollowersChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {followerBrackets.map(bracket => (
                  <SelectItem key={bracket} value={bracket}>{bracket}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Budget per Post</label>
            <Select value={selectedBudget} onValueChange={handleBudgetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                {budgetBrackets.map(bracket => (
                  <SelectItem key={bracket} value={bracket}>{bracket}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Premium Filters Locked */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-dashed">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Advanced filters (Engagement Rate, Location, Gender Mix)
              </span>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">Premium</Badge>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4 w-full">
            Clear all filters
          </Button>
        )}
      </Card>
    </div>
  );
}
