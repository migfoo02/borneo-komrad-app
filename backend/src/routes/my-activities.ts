import express, {Request, Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Activity, { ActivityType } from '../models/activity';
import verifyToken from '../midleware/auth';
import { body } from 'express-validator';

const router = express.Router();

// store files in memory in Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    }
 });

//api/my-activities
router.post("/", 
    verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Activity type is required"),
    body("price").notEmpty().isNumeric().withMessage("Price is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    ], 
    upload.array("imageFiles", 6), 
    async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newActivity: ActivityType = req.body;

        // upload images to Cloudinary
        const uploadPromises = imageFiles.map(async(image) => {
            // convert image to a base64 string
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        newActivity.imageUrls = imageUrls;
        newActivity.lastUpdated = new Date();
        newActivity.userId = req.userId;

        // save the new activity to the database
        const activity = new Activity(newActivity);
        await activity.save();

        // return 201 status
        res.status(201).send(activity);

    } catch (e) {
        console.log("Error creating activity: ", e);
        res.status(500).json({message: "Somethihg went wrong"});
    }
});

export default router;