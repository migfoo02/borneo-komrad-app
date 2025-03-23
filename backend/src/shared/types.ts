export type ActivityType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    guestCount: number;
    facilities: string[];
    price: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}