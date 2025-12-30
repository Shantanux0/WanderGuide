import { toast } from "@/hooks/use-toast";

// Types
export interface UserPreferences {
    currency: "USD" | "INR" | "EUR";
    language: "en" | "es" | "fr";
    notifications: {
        email: boolean;
        whatsapp: boolean;
        marketing: boolean;
    };
    travel: {
        dietary: string[];
        travelStyle: "Relaxed" | "Adventure" | "Balanced";
        frequency?: "Occasional" | "Frequent";
    };
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    avatar?: string;
    favorites: number[];
    preferences?: UserPreferences;
    bio?: string;
    location?: string;
}

export interface Destination {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    price: string;
    category: string;
    tags: string[];
    description?: string;
    locationType?: "International" | "National"; // New field for categorization
    days?: ItineraryDay[]; // Sample 3-day plan
}

export interface ItineraryActivity {
    time: string;
    icon: string;
    title: string;
    description: string;
    image?: string; // New
    location?: string; // New
    mapUrl?: string; // New: Google Maps URL
    visitTime?: string; // New: Specific time for the visit
    foodRecommendation?: string; // New: Famous food recommendation
    tips?: string; // New
}

export interface ItineraryDay {
    day: number;
    date: string;
    title: string;
    activities: ItineraryActivity[];
}

export interface Itinerary {
    id: string;
    userId: string;
    destination: string;
    heroImage: string;
    startDate: string;
    endDate: string;
    status: "draft" | "pending" | "confirmed" | "completed";
    price?: number;
    days: ItineraryDay[];
}

export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    text: string;
    createdAt: string;
}

export interface CommunityPost {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    destinationTag: string;
    content: string;
    image?: string;
    likes: string[]; // userIds
    savedBy: string[]; // userIds
    comments: Comment[]; // New field
    createdAt: string;
}

export interface Request {
    id: string;
    userId: string;
    user: { name: string; email: string };
    destination: string;
    startDate: string;
    // endDate removed or calculated from days
    days: number;
    budget: string;
    mobile: string;
    isWhatsapp: boolean;
    generatedItineraryId?: string; // New
    priority: "low" | "medium" | "high"; // Kept for admin compat, default to medium
    status: "pending" | "in-progress" | "completed";
    createdAt: string;
}

// Passport Interfaces
export interface Stamp {
    id: string;
    destinationName: string;
    date: string;
    icon: string;
    status: "planned" | "completed";
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: string;
}

export interface Passport {
    userId: string;
    passportNumber: string;
    nationality: string; // Defaults to "Global Citizen"
    issuedDate: string;
    stamps: Stamp[];
    badges: Badge[];
}

// Initial Data
const INITIAL_DESTINATIONS: Destination[] = [
    {
        id: 4,
        name: "Goa, India",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        rating: 4.8,
        reviews: 5432,
        price: "₹25,000",
        category: "Beach",
        tags: ["Party", "Relax", "Culture"],
        description: "Sun, sand, and spices. Goa offers a perfect blend of Indian and Portuguese cultures.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "North Goa Vibes",
                activities: [
                    {
                        time: "Morning",
                        icon: "water",
                        title: "Baga Beach",
                        description: "Water sports and fun at the beach.",
                        image: "https://images.unsplash.com/photo-1590499092873-1628d7d3d0b2?w=800",
                        location: "Baga Beach, North Goa",
                        mapUrl: "https://maps.google.com/?q=Baga+Beach+Goa",
                        visitTime: "9:00 AM - 12:00 PM",
                        foodRecommendation: "Goan Fish Curry at Brittany's Shack"
                    },
                    {
                        time: "Afternoon",
                        icon: "food",
                        title: "Beach Shack Lunch",
                        description: "Authentic Goan curry at a shack.",
                        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
                        location: "Calangute Beach",
                        visitTime: "1:00 PM - 3:00 PM",
                        foodRecommendation: "Prawn Balchao"
                    },
                    {
                        time: "Evening",
                        icon: "dance",
                        title: "Nightlife at Tito's",
                        description: "Experience the party scene at Tito's Lane.",
                        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
                        location: "Tito's Lane, Baga",
                        visitTime: "8:00 PM onwards",
                        foodRecommendation: "Cocktails & Tapas"
                    }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Old Goa Heritage",
                activities: [
                    {
                        time: "Morning",
                        icon: "camera",
                        title: "Basilica of Bom Jesus",
                        description: "Visit the UNESCO World Heritage site.",
                        image: "https://images.unsplash.com/photo-1598556885374-299d638e078c?w=800",
                        location: "Old Goa Road",
                        mapUrl: "https://maps.google.com/?q=Basilica+of+Bom+Jesus",
                        visitTime: "10:00 AM - 11:30 AM",
                        foodRecommendation: "Bebinca (Traditional Layer Cake)"
                    },
                    {
                        time: "Afternoon",
                        icon: "walk",
                        title: "Fontainhas Walk",
                        description: "Walk through the colorful Latin Quarter.",
                        image: "https://images.unsplash.com/photo-1620760465228-5ae9f949c25f?w=800",
                        location: "Panjim, Goa",
                        visitTime: "4:00 PM - 6:00 PM",
                        foodRecommendation: "Serradurra at a local bakery"
                    },
                    {
                        time: "Evening",
                        icon: "ship",
                        title: "Mandovi River Cruise",
                        description: "Sunset cruise with folk dances.",
                        image: "https://images.unsplash.com/photo-1605218439446-cf12c0a96974?w=800",
                        location: "Mandovi River Jetty",
                        visitTime: "6:30 PM - 8:30 PM",
                        foodRecommendation: "Snacks on board"
                    }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "South Goa Peace",
                activities: [
                    {
                        time: "Morning",
                        icon: "sun",
                        title: "Palolem Beach",
                        description: "Relax at the scenic crescent beach.",
                        image: "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?w=800",
                        location: "Canacona, South Goa",
                        visitTime: "9:00 AM - 1:00 PM",
                        foodRecommendation: "Fresh Coconut Water"
                    },
                    {
                        time: "Afternoon",
                        icon: "camera",
                        title: "Cabo de Rama Fort",
                        description: "Visit the historic fort with sea views.",
                        image: "https://images.unsplash.com/photo-1650616127116-2911b3307684?w=800",
                        location: "South Goa",
                        visitTime: "3:00 PM - 5:00 PM",
                        foodRecommendation: "Local Cashew Feni (Optional)"
                    },
                    {
                        time: "Evening",
                        icon: "food",
                        title: "Seafood Dinner",
                        description: "Fresh catch at Martin's Corner.",
                        image: "https://images.unsplash.com/photo-1599021456807-b55062e3d8c1?w=800",
                        location: "Betalbatim",
                        visitTime: "7:30 PM PM onwards",
                        foodRecommendation: "Crab Xec Xec"
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "Jaipur, India",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
        rating: 4.7,
        reviews: 3210,
        price: "₹18,000",
        category: "Cultural",
        tags: ["Historic", "Royal", "Art"],
        description: "The Pink City, known for its stunning forts, palaces, and vibrant markets.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "The Pink City",
                activities: [
                    { time: "Morning", icon: "camera", title: "Hawa Mahal", description: "Photo stop at the Palace of Winds." },
                    { time: "Afternoon", icon: "walk", title: "City Palace", description: "Explore the royal residence." },
                    { time: "Evening", icon: "shop", title: "Johari Bazaar", description: "Shop for jewelry and textiles." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Forts & Palaces",
                activities: [
                    { time: "Morning", icon: "mountain", title: "Amber Fort", description: "Elephant ride up to the hill fort." },
                    { time: "Afternoon", icon: "camera", title: "Jal Mahal", description: "View the Water Palace." },
                    { time: "Evening", icon: "food", title: "Chokhi Dhani", description: "Traditional Rajasthani cultural village experience." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Astronomy & Art",
                activities: [
                    { time: "Morning", icon: "star", title: "Jantar Mantar", description: "Visit the astronomical observatory." },
                    { time: "Afternoon", icon: "camera", title: "Albert Hall Museum", description: "State museum of Rajasthan." },
                    { time: "Evening", icon: "food", title: "Rooftop Dinner", description: "Dinner with a view of Nahargarh Fort." }
                ]
            }
        ]
    },
    {
        id: 6,
        name: "Kerala, India",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        rating: 4.9,
        reviews: 2890,
        price: "₹30,000",
        category: "Nature",
        tags: ["Backwaters", "Tea", "Relax"],
        description: "God's Own Country. Serene backwaters, lush hill stations, and pristine beaches.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Munnar Hills",
                activities: [
                    { time: "Morning", icon: "tree", title: "Tea Gardens", description: "Walk through lush tea plantations." },
                    { time: "Afternoon", icon: "camera", title: "Mattupetty Dam", description: "Boating and scenic views." },
                    { time: "Evening", icon: "walk", title: "Town Walk", description: "Explore Munnar town." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Thekkady Wildlife",
                activities: [
                    { time: "Morning", icon: "tree", title: "Periyar National Park", description: "Boat safari to spot elephants." },
                    { time: "Afternoon", icon: "shop", title: "Spice Plantation", description: "Tour of a spice garden." },
                    { time: "Evening", icon: "dance", title: "Kathakali", description: "Watch a traditional dance show." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Alleppey Backwaters",
                activities: [
                    { time: "Morning", icon: "bus", title: "Drive to Alleppey", description: "Scenic drive from Thekkady." },
                    { time: "Afternoon", icon: "ship", title: "Houseboat", description: "Check into a houseboat for a cruise." },
                    { time: "Evening", icon: "food", title: "Onboard Dinner", description: "Traditional Kerala meal on the boat." }
                ]
            }
        ]
    },
    {
        id: 9,
        name: "Pune, India",
        image: "/pune.jpeg",
        rating: 4.6,
        reviews: 1543,
        price: "₹15,000",
        category: "City",
        tags: ["History", "Culture", "Food"],
        description: "The Oxford of the East. A blend of rich history, academic culture, and modern lifestyle.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Historical Pune",
                activities: [
                    { time: "Morning", icon: "camera", title: "Shaniwar Wada", description: "Explore the historic fortification." },
                    { time: "Afternoon", icon: "walk", title: "Aga Khan Palace", description: "Visit the monument with Gandhi's memorial." },
                    { time: "Evening", icon: "food", title: "FC Road", description: "Street food and shopping experience." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Forts & Views",
                activities: [
                    { time: "Morning", icon: "mountain", title: "Sinhagad Fort", description: "Trek or drive up for panoramic views." },
                    { time: "Afternoon", icon: "water", title: "Khadakwasla Dam", description: "Relax by the water." },
                    { time: "Evening", icon: "food", title: "German Bakery", description: "Famous cafe in Koregaon Park." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Museums & Culture",
                activities: [
                    { time: "Morning", icon: "camera", title: "Raja Dinkar Kelkar Museum", description: "Private collection of Indian artifacts." },
                    { time: "Afternoon", icon: "walk", title: "Parvati Hill", description: "Climb for a temple and city view." },
                    { time: "Evening", icon: "shop", title: "Phoenix Mall", description: "Shopping and entertainment." }
                ]
            }
        ]
    },
    {
        id: 10,
        name: "Mumbai, India",
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800",
        rating: 4.8,
        reviews: 6789,
        price: "₹20,000",
        category: "City",
        tags: ["Bollywood", "Coastal", "Nightlife"],
        description: "The City of Dreams. India's financial powerhouse and home to Bollywood.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "South Mumbai",
                activities: [
                    { time: "Morning", icon: "camera", title: "Gateway of India", description: "Visit the iconic waterfront monument." },
                    { time: "Afternoon", icon: "walk", title: "Colaba Causeway", description: "Street shopping and cafes." },
                    { time: "Evening", icon: "sun", title: "Marine Drive", description: "Sunset walk on the Queen's Necklace." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Spiritual & Cinematic",
                activities: [
                    { time: "Morning", icon: "temple", title: "Siddhivinayak Temple", description: "Visit the famous Ganesha temple." },
                    { time: "Afternoon", icon: "camera", title: "Film City", description: "Tour the heart of Bollywood." },
                    { time: "Evening", icon: "food", title: "Juhu Beach", description: "Pav Harrison and street snacks." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Heritage & Art",
                activities: [
                    { time: "Morning", icon: "ship", title: "Elephanta Caves", description: "Ferry ride to ancient rock-cut caves." },
                    { time: "Afternoon", icon: "camera", title: "Chhatrapati Shivaji Terminus", description: "UNESCO World Heritage site." },
                    { time: "Evening", icon: "walk", title: "Bandra Bandstand", description: "Walk by the homes of stars." }
                ]
            }
        ]
    },
    {
        id: 11,
        name: "Ujjain, India",
        image: "/ujjain.jpg",
        rating: 4.7,
        reviews: 2341,
        price: "₹12,000",
        category: "Cultural",
        tags: ["Spiritual", "Temple", "History"],
        description: "One of the holiest cities in India, known for the Mahakaleshwar Jyotirlinga.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Mahakal Darshan",
                activities: [
                    { time: "Morning", icon: "temple", title: "Mahakaleshwar Temple", description: "Darshan of the Jyotirlinga." },
                    { time: "Afternoon", icon: "walk", title: "Mahakal Corridor", description: "Explore the newly built corridor." },
                    { time: "Evening", icon: "temple", title: "Ram Ghat Aarti", description: "Attend the evening aarti by the Shipra river." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Temples & History",
                activities: [
                    { time: "Morning", icon: "temple", title: "Kal Bhairav", description: "Visit the unique temple of the city's guardian." },
                    { time: "Afternoon", icon: "camera", title: "Ved Shala", description: "Ancient observatory (Jantar Mantar)." },
                    { time: "Evening", icon: "walk", title: "Harsiddhi Temple", description: "One of the Shakti Peethas." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Spiritual Peace",
                activities: [
                    { time: "Morning", icon: "temple", title: "Sandipani Ashram", description: "Place where Lord Krishna studied." },
                    { time: "Afternoon", icon: "temple", title: "Mangalnath Temple", description: "Birthplace of Mars (Mangal Graha)." },
                    { time: "Evening", icon: "sun", title: "Shipra River", description: "Peaceful evening boat ride." }
                ]
            }
        ]
    },
    {
        id: 12,
        name: "Agra, India",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
        rating: 4.9,
        reviews: 8765,
        price: "₹15,000",
        category: "Historic",
        tags: ["Wonder", "Mughal", "History"],
        description: "Home to the Taj Mahal, a symbol of eternal love and architectural marvel.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Symbol of Love",
                activities: [
                    { time: "Morning", icon: "camera", title: "Taj Mahal", description: "Sunrise visit to the Taj Mahal." },
                    { time: "Afternoon", icon: "walk", title: "Agra Fort", description: "Explore the massive red sandstone fort." },
                    { time: "Evening", icon: "sun", title: "Mehtab Bagh", description: "Sunset view of Taj Mahal from across the river." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Fatehpur Sikri",
                activities: [
                    { time: "Morning", icon: "bus", title: "Fatehpur Sikri", description: "Trip to the abandoned Mughal capital." },
                    { time: "Afternoon", icon: "shop", title: "Kinari Bazaar", description: "Shop for marble handicrafts." },
                    { time: "Evening", icon: "food", title: "Mughlai Dinner", description: "Authentic cuisine at Pinch of Spice." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Sikandra & Departure",
                activities: [
                    { time: "Morning", icon: "camera", title: "Akbar's Tomb", description: "Visit the tomb of Akbar the Great in Sikandra." },
                    { time: "Afternoon", icon: "walk", title: "Itmad-ud-Daulah", description: "Visit the 'Baby Taj'." },
                    { time: "Evening", icon: "train", title: "Departure", description: "Transfer to railway station." }
                ]
            }
        ]
    },
    {
        id: 13,
        name: "Manali, India",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        rating: 4.8,
        reviews: 4321,
        price: "₹22,000",
        category: "Mountain",
        tags: ["Snow", "Adventure", "Nature"],
        description: "A high-altitude resort town in the Himalayas, a backpacker's paradise.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Mountain Vibes",
                activities: [
                    { time: "Morning", icon: "temple", title: "Hadimba Temple", description: "Visit the ancient wooden temple." },
                    { time: "Afternoon", icon: "walk", title: "Mall Road", description: "Explore local shops and cafes." },
                    { time: "Evening", icon: "food", title: "Old Manali", description: "Dinner at a riverside cafe." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Solang Valley",
                activities: [
                    { time: "Morning", icon: "mountain", title: "Solang Valley", description: "Paragliding and adventure sports." },
                    { time: "Afternoon", icon: "walk", title: "Vashisht Hot Springs", description: "Dip in the natural hot springs." },
                    { time: "Evening", icon: "sun", title: "Sunset", description: "Relax with mountain views." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Rohtang Pass",
                activities: [
                    { time: "Morning", icon: "mountain", title: "Rohtang Pass", description: "Snow activities at the pass (seasonal)." },
                    { time: "Afternoon", icon: "camera", title: "Atal Tunnel", description: "Drive through the engineering marvel." },
                    { time: "Evening", icon: "bus", title: "Return", description: "Return to Manali town." }
                ]
            }
        ]
    },
    {
        id: 14,
        name: "Varanasi, India",
        image: "/varanasi.webp",
        rating: 4.7,
        reviews: 5678,
        price: "₹14,000",
        category: "Spiritual",
        tags: ["Ganga", "Ancient", "Culture"],
        description: "The spiritual capital of India, one of the world's oldest living cities.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Ganga Aarti",
                activities: [
                    { time: "Morning", icon: "temple", title: "Kashi Vishwanath", description: "Darshan at the Golden Temple." },
                    { time: "Afternoon", icon: "walk", title: "Banaras Hindu University", description: "Visit the vast campus and museum." },
                    { time: "Evening", icon: "fire", title: "Ganga Aarti", description: "Witness the grand aarti at Dashashwamedh Ghat." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Sarnath & Silk",
                activities: [
                    { time: "Morning", icon: "temple", title: "Sarnath", description: "Site where Buddha gave his first sermon." },
                    { time: "Afternoon", icon: "shop", title: "Silk Saree Weaving", description: "Watch artisans weave Banarasi sarees." },
                    { time: "Evening", icon: "ship", title: "Boat Ride", description: "Sunset boat ride on the Ganges." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Ghats Walk",
                activities: [
                    { time: "Morning", icon: "sun", title: "Subah-e-Banaras", description: "Morning cultural program at Assi Ghat." },
                    { time: "Afternoon", icon: "food", title: "Street Food", description: "Try Kachori Sabzi and Malaiyo." },
                    { time: "Evening", icon: "walk", title: "Ghat Walk", description: "Walk along the interconnected ghats." }
                ]
            }
        ]
    },
    {
        id: 15,
        name: "Ladakh, India",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800",
        rating: 4.9,
        reviews: 3456,
        price: "₹35,000",
        category: "Adventure",
        tags: ["Mountains", "Lakes", "Monastery"],
        description: "A land of high passes, stark mountains, and crystal clear lakes.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Leh Acclimatization",
                activities: [
                    { time: "Morning", icon: "plane", title: "Arrival", description: "Arrive in Leh and rest for acclimatization." },
                    { time: "Afternoon", icon: "walk", title: "Leh Market", description: "Gentle walk in the local market." },
                    { time: "Evening", icon: "temple", title: "Shanti Stupa", description: "Sunset view from the Stupa." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Monasteries",
                activities: [
                    { time: "Morning", icon: "temple", title: "Thiksey Monastery", description: "Visit the largest monastery in central Ladakh." },
                    { time: "Afternoon", icon: "camera", title: "Shey Palace", description: "Visit the old summer palace." },
                    { time: "Evening", icon: "coffee", title: "Cafe Hopping", description: "Relax at a cafe in Leh." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Pangong Lake",
                activities: [
                    { time: "Morning", icon: "bus", title: "Drive to Pangong", description: "Cross Chang La pass to reach the lake." },
                    { time: "Afternoon", icon: "water", title: "Pangong Tso", description: "Marvel at the changing colors of the lake." },
                    { time: "Evening", icon: "star", title: "Stargazing", description: "Camp by the lake." }
                ]
            }
        ]
    },
    {
        id: 16,
        name: "Konkan, India",
        image: "/konkan.webp",
        rating: 4.8,
        reviews: 2134,
        price: "₹16,000",
        category: "Beach",
        tags: ["Nature", "Food", "Beaches"],
        description: "Pristine beaches, ancient forts, and authentic Malvani cuisine along the western coast.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Coastal Drive",
                activities: [
                    { time: "Morning", icon: "bus", title: "Drive to Alibaug", description: "Scenic coastal drive." },
                    { time: "Afternoon", icon: "water", title: "Nagaon Beach", description: "Water sports and relaxation." },
                    { time: "Evening", icon: "food", title: "Seafood Thali", description: "Authentic Konkani seafood dinner." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Forts & History",
                activities: [
                    { time: "Morning", icon: "ship", title: "Murud Janjira", description: "Boat ride to the impregnable sea fort." },
                    { time: "Afternoon", icon: "walk", title: "Beach Walk", description: "Walk along the Kashid beach." },
                    { time: "Evening", icon: "sun", title: "Sunset", description: "Sunset views over the Arabian Sea." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Malvan & Tarkarli",
                activities: [
                    { time: "Morning", icon: "water", title: "Scuba Diving", description: "Explore coral reefs in Tarkarli." },
                    { time: "Afternoon", icon: "camera", title: "Sindhudurg Fort", description: "Visit the historic Shivaji Maharaj fort." },
                    { time: "Evening", icon: "bus", title: "Return", description: "Journey back with memories." }
                ]
            }
        ]
    },
    {
        id: 17,
        name: "Hampi, India",
        image: "/Hampi_karnataka.jpg",
        rating: 4.9,
        reviews: 3012,
        price: "₹18,000",
        category: "Historic",
        tags: ["Ruins", "Culture", "Boulders"],
        description: "A UNESCO World Heritage site featuring ancient ruins, massive boulders, and a riverside vibe.",
        locationType: "National",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Sacred Center",
                activities: [
                    { time: "Morning", icon: "temple", title: "Virupaksha Temple", description: "Visit the towering ancient temple." },
                    { time: "Afternoon", icon: "walk", title: "Hampi Bazaar", description: "Explore the ancient market street." },
                    { time: "Evening", icon: "sun", title: "Hemakuta Hill", description: "Sunset views over the ruins." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Royal Center",
                activities: [
                    { time: "Morning", icon: "camera", title: "Vittala Temple", description: "See the famous Stone Chariot." },
                    { time: "Afternoon", icon: "walk", title: "Lotus Mahal", description: "Explore the royal enclosure." },
                    { time: "Evening", icon: "water", title: "Coracle Ride", description: "Boat ride on the Tungabhadra river." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Hippie Island",
                activities: [
                    { time: "Morning", icon: "bus", title: "Sanapur Lake", description: "Relax by the scenic lake." },
                    { time: "Afternoon", icon: "food", title: "Cafe Lunch", description: "Chill at a cafe with rice paddy views." },
                    { time: "Evening", icon: "mountain", title: "Anjaneya Hill", description: "Hike for panoramic sunset views." }
                ]
            }
        ]
    }
];

const INITIAL_ITINERARIES: Itinerary[] = [
    {
        id: "2",
        userId: "user-1",
        destination: "Goa, India",
        heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
        startDate: "2024-01-10",
        endDate: "2024-01-15",
        status: "completed",
        price: 25000,
        days: [
            {
                day: 1,
                date: "January 10",
                title: "North Goa Vibes",
                activities: [
                    {
                        time: "Morning",
                        icon: "water",
                        title: "Baga Beach",
                        description: "Water sports and fun at the beach.",
                        image: "https://images.unsplash.com/photo-1590499092873-1628d7d3d0b2?w=800",
                        location: "Baga Beach, North Goa",
                        mapUrl: "https://goo.gl/maps/example",
                        visitTime: "9:00 AM - 12:00 PM",
                        foodRecommendation: "Goan Fish Curry at Brittany's"
                    },
                    {
                        time: "Afternoon",
                        icon: "food",
                        title: "Britto's",
                        description: "Lunch at the famous beach shack.",
                        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
                        location: "Baga Beach",
                        visitTime: "1:00 PM",
                        foodRecommendation: "Seafood Platter"
                    },
                    {
                        time: "Evening",
                        icon: "dance",
                        title: "Night Market",
                        description: "Shopping at Arpora Saturday Night Market.",
                        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
                        location: "Arpora",
                        visitTime: "7:00 PM onwards",
                        foodRecommendation: "Street Food Stalls"
                    }
                ]
            }
        ]
    },
    {
        id: "3",
        userId: "user-1",
        destination: "Ujjain, India",
        heroImage: "/ujjain.jpg",
        startDate: "2024-03-01",
        endDate: "2024-03-03",
        status: "completed",
        price: 12000,
        days: [
            {
                day: 1,
                date: "March 1",
                title: "Mahakal Darshan",
                activities: [
                    {
                        time: "Morning",
                        icon: "temple",
                        title: "Mahakaleshwar",
                        description: "Bhasma Aarti and Darshan.",
                        location: "Mahakaleshwar Jyotirlinga",
                        mapUrl: "https://goo.gl/maps/ujjain",
                        visitTime: "4:00 AM - 11:00 AM",
                        foodRecommendation: "Poha Jalebi"
                    },
                    {
                        time: "Afternoon",
                        icon: "walk",
                        title: "Ram Ghat",
                        description: "Holy dip in Shipra river.",
                        location: "Ram Ghat, Ujjain",
                        visitTime: "4:00 PM",
                        foodRecommendation: "Rabri"
                    },
                    {
                        time: "Evening",
                        icon: "temple",
                        title: "Harsiddhi Mata",
                        description: "Evening Aarti.",
                        location: "Harsiddhi Temple",
                        visitTime: "7:00 PM",
                        foodRecommendation: "Prasad"
                    }
                ]
            }
        ]
    },
    {
        id: "4",
        userId: "user-1",
        destination: "Pune, India",
        heroImage: "/pune.jpeg",
        startDate: "2025-02-14",
        endDate: "2024-02-15",
        status: "confirmed",
        price: 15000,
        days: [
            {
                day: 1,
                date: "February 14",
                title: "Heritage Walk",
                activities: [
                    {
                        time: "Morning",
                        icon: "fort",
                        title: "Shaniwar Wada",
                        description: "Explore the Peshwa fortification.",
                        location: "Shaniwar Wada, Pune",
                        mapUrl: "https://goo.gl/maps/pune",
                        visitTime: "10:00 AM - 5:00 PM",
                        foodRecommendation: "Misal Pav at Kata Kirr"
                    },
                    {
                        time: "Afternoon",
                        icon: "food",
                        title: "Goodluck Cafe",
                        description: "Bun Maska and Irani Chai.",
                        location: "Deccan Gymkhana",
                        visitTime: "4:00 PM",
                        foodRecommendation: "Bun Maska"
                    },
                    {
                        time: "Evening",
                        icon: "mountain",
                        title: "Sinhagad",
                        description: "Sunset drive to the fort.",
                        location: "Sinhagad Fort",
                        visitTime: "5:30 PM",
                        foodRecommendation: "Pithla Bhakri"
                    }
                ]
            }
        ]
    },
    {
        id: "7",
        userId: "user-1",
        destination: "Mumbai, India",
        heroImage: "/mumbai.jpg",
        startDate: "2023-12-01",
        endDate: "2023-12-03",
        status: "completed",
        price: 15000,
        days: [
            {
                day: 1,
                date: "December 1",
                title: "City of Dreams",
                activities: [
                    {
                        time: "Morning",
                        icon: "camera",
                        title: "Gateway of India",
                        description: "Sightseeing.",
                        location: "Apollo Bunder",
                        mapUrl: "https://goo.gl/maps/mumbai",
                        visitTime: "8:00 AM",
                        foodRecommendation: "Vada Pav"
                    },
                    {
                        time: "Afternoon",
                        icon: "food",
                        title: "Cafe Leopold",
                        description: "Lunch at historic cafe.",
                        location: "Colaba Causeway",
                        visitTime: "1:00 PM",
                        foodRecommendation: "Keema Pav"
                    },
                    {
                        time: "Evening",
                        icon: "sun",
                        title: "Marine Drive",
                        description: "Sunset walk.",
                        location: "Marine Drive",
                        visitTime: "6:00 PM",
                        foodRecommendation: "Pav Bhaji at Sardar's"
                    }
                ]
            }
        ]
    },
    {
        id: "101",
        userId: "user-1",
        destination: "Agra, India",
        heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200",
        startDate: "2024-11-10",
        endDate: "2024-11-12",
        status: "completed",
        price: 18000,
        days: [
            {
                day: 1,
                date: "November 10",
                title: "Taj Visit",
                activities: [
                    {
                        time: "Morning",
                        icon: "camera",
                        title: "Taj Mahal",
                        description: "Early morning visit.",
                        location: "Dharmapuri, Forest Colony",
                        mapUrl: "https://goo.gl/maps/agra",
                        visitTime: "6:00 AM",
                        foodRecommendation: "Bedai and Jalebi"
                    },
                    {
                        time: "Afternoon",
                        icon: "walk",
                        title: "Agra Fort",
                        description: "History walk.",
                        location: "Agra Fort",
                        visitTime: "2:00 PM",
                        foodRecommendation: "Mughlai Cuisine"
                    },
                    {
                        time: "Evening",
                        icon: "food",
                        title: "Petha Shopping",
                        description: "Buying famous sweets.",
                        location: "Kinari Bazaar",
                        visitTime: "6:00 PM",
                        foodRecommendation: "Panchi Petha"
                    }
                ]
            }
        ]
    },
    {
        id: "102",
        userId: "user-1",
        destination: "Kerala, India",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200",
        startDate: "2025-01-20",
        endDate: "2025-01-25",
        status: "pending",
        price: 32000,
        days: []
    },
    {
        id: "103",
        userId: "user-1",
        destination: "Manali, India",
        heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
        startDate: "2024-05-15",
        endDate: "2024-05-20",
        status: "completed",
        price: 28000,
        days: []
    },
    {
        id: "104",
        userId: "user-1",
        destination: "Varanasi, India",
        heroImage: "/varanasi.webp",
        startDate: "2024-10-02",
        endDate: "2024-10-04",
        status: "completed",
        price: 14000,
        days: []
    },
    {
        id: "105",
        userId: "user-1",
        destination: "Konkan, India",
        heroImage: "/konkan.webp",
        startDate: "2024-11-20",
        endDate: "2024-11-22",
        status: "confirmed",
        price: 16000,
        days: [
            {
                day: 1,
                date: "November 20",
                title: "Coastal Drive",
                activities: [
                    {
                        time: "Morning",
                        icon: "bus",
                        title: "Drive to Alibaug",
                        description: "Scenic coastal drive.",
                        location: "Alibaug",
                        mapUrl: "https://goo.gl/maps/konkan",
                        visitTime: "8:00 AM",
                        foodRecommendation: "Vada Pav on the way"
                    },
                    {
                        time: "Afternoon",
                        icon: "water",
                        title: "Nagaon Beach",
                        description: "Water sports and relaxation.",
                        location: "Nagaon Beach",
                        visitTime: "3:00 PM",
                        foodRecommendation: "Fresh Coconut Water"
                    },
                    {
                        time: "Evening",
                        icon: "food",
                        title: "Seafood Thali",
                        description: "Authentic Konkani seafood dinner.",
                        location: "Sanman Restaurant",
                        visitTime: "8:00 PM",
                        foodRecommendation: "Surmai Fry"
                    }
                ]
            }
        ]
    },
    {
        id: "106",
        userId: "user-1",
        destination: "Hampi, India",
        heroImage: "/Hampi_karnataka.jpg",
        startDate: "2024-12-05",
        endDate: "2024-12-08",
        status: "confirmed",
        price: 18000,
        days: [
            {
                day: 1,
                date: "December 5",
                title: "Sacred Center",
                activities: [
                    {
                        time: "Morning",
                        icon: "temple",
                        title: "Virupaksha Temple",
                        description: "Visit the towering ancient temple.",
                        location: "Hampi Main Bazaar",
                        mapUrl: "https://goo.gl/maps/hampi",
                        visitTime: "9:00 AM",
                        foodRecommendation: "South Indian Breakfast"
                    },
                    {
                        time: "Afternoon",
                        icon: "walk",
                        title: "Hampi Bazaar",
                        description: "Explore the ancient market street.",
                        location: "Hampi Bazaar",
                        visitTime: "4:00 PM",
                        foodRecommendation: "Mango Tree Restaurant"
                    },
                    {
                        time: "Evening",
                        icon: "sun",
                        title: "Hemakuta Hill",
                        description: "Sunset views over the ruins.",
                        location: "Hemakuta Hill",
                        visitTime: "6:00 PM",
                        foodRecommendation: "Masala Chai"
                    }
                ]
            }
        ]
    }
];

const INITIAL_REQUESTS: Request[] = [
    {
        id: "1",
        userId: "user-2",
        user: { name: "Sarah Mitchell", email: "sarah@example.com" },
        destination: "Ladakh",
        startDate: "2025-06-10",
        days: 10,
        budget: "₹50,000",
        mobile: "+91 9876543210",
        isWhatsapp: true,
        priority: "high",
        status: "pending",
        createdAt: "2024-12-08T10:00:00Z",
    },
];

const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
    {
        id: "post-1",
        userId: "user-sarah",
        userName: "Sarah Mitchell",
        userAvatar: "https://i.pravatar.cc/150?u=sarah",
        destinationTag: "Goa",
        content: "Just returned from the most magical sunset at Baga Beach! 🌅 Definitely recommend booking a shack for dinner. The vibe is unbeatable!",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
        likes: ["user-1", "user-3"],
        savedBy: [],
        comments: [
            {
                id: "c1",
                userId: "user-mike",
                userName: "Mike Traveler",
                text: "Wow, that view is incredible! Adding this to my bucket list.",
                createdAt: "2024-12-15T19:00:00Z"
            }
        ],
        createdAt: "2024-12-15T18:30:00Z"
    },
    {
        id: "post-2",
        userId: "user-mike",
        userName: "Mike Traveler",
        userAvatar: "https://i.pravatar.cc/150?u=mike",
        destinationTag: "Manali",
        content: "The snow in Solang Valley is perfect right now! ❄️ Paragliding was an experience of a lifetime. #Manali #Adventure",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
        likes: ["user-sarah"],
        savedBy: ["user-1"],
        comments: [],
        createdAt: "2024-12-16T09:15:00Z"
    },
    {
        id: "post-3",
        userId: "user-anjali",
        userName: "Anjali P.",
        destinationTag: "Pune",
        content: "Nothing beats a morning trek to Sinhagad Fort followed by pitla bhakri! ⛰️ The weather is perfect right now.",
        likes: ["user-1", "user-mike", "user-sarah"],
        savedBy: [],
        comments: [],
        createdAt: "2024-12-17T07:45:00Z"
    },
    {
        id: "post-4",
        userId: "user-david",
        userName: "David Chen",
        userAvatar: "https://i.pravatar.cc/150?u=david",
        destinationTag: "Kerala",
        content: "Floating on the backwaters of Alleppey in a houseboat. Pure serenity. 🌴🛶 #Kerala #GodsOwnCountry",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
        likes: ["user-1", "user-sarah"],
        savedBy: ["user-1"],
        comments: [
            {
                id: "c2",
                userId: "user-sarah",
                userName: "Sarah Mitchell",
                text: "Which houseboat service did you use?",
                createdAt: "2024-12-16T16:00:00Z"
            }
        ],
        createdAt: "2024-12-16T15:00:00Z"
    },
    {
        id: "post-5",
        userId: "user-amara",
        userName: "Amara N.",
        userAvatar: "https://i.pravatar.cc/150?u=amara",
        destinationTag: "Varanasi",
        content: "The Ganga Aarti at Dashashwamedh Ghat left me speechless. The energy is indescribable. 🙏✨",
        image: "/varanasi.webp",
        likes: ["user-mike", "user-david"],
        savedBy: [],
        comments: [],
        createdAt: "2024-12-14T09:30:00Z"
    },
    {
        id: "post-6",
        userId: "user-tom",
        userName: "Tom Wilson",
        userAvatar: "https://i.pravatar.cc/150?u=tom",
        destinationTag: "Agra",
        content: "Finally saw the Taj Mahal at sunrise. It truly is a wonder of the world. 🕌 #TajMahal #India",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
        likes: ["user-1", "user-sarah", "user-anjali"],
        savedBy: ["user-1"],
        comments: [],
        createdAt: "2024-12-13T22:15:00Z"
    }
];

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Store Class
class LocalStore {
    constructor() {
        this.init();
    }

    private init() {
        if (!localStorage.getItem("wg_destinations_v17")) {
            localStorage.setItem("wg_destinations_v17", JSON.stringify(INITIAL_DESTINATIONS));
        }
        if (!localStorage.getItem("wg_itineraries_v22")) {
            localStorage.setItem("wg_itineraries_v22", JSON.stringify(INITIAL_ITINERARIES));
        }
        if (!localStorage.getItem("wg_requests_v11")) {
            localStorage.setItem("wg_requests_v11", JSON.stringify(INITIAL_REQUESTS));
        }
        if (!localStorage.getItem("wg_community_posts_v8")) {
            localStorage.setItem("wg_community_posts_v8", JSON.stringify(INITIAL_COMMUNITY_POSTS));
        }
        // No mock users stored, we'll just handle auth in memory/localstorage session
    }

    // Destinations
    async getDestinations(): Promise<Destination[]> {
        await delay(300);
        return JSON.parse(localStorage.getItem("wg_destinations_v17") || "[]");
    }

    async getDestination(id: number): Promise<Destination | undefined> {
        await delay(200);
        const all = JSON.parse(localStorage.getItem("wg_destinations_v17") || "[]") as Destination[];
        return all.find(d => d.id === id);
    }

    async addDestination(destination: Omit<Destination, "id">): Promise<Destination> {
        await delay(400);
        const all = JSON.parse(localStorage.getItem("wg_destinations_v17") || "[]") as Destination[];
        const newId = Math.max(...all.map(d => d.id), 0) + 1;
        const newDestination = { ...destination, id: newId };
        all.push(newDestination);
        localStorage.setItem("wg_destinations_v17", JSON.stringify(all));
        return newDestination;
    }

    async updateDestination(id: number, updates: Partial<Destination>): Promise<Destination> {
        await delay(400);
        const all = JSON.parse(localStorage.getItem("wg_destinations_v17") || "[]") as Destination[];
        const index = all.findIndex(d => d.id === id);
        if (index === -1) throw new Error("Destination not found");

        const updated = { ...all[index], ...updates };
        all[index] = updated;
        localStorage.setItem("wg_destinations_v17", JSON.stringify(all));
        return updated;
    }

    // Itineraries
    async getItineraries(userId: string, isAdmin: boolean = false): Promise<Itinerary[]> {
        await delay(500);
        // Using v21 key to force load of new demo data
        const stored = localStorage.getItem("wg_itineraries_v22");
        let allItineraries: Itinerary[] = [];

        if (stored) {
            allItineraries = JSON.parse(stored);
        } else {
            // First time load - use INITIAL_ITINERARIES
            allItineraries = INITIAL_ITINERARIES;
            this.saveItineraries(userId, allItineraries); // Save initial data
        }

        if (isAdmin) return allItineraries;

        // Filter personal itineraries
        const userItineraries = allItineraries.filter(it => it.userId === userId);

        // Also include the default "demo" itineraries (user-1) if the current user is NOT user-1
        // This ensures every new signup sees the demo data
        if (userId !== "user-1") {
            const demoItineraries = allItineraries.filter(it => it.userId === "user-1");
            return [...userItineraries, ...demoItineraries];
        }

        return userItineraries;
    }

    async saveItineraries(userId: string, itineraries: Itinerary[]): Promise<void> {
        await delay(300);
        // Persist to v21
        localStorage.setItem("wg_itineraries_v22", JSON.stringify(itineraries));
    }

    async getItinerary(id: string): Promise<Itinerary | undefined> {
        await delay(200);
        const all = JSON.parse(localStorage.getItem("wg_itineraries_v22") || "[]") as Itinerary[];
        return all.find(it => it.id === id);
    }

    async createItinerary(itinerary: Omit<Itinerary, "id">): Promise<Itinerary> {
        await delay(400);
        const all = JSON.parse(localStorage.getItem("wg_itineraries_v22") || "[]") as Itinerary[];
        const newItinerary = {
            ...itinerary,
            id: Math.random().toString(36).substr(2, 9)
        };
        all.unshift(newItinerary); // Add to top
        localStorage.setItem("wg_itineraries_v22", JSON.stringify(all));
        return newItinerary;
    }

    async updateItinerary(id: string, updates: Partial<Itinerary>): Promise<Itinerary> {
        await delay(400);
        const all = JSON.parse(localStorage.getItem("wg_itineraries_v22") || "[]") as Itinerary[];
        const index = all.findIndex(it => it.id === id);
        if (index === -1) throw new Error("Itinerary not found");

        const updated = { ...all[index], ...updates };
        all[index] = updated;
        localStorage.setItem("wg_itineraries_v22", JSON.stringify(all));
        return updated;
    }

    // Requests
    async getRequests(): Promise<Request[]> {
        await delay(400);
        return JSON.parse(localStorage.getItem("wg_requests_v11") || "[]");
    }

    async createRequest(request: Omit<Request, "id" | "status" | "createdAt">): Promise<Request> {
        await delay(400);
        const all = JSON.parse(localStorage.getItem("wg_requests_v11") || "[]") as Request[];

        const newRequest: Request = {
            ...request,
            id: "req-" + Math.random().toString(36).substr(2, 9),
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        all.unshift(newRequest);
        localStorage.setItem("wg_requests_v11", JSON.stringify(all));
        return newRequest;
    }

    // ... (skipping unchanged parts)

    // Community
    async getCommunityPosts(): Promise<CommunityPost[]> {
        await delay(300);
        return JSON.parse(localStorage.getItem("wg_community_posts_v8") || "[]");
    }

    async createCommunityPost(post: Omit<CommunityPost, "id" | "likes" | "savedBy" | "createdAt" | "comments">): Promise<CommunityPost> {
        await delay(400);
        const all = JSON.parse(localStorage.getItem("wg_community_posts_v8") || "[]") as CommunityPost[];

        const newPost: CommunityPost = {
            ...post,
            id: "post-" + Math.random().toString(36).substr(2, 9),
            likes: [],
            savedBy: [],
            comments: [],
            createdAt: new Date().toISOString()
        };

        all.unshift(newPost);
        localStorage.setItem("wg_community_posts_v8", JSON.stringify(all));
        return newPost;
    }

    async togglePostLike(postId: string, userId: string): Promise<CommunityPost[]> {
        // Optimistic update
        const all = JSON.parse(localStorage.getItem("wg_community_posts_v8") || "[]") as CommunityPost[];
        const postIndex = all.findIndex(p => p.id === postId);

        if (postIndex !== -1) {
            const post = all[postIndex];
            const hasLiked = post.likes.includes(userId);

            if (hasLiked) {
                post.likes = post.likes.filter(id => id !== userId);
            } else {
                post.likes.push(userId);
            }

            all[postIndex] = post;
            localStorage.setItem("wg_community_posts_v8", JSON.stringify(all));
        }

        return all;
    }

    async addComment(postId: string, comment: Omit<Comment, "id" | "createdAt">): Promise<CommunityPost[]> {
        await delay(300);
        const all = JSON.parse(localStorage.getItem("wg_community_posts_v8") || "[]") as CommunityPost[];
        const postIndex = all.findIndex(p => p.id === postId);

        if (postIndex !== -1) {
            const newComment: Comment = {
                id: "c-" + Math.random().toString(36).substr(2, 9),
                ...comment,
                createdAt: new Date().toISOString()
            };

            // Initialize comments array if it doesn't exist (migration safety)
            if (!all[postIndex].comments) all[postIndex].comments = [];

            all[postIndex].comments.push(newComment);
            localStorage.setItem("wg_community_posts_v8", JSON.stringify(all));
        }
        return all;
    }

    async deleteCommunityPost(postId: string): Promise<CommunityPost[]> {
        await delay(300);
        let all = JSON.parse(localStorage.getItem("wg_community_posts_v8") || "[]") as CommunityPost[];
        all = all.filter(p => p.id !== postId);
        localStorage.setItem("wg_community_posts_v8", JSON.stringify(all));
        return all;
    }

    async updateCommunityPost(postId: string, content: string): Promise<CommunityPost[]> {
        await delay(300);
        let all = JSON.parse(localStorage.getItem("wg_community_posts_v8") || "[]") as CommunityPost[];
        const index = all.findIndex(p => p.id === postId);
        if (index !== -1) {
            all[index] = { ...all[index], content };
            localStorage.setItem("wg_community_posts_v8", JSON.stringify(all));
        }
        return all;
    }

    // Passport
    async getPassport(userId: string): Promise<Passport> {
        await delay(500);
        // Using v7 key to force refresh for passport logic update
        const storedPassports = JSON.parse(localStorage.getItem("wg_passports_v7") || "{}");

        let passport = storedPassports[userId];

        if (!passport) {
            // Initialize new passport
            passport = {
                userId,
                passportNumber: "WG-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
                nationality: "Global Citizen",
                issuedDate: new Date().toISOString(),
                stamps: [],
                badges: []
            };
        }

        // Safety check
        if (!passport.stamps) passport.stamps = [];
        if (!passport.badges) passport.badges = [];

        // Auto-generate stamps from confirmed itineraries
        // This now calls the updated getItineraries which returns demo trips too
        const itineraries = await this.getItineraries(userId);
        const existingStampNames = new Set(passport.stamps.map((s: Stamp) => s.destinationName));

        itineraries.forEach(itinerary => {
            if (itinerary.status !== 'confirmed' && itinerary.status !== 'completed') return;

            // Simplify destination name for matches (e.g. "Paris, France" -> "Paris")
            const city = itinerary.destination.split(",")[0];

            const existingStamp = passport.stamps.find(s => s.destinationName === city);
            const status = itinerary.status === 'completed' ? 'completed' : 'planned';

            if (existingStamp) {
                // Update status if it changed
                if (existingStamp.status !== status) {
                    existingStamp.status = status;
                }
            } else {
                // Create new stamp
                passport.stamps.push({
                    id: Math.random().toString(36).substr(2, 9),
                    destinationName: city,
                    date: itinerary.endDate, // Stamp date = trip completion
                    icon: "✈️", // Default icon
                    status: status as "completed" | "planned"
                });
            }
        });

        // Basic Badges Logic
        const badgeList: Badge[] = [];
        // 1. First Trip
        if (passport.stamps.length >= 1) {
            badgeList.push({
                id: "badge-first-trip",
                name: "First Steps",
                description: "Booked your first trip with WanderGuide.",
                icon: "🌍",
                unlockedAt: new Date().toISOString()
            });
        }
        // 2. Explorer (3+ stamps)
        if (passport.stamps.length >= 3) {
            badgeList.push({
                id: "badge-explorer",
                name: "Explorer",
                description: "Collected 3+ destination stamps.",
                icon: "compass", // using string for now, will map to Lucide icon in UI
                unlockedAt: new Date().toISOString()
            });
        }

        // Merge badges (simple overwrite for now to ensure up-to-date)
        passport.badges = badgeList;

        // Persist
        storedPassports[userId] = passport;
        localStorage.setItem("wg_passports_v7", JSON.stringify(storedPassports));

        return passport;
    }
}

export const store = new LocalStore();
