import { Influencer, BrandCampaign, Interaction } from '@/types/matchmaking';

// Indian cities for Tier 1-3
const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Coimbatore'
];

const niches = ['Fashion', 'Beauty', 'Fitness', 'Food', 'Travel', 'Technology', 'Gaming', 'Lifestyle', 'Health', 'Entertainment'];
const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter'];
const indianNames = [
  'Aarushi Mehta', 'Rohan Sharma', 'Priya Patel', 'Arjun Singh', 'Ananya Desai',
  'Karan Gupta', 'Sneha Reddy', 'Vikram Rao', 'Diya Kumar', 'Aditya Joshi',
  'Riya Iyer', 'Siddharth Nair', 'Kavya Menon', 'Rahul Agarwal', 'Ishita Verma',
  'Nikhil Kapoor', 'Pooja Malhotra', 'Amit Chopra', 'Neha Sinha', 'Raj Kohli'
];

const brandNames = [
  'GlowVerve', 'FitHub India', 'StyleCraft', 'TechNova', 'FoodieBox',
  'TravelMate', 'BeautyBloom', 'GameZone', 'WellnessFirst', 'UrbanThreads',
  'GadgetGuru', 'TasteBuds', 'FashionFwd', 'ActiveLife', 'SkincareStudio'
];

// Generate 100 influencers
export const mockInfluencers: Influencer[] = Array.from({ length: 100 }, (_, i) => {
  const primaryNiche = niches[i % niches.length];
  const secondaryNiche = niches[(i + 3) % niches.length];
  const followerBracket = i < 30 ? 'micro' : i < 70 ? 'mid' : 'macro';
  
  let followers: number;
  if (followerBracket === 'micro') {
    followers = Math.floor(Math.random() * 50000) + 10000; // 10k-60k
  } else if (followerBracket === 'mid') {
    followers = Math.floor(Math.random() * 200000) + 60000; // 60k-260k
  } else {
    followers = Math.floor(Math.random() * 700000) + 300000; // 300k-1M
  }

  const engagementRate = parseFloat((Math.random() * 5 + 2).toFixed(1)); // 2-7%
  const city = cities[i % cities.length];
  const name = i < indianNames.length ? indianNames[i] : `${indianNames[i % indianNames.length]} ${Math.floor(i / indianNames.length)}`;
  const handle = `@${name.toLowerCase().replace(/\s+/g, '_')}`;

  return {
    id: `inf-${i + 1}`,
    handle,
    name,
    platforms: [platforms[i % platforms.length], platforms[(i + 1) % platforms.length]].slice(0, Math.random() > 0.5 ? 2 : 1),
    niches: [primaryNiche, secondaryNiche],
    audienceGeo: [city, cities[(i + 5) % cities.length]],
    audienceAge: i % 3 === 0 ? ['18-24', '25-34'] : i % 3 === 1 ? ['25-34', '35-44'] : ['18-24'],
    audienceGenderMix: { 
      male: Math.floor(Math.random() * 40) + 30, 
      female: Math.floor(Math.random() * 40) + 30, 
      other: 2 
    },
    followers,
    avgViews: Math.floor(followers * engagementRate / 100),
    engagementRate,
    contentQuality: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5-5
    brandSafety: parseFloat((Math.random() * 1 + 4).toFixed(1)), // 4-5
    pricePerPost: Math.floor(followers * 0.05 + Math.random() * 5000), // Based on followers
    availability: Math.random() > 0.3,
    pastBrands: brandNames.slice(0, Math.floor(Math.random() * 3) + 1),
    fraudRisk: parseFloat((Math.random() * 0.1).toFixed(2)),
    avatar: `https://picsum.photos/seed/inf${i + 1}/640/800`,
    bio: `${primaryNiche} creator from ${city}. ${engagementRate}% engagement rate with ${(followers / 1000).toFixed(0)}k followers.`,
    followerBracket
  };
});

// Generate 60 brands
export const mockBrandCampaigns: BrandCampaign[] = Array.from({ length: 60 }, (_, i) => {
  const category = niches[i % niches.length];
  const budgetBracket = i < 20 ? 'small' : i < 45 ? 'medium' : 'large';
  
  let budgetCoins: number;
  let maxPrice: number;
  let minFollowers: number;
  
  if (budgetBracket === 'small') {
    budgetCoins = Math.floor(Math.random() * 150000) + 50000; // 50k-200k
    maxPrice = Math.floor(Math.random() * 15000) + 5000; // 5k-20k
    minFollowers = 10000;
  } else if (budgetBracket === 'medium') {
    budgetCoins = Math.floor(Math.random() * 350000) + 200000; // 200k-550k
    maxPrice = Math.floor(Math.random() * 30000) + 20000; // 20k-50k
    minFollowers = 50000;
  } else {
    budgetCoins = Math.floor(Math.random() * 500000) + 550000; // 550k-1M+
    maxPrice = Math.floor(Math.random() * 70000) + 50000; // 50k-120k
    minFollowers = 250000;
  }

  const brandName = `${brandNames[i % brandNames.length]}${i >= brandNames.length ? ` ${Math.floor(i / brandNames.length)}` : ''}`;
  const city = cities[i % cities.length];

  return {
    id: `brand-${i + 1}`,
    brandName,
    categories: [category, niches[(i + 2) % niches.length]],
    targetGeo: [city, cities[(i + 7) % cities.length], cities[(i + 13) % cities.length]],
    targetAge: i % 2 === 0 ? ['18-24', '25-34'] : ['25-34', '35-44'],
    targetGenderMix: { male: 50, female: 48, other: 2 },
    minFollowers,
    minEngagement: parseFloat((Math.random() * 2 + 2).toFixed(1)), // 2-4%
    maxPrice,
    creativesNeeded: Math.floor(Math.random() * 5) + 2,
    timeline: i % 3 === 0 ? '2 weeks' : i % 3 === 1 ? '1 month' : '3 weeks',
    brandSafetyMin: 4.0,
    exclusions: [],
    preferredPlatforms: [platforms[i % platforms.length]],
    budgetCoins,
    logo: `https://picsum.photos/seed/brand${i + 1}/400/400`,
    description: `${category} campaign targeting ${city} audience. Budget: ₹${(budgetCoins / 100000).toFixed(1)}L monthly.`,
    budgetBracket
  };
});

export const mockInteractions: Interaction[] = [];
