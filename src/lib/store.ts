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
    role: "user";
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
        id: 1,
        name: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
        rating: 4.9,
        reviews: 2847,
        price: "$1,599",
        category: "Beach",
        tags: ["Romantic", "Island", "Historic"],
        description: "Experience the magic of the Aegean Sea with stunning sunsets, white-washed buildings, and crystal clear waters.",
        locationType: "International",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Arrival & Oia Sunset",
                activities: [
                    { time: "Morning", icon: "plane", title: "Arrival", description: "Arrive at Thira Airport and transfer to hotel." },
                    { time: "Afternoon", icon: "hotel", title: "Explore Fira", description: "Walk through the capital's narrow streets." },
                    { time: "Evening", icon: "camera", title: "Oia Sunset", description: "Watch the world-famous sunset from Oia Castle." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Volcano & Hot Springs",
                activities: [
                    { time: "Morning", icon: "ship", title: "Boat Tour", description: "Sail to the volcanic islands of Nea Kameni." },
                    { time: "Afternoon", icon: "water", title: "Hot Springs", description: "Swim in the therapeutic thermal waters." },
                    { time: "Evening", icon: "food", title: "Seafood Dinner", description: "Fresh seafood at Ammoudi Bay." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Winery & Beach",
                activities: [
                    { time: "Morning", icon: "wine", title: "Wine Tasting", description: "Visit Santo Wines for local varieties." },
                    { time: "Afternoon", icon: "sun", title: "Red Beach", description: "Relax on the unique red sand beach." },
                    { time: "Evening", icon: "plane", title: "Departure", description: "Transfer to airport for departure." }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
        rating: 4.8,
        reviews: 3421,
        price: "$1,899",
        category: "Cultural",
        tags: ["Temples", "Nature", "Traditional"],
        description: "Immerse yourself in ancient traditions, serene temples, and beautiful bamboo forests.",
        locationType: "International",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Southern Higashiyama",
                activities: [
                    { time: "Morning", icon: "camera", title: "Kiyomizu-dera", description: "Visit the iconic wooden stage temple." },
                    { time: "Afternoon", icon: "walk", title: "Sannenzaka", description: "Stroll through preserved historic streets." },
                    { time: "Evening", icon: "food", title: "Gion District", description: "Spot Geishas and dine in Pontocho." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Arashiyama Bamboo Grove",
                activities: [
                    { time: "Morning", icon: "tree", title: "Bamboo Grove", description: "Walk through the towering bamboo stalks." },
                    { time: "Afternoon", icon: "monkey", title: "Monkey Park", description: "Visit Iwatayama Monkey Park." },
                    { time: "Evening", icon: "food", title: "Kaiseki Dinner", description: "Traditional multi-course Japanese dinner." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Fushimi Inari",
                activities: [
                    { time: "Morning", icon: "walk", title: "Fushimi Inari", description: "Hike through thousands of torii gates." },
                    { time: "Afternoon", icon: "train", title: "Nara Day Trip", description: "Short train ride to see the deer park." },
                    { time: "Evening", icon: "train", title: "Return", description: "Return to Kyoto station." }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        rating: 4.7,
        reviews: 4102,
        price: "$1,299",
        category: "Beach",
        tags: ["Tropical", "Adventure", "Wellness"],
        locationType: "International",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Ubud Culture",
                activities: [
                    { time: "Morning", icon: "monkey", title: "Monkey Forest", description: "Visit the Sacred Monkey Forest Sanctuary." },
                    { time: "Afternoon", icon: "tree", title: "Rice Terraces", description: "Tegalalang Rice Terrace swing." },
                    { time: "Evening", icon: "dance", title: "Traditonal Dance", description: "Watch a Kecak Fire Dance performance." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Seminyak Beach",
                activities: [
                    { time: "Morning", icon: "sun", title: "Beach Time", description: "Relax at Seminyak Beach." },
                    { time: "Afternoon", icon: "shop", title: "Shopping", description: "Explore local boutiques." },
                    { time: "Evening", icon: "food", title: "Beach Club", description: "Sunset drinks at Potato Head." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Uluwatu Temple",
                activities: [
                    { time: "Morning", icon: "water", title: "Padang Padang", description: "Swim at the famous surf beach." },
                    { time: "Afternoon", icon: "camera", title: "Uluwatu Temple", description: "Cliffside temple views." },
                    { time: "Evening", icon: "food", title: "Seafood BBQ", description: "Dinner on the beach at Jimbaran Bay." }
                ]
            }
        ]
    },
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
                    { time: "Morning", icon: "water", title: "Baga Beach", description: "Water sports and fun at the beach." },
                    { time: "Afternoon", icon: "food", title: "Beach Shack", description: "Authentic Goan curry at a shack." },
                    { time: "Evening", icon: "dance", title: "Nightlife", description: "Experience the party scene at Tito's Lane." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Old Goa Heritage",
                activities: [
                    { time: "Morning", icon: "camera", title: "Basilica of Bom Jesus", description: "Visit the UNESCO World Heritage site." },
                    { time: "Afternoon", icon: "walk", title: "Fontainhas", description: "Walk through the Latin Quarter." },
                    { time: "Evening", icon: "ship", title: "River Cruise", description: "Sunset cruise on the Mandovi River." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "South Goa Peace",
                activities: [
                    { time: "Morning", icon: "sun", title: "Palolem Beach", description: "Relax at the scenic crescent beach." },
                    { time: "Afternoon", icon: "camera", title: "Cabo de Rama", description: "Visit the historic fort with sea views." },
                    { time: "Evening", icon: "food", title: "Seafood Dinner", description: "Fresh catch at Martin's Corner." }
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
        id: 7,
        name: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        rating: 4.9,
        reviews: 2098,
        price: "$3,299",
        category: "Beach",
        tags: ["Luxury", "Diving", "Overwater"],
        locationType: "International",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Island Arrival",
                activities: [
                    { time: "Morning", icon: "plane", title: "Seaplane Transfer", description: "Scenic flight to the resort." },
                    { time: "Afternoon", icon: "hotel", title: "Overwater Villa", description: "Check into your luxury villa." },
                    { time: "Evening", icon: "food", title: "Beach Dinner", description: "Candlelight dinner on the sand." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Underwater World",
                activities: [
                    { time: "Morning", icon: "water", title: "Snorkeling", description: "Explore the house reef." },
                    { time: "Afternoon", icon: "sun", title: "Spa", description: "Underwater spa treatment." },
                    { time: "Evening", icon: "glass", title: "Sunset Cruise", description: "Dolphin watching cruise." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Leisure & Departure",
                activities: [
                    { time: "Morning", icon: "sun", title: "Pool Time", description: "Relax by the infinity pool." },
                    { time: "Afternoon", icon: "water", title: "Watersports", description: "Kayaking or jet skiing." },
                    { time: "Evening", icon: "plane", title: "Departure", description: "Speedboat to airport." }
                ]
            }
        ]
    },
    {
        id: 8,
        name: "Swiss Alps",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
        rating: 4.8,
        reviews: 1765,
        price: "$2,199",
        category: "Adventure",
        tags: ["Skiing", "Mountains", "Scenic"],
        locationType: "International",
        days: [
            {
                day: 1,
                date: "Day 1",
                title: "Zermatt Arrival",
                activities: [
                    { time: "Morning", icon: "train", title: "Glacier Express", description: "Scenic train ride to Zermatt." },
                    { time: "Afternoon", icon: "walk", title: "Village Walk", description: "Explore the car-free village." },
                    { time: "Evening", icon: "food", title: "Fondue", description: "Traditional Swiss cheese fondue." }
                ]
            },
            {
                day: 2,
                date: "Day 2",
                title: "Matterhorn",
                activities: [
                    { time: "Morning", icon: "mountain", title: "Gornergrat", description: "Cogwheel train to Matterhorn view." },
                    { time: "Afternoon", icon: "walk", title: "Hiking / Skiing", description: "Outdoor activities on the slopes." },
                    { time: "Evening", icon: "glass", title: "Apres Ski", description: "Relax at a mountain bar." }
                ]
            },
            {
                day: 3,
                date: "Day 3",
                title: "Interlaken",
                activities: [
                    { time: "Morning", icon: "train", title: "Train to Interlaken", description: "Journey between the lakes." },
                    { time: "Afternoon", icon: "ship", title: "Lake Cruise", description: "Boat trip on Lake Brienz." },
                    { time: "Evening", icon: "food", title: "Chocolate", description: "Swiss chocolate tasting." }
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
    }
];

const INITIAL_ITINERARIES: Itinerary[] = [
    {
        id: "1",
        userId: "user-1",
        destination: "Paris, France",
        heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
        startDate: "2024-03-10",
        endDate: "2024-03-15",
        status: "completed",
        price: 25000,
        days: [
            {
                day: 1,
                date: "December 15",
                title: "Arrival & Champs-Élysées",
                activities: [
                    {
                        time: "Morning",
                        icon: "plane",
                        title: "Arrive at Charles de Gaulle Airport",
                        description: "Private transfer to hotel in the 8th arrondissement",
                    },
                    {
                        time: "Afternoon",
                        icon: "hotel",
                        title: "Check-in at Hotel Le Bristol",
                        description: "Settle into your suite with Eiffel Tower views",
                    },
                    {
                        time: "Evening",
                        icon: "food",
                        title: "Dinner at L'Avenue",
                        description: "Classic French cuisine on the Champs-Élysées",
                    },
                ],
            },
            {
                day: 2,
                date: "December 16",
                title: "Art & Culture Day",
                activities: [
                    {
                        time: "Morning",
                        icon: "camera",
                        title: "Louvre Museum",
                        description: "Skip-the-line tickets, see Mona Lisa and Venus de Milo",
                    },
                    {
                        time: "Afternoon",
                        icon: "food",
                        title: "Lunch at Café Marly",
                        description: "Dine with views of the Louvre pyramid",
                    },
                    {
                        time: "Evening",
                        icon: "camera",
                        title: "Seine River Cruise",
                        description: "Sunset cruise past Notre-Dame and the Eiffel Tower",
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        userId: "user-1",
        destination: "Goa, India",
        heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
        startDate: "2024-01-10", // Past date to show as completed in passport
        endDate: "2024-01-15",
        status: "completed",
        days: [
            {
                day: 1,
                date: "January 10",
                title: "North Goa Vibes",
                activities: [
                    { time: "Morning", icon: "water", title: "Baga Beach", description: "Water sports and fun at the beach." },
                    { time: "Afternoon", icon: "food", title: "Britto's", description: "Lunch at the famous beach shack." },
                    { time: "Evening", icon: "dance", title: "Night Market", description: "Shopping at Arpora Saturday Night Market." }
                ]
            }
        ]
    },
    {
        id: "3",
        userId: "user-1",
        destination: "Ujjain, India",
        heroImage: "/ujjain.jpg",
        startDate: "2024-03-01", // Past date
        endDate: "2024-03-03",
        status: "completed",
        days: [
            {
                day: 1,
                date: "March 1",
                title: "Mahakal Darshan",
                activities: [
                    { time: "Morning", icon: "temple", title: "Mahakaleshwar", description: "Bhasma Aarti and Darshan." },
                    { time: "Afternoon", icon: "walk", title: "Ram Ghat", description: "Holy dip in Shipra river." },
                    { time: "Evening", icon: "temple", title: "Harsiddhi Mata", description: "Evening Aarti." }
                ]
            }
        ]
    },
    {
        id: "4",
        userId: "user-1",
        destination: "Pune, India",
        heroImage: "/pune.jpeg",
        startDate: "2025-02-14", // Future date (upcoming)
        endDate: "2024-02-15",
        status: "completed",
        price: 45000,
        days: [
            {
                day: 1,
                date: "February 14",
                title: "Heritage Walk",
                activities: [
                    { time: "Morning", icon: "fort", title: "Shaniwar Wada", description: "Explore the Peshwa fortification." },
                    { time: "Afternoon", icon: "food", title: "Goodluck Cafe", description: "Bun Maska and Irani Chai." },
                    { time: "Evening", icon: "mountain", title: "Sinhagad", description: "Sunset drive to the fort." }
                ]
            }
        ]
    },
    {
        id: "5",
        userId: "user-1",
        destination: "Santorini, Greece",
        heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200",
        startDate: "2023-09-15",
        endDate: "2023-09-20",
        status: "completed",
        price: 95000,
        days: []
    },
    {
        id: "6",
        userId: "user-1",
        destination: "Kyoto, Japan",
        heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
        startDate: "2023-11-05",
        endDate: "2023-11-10",
        status: "completed",
        price: 110000,
        days: []
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
        days: []
    }
];

const INITIAL_REQUESTS: Request[] = [
    {
        id: "1",
        userId: "user-2",
        user: { name: "Sarah Mitchell", email: "sarah@example.com" },
        destination: "Maldives",
        startDate: "2025-01-10",
        days: 10,
        budget: "$5000",
        mobile: "+1234567890",
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
        destinationTag: "Santorini",
        content: "Just returned from the most magical sunset in Oia! 🌅 Definitely recommend booking a table at Kastro Oia restaurant way in advance. The view is unbeatable!",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600",
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
        destinationTag: "Kyoto",
        content: "The bamboo grove in Arashiyama is serene if you get there by 7 AM. After 9 AM it's packed! 🎋 #Japan #TravelTips",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
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
        destinationTag: "Paris",
        content: "Found this hidden gem of a cafe in Montmartre. The croissant was life-changing! 🥐☕️ #Paris #Foodie",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=600",
        likes: ["user-1", "user-sarah"],
        savedBy: ["user-1"],
        comments: [
            {
                id: "c2",
                userId: "user-sarah",
                userName: "Sarah Mitchell",
                text: "Which cafe is this? I need to go!",
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
        destinationTag: "Maldives",
        content: "Waking up to this view every day... I never want to leave! 🏝️ The water is clearer than glass.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
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
        destinationTag: "Iceland",
        content: "Chasing the Northern Lights was totally worth the freezing cold. 🌌 Simply magical experience.",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600",
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
        if (!localStorage.getItem("wg_destinations_v9")) {
            localStorage.setItem("wg_destinations_v9", JSON.stringify(INITIAL_DESTINATIONS));
        }
        if (!localStorage.getItem("wg_itineraries_v9")) {
            localStorage.setItem("wg_itineraries_v9", JSON.stringify(INITIAL_ITINERARIES));
        }
        if (!localStorage.getItem("wg_requests_v9")) {
            localStorage.setItem("wg_requests_v9", JSON.stringify(INITIAL_REQUESTS));
        }
        if (!localStorage.getItem("wg_community_posts_v3")) {
            localStorage.setItem("wg_community_posts_v3", JSON.stringify(INITIAL_COMMUNITY_POSTS));
        }
        // No mock users stored, we'll just handle auth in memory/localstorage session
    }

    // Destinations
    async getDestinations(): Promise<Destination[]> {
        await delay(300);
        return JSON.parse(localStorage.getItem("wg_destinations_v9") || "[]");
    }

    async getDestination(id: number): Promise<Destination | undefined> {
        await delay(200);
        const all = JSON.parse(localStorage.getItem("wg_destinations_v9") || "[]") as Destination[];
        return all.find(d => d.id === id);
    }

    // Itineraries
    async getItineraries(userId: string): Promise<Itinerary[]> {
        await delay(500);
        // Using v12 key to force load of new demo data
        const stored = localStorage.getItem("wg_itineraries_v12");
        let allItineraries: Itinerary[] = [];

        if (stored) {
            allItineraries = JSON.parse(stored);
        } else {
            // First time load - use INITIAL_ITINERARIES
            allItineraries = INITIAL_ITINERARIES;
            this.saveItineraries(userId, allItineraries); // Save initial data
        }

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
        // Persist to v12
        localStorage.setItem("wg_itineraries_v12", JSON.stringify(itineraries));
    }

    async getItinerary(id: string): Promise<Itinerary | undefined> {
        await delay(200);
        const all = JSON.parse(localStorage.getItem("wg_itineraries_v12") || "[]") as Itinerary[];
        return all.find(it => it.id === id);
    }

    // Requests
    async getRequests(): Promise<Request[]> {
        await delay(400);
        return JSON.parse(localStorage.getItem("wg_requests_v9") || "[]");
    }

    // ... (skipping unchanged parts)

    // Community
    async getCommunityPosts(): Promise<CommunityPost[]> {
        await delay(300);
        return JSON.parse(localStorage.getItem("wg_community_posts_v3") || "[]");
    }

    async createCommunityPost(post: Omit<CommunityPost, "id" | "likes" | "savedBy" | "createdAt" | "comments">): Promise<CommunityPost> {
        await delay(400);
        const all = JSON.parse(localStorage.getItem("wg_community_posts_v3") || "[]") as CommunityPost[];

        const newPost: CommunityPost = {
            ...post,
            id: "post-" + Math.random().toString(36).substr(2, 9),
            likes: [],
            savedBy: [],
            comments: [],
            createdAt: new Date().toISOString()
        };

        all.unshift(newPost);
        localStorage.setItem("wg_community_posts_v3", JSON.stringify(all));
        return newPost;
    }

    async togglePostLike(postId: string, userId: string): Promise<CommunityPost[]> {
        // Optimistic update
        const all = JSON.parse(localStorage.getItem("wg_community_posts_v3") || "[]") as CommunityPost[];
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
            localStorage.setItem("wg_community_posts_v3", JSON.stringify(all));
        }

        return all;
    }

    async addComment(postId: string, comment: Omit<Comment, "id" | "createdAt">): Promise<CommunityPost[]> {
        await delay(300);
        const all = JSON.parse(localStorage.getItem("wg_community_posts_v3") || "[]") as CommunityPost[];
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
            localStorage.setItem("wg_community_posts_v3", JSON.stringify(all));
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
