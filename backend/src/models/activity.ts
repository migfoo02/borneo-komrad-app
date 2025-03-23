import mongoose from 'mongoose';

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

const activitySchema = new mongoose.Schema<ActivityType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    guestCount: { type: Number, required: true },
    facilities: [{ type: [String], required: true }],
    price: { type: Number, required: true },
    starRating: { type: Number, required: true, min:1, max:5 },
    imageUrls: [{ type: [String], required: true }],
    lastUpdated: { type: Date, required: true },
});

const Activity = mongoose.model<ActivityType>("Activity", activitySchema);

export default Activity;