// ============== Data & assets ==============
// All images sourced from Unsplash (free CDN) — luxury real estate photography.

const IMG = {
  heroVilla: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2200&q=85",
  heroCity: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2200&q=85",
  modernApt: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  livingRoom: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  exterior: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=85",
  poolHouse: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
  penthouse: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
  loft: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  cottage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  beach: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
  estate: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=85",
  duplex: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
  // interiors
  kitchen: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=85",
  bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=85",
  bathroom: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=85",
  diningRoom: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=85",
  // locations
  manhattan: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=85",
  malibu: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  aspen: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=85",
  miami: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1200&q=85",
  hamptons: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=85",
  beverly: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
  // agents — natural professional headshots (no aggressive crop params)
  agent1: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=640&q=85",
  agent2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=85",
  agent3: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=640&q=85",
  agent4: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&q=85",
  agent5: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=85",
  agent6: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=640&q=85",
  // blog
  blog1: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=85",
  blog2: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1400&q=85",
  blog3: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=85",
  blog4: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
};

const PROPERTIES = [
  {
    id: "p01", title: "Casa del Mirador", price: 12450000, rent: false,
    location: "Beverly Hills, CA", type: "Villa", status: "For Sale",
    beds: 6, baths: 7, area: 9800, lotSize: 1.4,
    image: IMG.heroVilla,
    gallery: [IMG.heroVilla, IMG.livingRoom, IMG.poolHouse, IMG.bedroom, IMG.kitchen, IMG.bathroom],
    description: "A sculpted hillside estate carved into the Beverly canyons. Floor-to-ceiling glazing frames the cityscape; cantilevered terraces invite the sky inside.",
    amenities: ["Infinity pool", "Wine cellar", "Home cinema", "Smart home", "Private gym", "Guest house", "4-car garage", "Chef's kitchen"],
    yearBuilt: 2023, agentId: "a1", tag: "Featured", lat: "34.0901° N", lng: "118.4065° W",
  },
  {
    id: "p02", title: "The Sterling Penthouse", price: 8200000, rent: false,
    location: "Tribeca, Manhattan", type: "Penthouse", status: "For Sale",
    beds: 4, baths: 4, area: 4200, lotSize: 0,
    image: IMG.penthouse,
    gallery: [IMG.penthouse, IMG.modernApt, IMG.diningRoom, IMG.bedroom, IMG.bathroom],
    description: "Full-floor sky residence with 360° city views, private elevator, and 1,800 sq ft of wraparound terrace.",
    amenities: ["Private elevator", "Wraparound terrace", "Concierge", "Gym & spa", "Wine room", "Smart home"],
    yearBuilt: 2022, agentId: "a2", tag: "New",
  },
  {
    id: "p03", title: "Ocean House Malibu", price: 18900000, rent: false,
    location: "Malibu Colony, CA", type: "Beachfront", status: "For Sale",
    beds: 5, baths: 6, area: 7600, lotSize: 0.6,
    image: IMG.beach,
    gallery: [IMG.beach, IMG.livingRoom, IMG.kitchen, IMG.bedroom],
    description: "Direct beachfront residence on the Malibu Colony, designed by Ricardo Aguilar. Walls of glass open to a private cove.",
    amenities: ["Private beach access", "Infinity pool", "Outdoor kitchen", "Boat dock", "Guest suite"],
    yearBuilt: 2021, agentId: "a3", tag: "Exclusive",
  },
  {
    id: "p04", title: "Maple Ridge Estate", price: 6750000, rent: false,
    location: "Aspen Highlands, CO", type: "Estate", status: "For Sale",
    beds: 7, baths: 8, area: 11200, lotSize: 4.2,
    image: IMG.estate,
    gallery: [IMG.estate, IMG.livingRoom, IMG.diningRoom, IMG.bedroom],
    description: "Alpine estate on 4.2 acres bordering Maroon Bells. Reclaimed timber, hand-cut stone, ski-in/ski-out access.",
    amenities: ["Ski-in/ski-out", "Indoor pool", "Wine cellar", "Sauna", "Mudroom", "Stables"],
    yearBuilt: 2020, agentId: "a4", tag: "Featured",
  },
  {
    id: "p05", title: "Lumière Loft", price: 14500, rent: true,
    location: "SoHo, Manhattan", type: "Loft", status: "For Rent",
    beds: 3, baths: 3, area: 3100, lotSize: 0,
    image: IMG.loft,
    gallery: [IMG.loft, IMG.kitchen, IMG.bedroom],
    description: "Cast-iron landmark loft with 14-ft ceilings, original oak floors, fully renovated by Workstead.",
    amenities: ["Concierge", "Roof terrace", "Gym", "Pet-friendly", "Smart home"],
    yearBuilt: 1898, agentId: "a2",
  },
  {
    id: "p06", title: "Coral Cove Residence", price: 9300000, rent: false,
    location: "Coral Gables, FL", type: "Villa", status: "For Sale",
    beds: 5, baths: 6, area: 6900, lotSize: 0.9,
    image: IMG.poolHouse,
    gallery: [IMG.poolHouse, IMG.kitchen, IMG.diningRoom, IMG.bedroom],
    description: "Mediterranean-modern villa with deep-water dockage on the Gables Waterway.",
    amenities: ["Private dock", "Pool & spa", "Outdoor kitchen", "Wine cellar", "Smart home"],
    yearBuilt: 2022, agentId: "a5",
  },
  {
    id: "p07", title: "Park Avenue Duplex", price: 22500, rent: true,
    location: "Upper East Side, NY", type: "Duplex", status: "For Rent",
    beds: 4, baths: 4, area: 4400, lotSize: 0,
    image: IMG.duplex,
    gallery: [IMG.duplex, IMG.diningRoom, IMG.bedroom, IMG.bathroom],
    description: "Pre-war duplex on Park Avenue with private elevator vestibule. Fully furnished, white-glove service.",
    amenities: ["Doorman", "Private elevator", "Gym", "Storage", "Pet-friendly"],
    yearBuilt: 1929, agentId: "a1",
  },
  {
    id: "p08", title: "Highline Apartment", price: 11800, rent: true,
    location: "Chelsea, Manhattan", type: "Apartment", status: "For Rent",
    beds: 2, baths: 2, area: 1900, lotSize: 0,
    image: IMG.modernApt,
    gallery: [IMG.modernApt, IMG.kitchen, IMG.bedroom],
    description: "Light-filled corner unit with Highline views, designed by SHoP Architects.",
    amenities: ["Concierge", "Rooftop pool", "Gym", "Spa", "Lounge"],
    yearBuilt: 2019, agentId: "a3",
  },
  {
    id: "p09", title: "Bramble Cottage", price: 3200000, rent: false,
    location: "East Hampton, NY", type: "Cottage", status: "For Sale",
    beds: 4, baths: 4, area: 3800, lotSize: 1.1,
    image: IMG.cottage,
    gallery: [IMG.cottage, IMG.livingRoom, IMG.bedroom],
    description: "Shingled cottage on a hedge-lined acre, walking distance to Main Beach. Renovated 2024.",
    amenities: ["Pool", "Pool house", "Outdoor shower", "Garden", "Garage"],
    yearBuilt: 1962, agentId: "a4", tag: "New",
  },
];

const LOCATIONS = [
  { name: "Manhattan",    listings: 142, img: IMG.manhattan },
  { name: "Malibu",       listings: 38,  img: IMG.malibu },
  { name: "Aspen",        listings: 24,  img: IMG.aspen },
  { name: "Miami Beach",  listings: 96,  img: IMG.miami },
  { name: "The Hamptons", listings: 61,  img: IMG.hamptons },
  { name: "Beverly Hills",listings: 47,  img: IMG.beverly },
];

const AGENTS = [
  { id: "a1", name: "Eleanor Voss",      title: "Managing Director, West Coast", image: IMG.agent1,
    listings: 38, sold: 240, bio: "Eleanor leads Aureva's West Coast division, specializing in trophy estates from Beverly Hills to Montecito.",
    phone: "+1 (310) 555 0142", email: "eleanor@aureva.vercel.app", langs: ["English","French","Italian"], rating: 4.9 },
  { id: "a2", name: "James Kowalski",    title: "Director, Manhattan", image: IMG.agent2,
    listings: 24, sold: 187, bio: "Twelve years with Manhattan's most discerning buyers and sellers. Pre-war specialist.",
    phone: "+1 (212) 555 0118", email: "james@aureva.vercel.app", langs: ["English","Polish"], rating: 4.9 },
  { id: "a3", name: "Aisha Renard",      title: "Senior Advisor, Coastal", image: IMG.agent3,
    listings: 31, sold: 152, bio: "Aisha represents oceanfront and resort properties across Malibu, Maui, and the Caribbean.",
    phone: "+1 (310) 555 0193", email: "aisha@aureva.vercel.app", langs: ["English","Spanish","Portuguese"], rating: 4.8 },
  { id: "a4", name: "Henrik Lindqvist",  title: "Director, Mountain Resort", image: IMG.agent4,
    listings: 19, sold: 96,  bio: "Henrik covers Aspen, Vail, and Park City — alpine estates and ski-in/ski-out residences.",
    phone: "+1 (970) 555 0167", email: "henrik@aureva.vercel.app", langs: ["English","Swedish","German"], rating: 4.9 },
  { id: "a5", name: "Marisol Cruz",      title: "Senior Advisor, South Florida", image: IMG.agent5,
    listings: 28, sold: 134, bio: "Marisol specializes in Miami, Palm Beach, and the Florida Keys — waterfront and new development.",
    phone: "+1 (305) 555 0124", email: "marisol@aureva.vercel.app", langs: ["English","Spanish"], rating: 4.8 },
  { id: "a6", name: "Theodore Park",     title: "Advisor, International", image: IMG.agent6,
    listings: 22, sold: 71,  bio: "Theo bridges international clients into the U.S. market, with offices in Seoul and London.",
    phone: "+1 (646) 555 0181", email: "theo@aureva.vercel.app", langs: ["English","Korean","Mandarin"], rating: 4.7 },
];

const TESTIMONIALS = [
  { quote: "Aureva turned a daunting cross-country move into something effortless. Eleanor understood exactly what we wanted before we did.", name: "Olivia & Marcus Chen", role: "Bought in Beverly Hills", img: null },
  { quote: "Listed on Tuesday, sold above ask by Friday. The marketing was museum-quality — every detail considered.", name: "Patricia Larson", role: "Sold a Tribeca penthouse", img: null },
  { quote: "I've worked with the biggest names in the business. Aureva is in a class of its own — discreet, sophisticated, results.", name: "Dr. Anand Mehta", role: "Multiple transactions", img: null },
];

const BLOG_POSTS = [
  { id: "b1", title: "The 2026 Luxury Market Report", excerpt: "Where the world's wealthiest are buying — and why coastal markets are bifurcating.", category: "Market Insight", date: "May 18, 2026", read: "8 min", image: IMG.blog1, author: "Eleanor Voss" },
  { id: "b2", title: "Inside a Hillside Renovation", excerpt: "How architect Ada Tolla reimagined a 1960s Trousdale ranch for a modern collector.", category: "Architecture", date: "May 04, 2026", read: "12 min", image: IMG.blog2, author: "James Kowalski" },
  { id: "b3", title: "Buying Off-Market: A Quiet Guide", excerpt: "The pocket-listing playbook — when discretion matters more than exposure.", category: "Buyer's Guide", date: "Apr 22, 2026", read: "6 min", image: IMG.blog3, author: "Aisha Renard" },
  { id: "b4", title: "Aspen After Mud Season", excerpt: "The shoulder months are the smartest time to tour mountain trophy homes. Here's why.", category: "Destinations", date: "Apr 10, 2026", read: "5 min", image: IMG.blog4, author: "Henrik Lindqvist" },
];

const formatPrice = (price, rent) => {
  if (rent) return `$${price.toLocaleString()}/mo`;
  if (price >= 1000000) return `$${(price/1000000).toFixed(2).replace(/\.00$/, "")}M`;
  return `$${price.toLocaleString()}`;
};

// URL-safe slug from arbitrary string
const slugify = (s) => String(s).toLowerCase()
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

PROPERTIES.forEach(p => { p.slug = slugify(p.title); });
AGENTS.forEach(a => { a.slug = slugify(a.name); });
BLOG_POSTS.forEach(b => { b.slug = slugify(b.title); });

Object.assign(window, {
  IMG, PROPERTIES, LOCATIONS, AGENTS, TESTIMONIALS, BLOG_POSTS, formatPrice, slugify,
});
