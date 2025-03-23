import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Activity from "../models/activity";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { ActivityType } from "../shared/types";

const router = express.Router();

// store files in memory in Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

//api/my-activities
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Activity type is required"),
    body("price")
      .notEmpty()
      .isNumeric()
      .withMessage("Price is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newActivity: ActivityType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newActivity.imageUrls = imageUrls;
      newActivity.lastUpdated = new Date();
      newActivity.userId = req.userId;

      const activity = new Activity(newActivity);
      await activity.save();

      // return 201 status
      res.status(201).send(activity);
    } catch (e) {
      console.log("Error creating activity: ", e);
      res.status(500).json({ message: "Somethihg went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
      const activities = await Activity.find({ userId: req.userId });
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching activities" });
    }
  });

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const activity = await Activity.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities" });
  }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  console.log("Image URLs: ", imageUrls);
  return imageUrls;
}

router.put(
    "/:activityId",
    verifyToken,
    upload.array("imageFiles"),
    async (req: Request, res: Response): Promise<any> => {
      try {
        const updatedActivity: ActivityType = req.body;
        updatedActivity.lastUpdated = new Date();
  
        const activity = await Activity.findOneAndUpdate(
          {
            _id: req.params.activityId,
            userId: req.userId,
          },
          updatedActivity,
          { new: true }
        );
  
        if (!activity) {
          return res.status(404).json({ message: "Activity not found" });
        }
  
        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);
  
        activity.imageUrls = [
          ...updatedImageUrls,
          ...(updatedActivity.imageUrls || []),
        ];
  
        await activity.save();
        res.status(201).json(activity);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  );

export default router;