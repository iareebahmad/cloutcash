import { Influencer, BrandCampaign, Interaction, InteractionType, ScoredCandidate, MatchFilters } from '@/types/matchmaking';
import { mockInfluencers, mockBrandCampaigns, mockInteractions } from './mockData';
import { rankCandidates } from './matchmaker';

// LocalStorage keys
const STORAGE_KEYS = {
  INTERACTIONS: 'cloutcash_interactions',
  SEEN_IDS: 'cloutcash_seen_ids'
};

// Load from localStorage
const loadInteractions = (): Interaction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.INTERACTIONS);
    return stored ? JSON.parse(stored) : [...mockInteractions];
  } catch {
    return [...mockInteractions];
  }
};

const loadSeenIds = (): Set<string> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SEEN_IDS);
    return stored ? new Set(JSON.parse(stored)) : new Set<string>();
  } catch {
    return new Set<string>();
  }
};

// In-memory storage for interactions with localStorage sync
let interactions: Interaction[] = loadInteractions();
const seenIds = loadSeenIds();

// Save to localStorage
const saveInteractions = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(interactions));
  } catch (error) {
    console.error('Failed to save interactions:', error);
  }
};

const saveSeenIds = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.SEEN_IDS, JSON.stringify([...seenIds]));
  } catch (error) {
    console.error('Failed to save seen IDs:', error);
  }
};

export const mockApi = {
  async getRankedBatch(
    userId: string,
    role: 'brand' | 'creator',
    userCampaign: BrandCampaign | null,
    cursor: number = 0,
    filters?: MatchFilters,
    limit: number = 10
  ): Promise<{ candidates: ScoredCandidate<Influencer>[]; nextCursor: number }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userInteractions = interactions.filter(i => i.userId === userId);
    const context = {
      userId,
      role,
      interactions: userInteractions
    };
    
    // Get all candidates excluding already seen ones in this session
    const candidates = mockInfluencers.filter(inf => !seenIds.has(inf.id));
    
    // Rank candidates
    const ranked = rankCandidates(role, userCampaign, candidates, context, filters);
    
    // Paginate
    const batch = ranked.slice(cursor, cursor + limit);
    
    // Mark as seen
    batch.forEach(c => seenIds.add(c.item.id));
    saveSeenIds();
    
    return {
      candidates: batch,
      nextCursor: cursor + limit
    };
  },

  async recordInteraction(
    userId: string,
    targetId: string,
    type: InteractionType
  ): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const interaction: Interaction = {
      userId,
      targetId,
      type,
      ts: Date.now()
    };
    
    interactions.push(interaction);
    saveInteractions();
    
    // Track analytics
    console.log(`[Analytics] ${type}:`, { userId, targetId, ts: interaction.ts });
  },

  async getInteractions(userId: string): Promise<Interaction[]> {
    return interactions.filter(i => i.userId === userId);
  },

  clearSeenIds() {
    seenIds.clear();
    saveSeenIds();
  },

  resetDemo() {
    interactions = [...mockInteractions];
    seenIds.clear();
    saveInteractions();
    saveSeenIds();
  }
};
