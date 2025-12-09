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
    days: ItineraryDay[];
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
        startDate: "2024-12-15",
        endDate: "2024-12-22",
        status: "confirmed",
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

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Store Class
class LocalStore {
    constructor() {
        this.init();
    }

    private init() {
        if (!localStorage.getItem("wg_destinations_v8")) {
            localStorage.setItem("wg_destinations_v8", JSON.stringify(INITIAL_DESTINATIONS));
        }
        if (!localStorage.getItem("wg_itineraries_v8")) {
            localStorage.setItem("wg_itineraries_v8", JSON.stringify(INITIAL_ITINERARIES));
        }
        if (!localStorage.getItem("wg_requests_v8")) {
            localStorage.setItem("wg_requests_v8", JSON.stringify(INITIAL_REQUESTS));
        }
        // No mock users stored, we'll just handle auth in memory/localstorage session
    }

    // Destinations
    async getDestinations(): Promise<Destination[]> {
        await delay(300);
        return JSON.parse(localStorage.getItem("wg_destinations_v8") || "[]");
    }

    async getDestination(id: number): Promise<Destination | undefined> {
        await delay(200);
        const all = JSON.parse(localStorage.getItem("wg_destinations_v8") || "[]") as Destination[];
        return all.find(d => d.id === id);
    }

    // Itineraries
    async getItineraries(userId: string): Promise<Itinerary[]> {
        await delay(300);
        const all = JSON.parse(localStorage.getItem("wg_itineraries_v8") || "[]") as Itinerary[];
        return all.filter(it => it.userId === userId);
    }

    async getItinerary(id: string): Promise<Itinerary | undefined> {
        await delay(200);
        const all = JSON.parse(localStorage.getItem("wg_itineraries_v8") || "[]") as Itinerary[];
        return all.find(it => it.id === id);
    }

    // Requests
    async getRequests(): Promise<Request[]> {
        await delay(400);
        return JSON.parse(localStorage.getItem("wg_requests_v8") || "[]");
    }

    async createRequest(req: Omit<Request, "id" | "createdAt" | "status">): Promise<Request> {
        await delay(500);
        const all = JSON.parse(localStorage.getItem("wg_requests_v8") || "[]") as Request[];
        const newReq: Request = {
            ...req,
            id: Math.random().toString(36).substr(2, 9),
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        all.unshift(newReq);
        localStorage.setItem("wg_requests_v8", JSON.stringify(all));
        return newReq;
    }

    async updateRequestStatus(id: string, status: Request["status"]): Promise<void> {
        await delay(300);
        const all = JSON.parse(localStorage.getItem("wg_requests_v8") || "[]") as Request[];
        const index = all.findIndex(r => r.id === id);
        if (index !== -1) {
            all[index].status = status;
            localStorage.setItem("wg_requests_v8", JSON.stringify(all));
        }
    }

    // User Actions
    async toggleFavorite(userId: string, destinationId: number): Promise<number[]> {
        // In a real app this would sync to server. 
        // For now we will just return the updated list and let the context handle the user object update
        return [];
    }

    async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
        await delay(300);
        // Simulate update
        return {
            id: userId,
            name: updates.name || "Test User",
            email: updates.email || "test@example.com",
            role: "user",
            favorites: [],
            ...updates
        };
    }
}

export const store = new LocalStore();
