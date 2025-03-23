import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { ActivityType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type ActivityFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  price: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  guestCount: number;
};

type Props = {
  activity?: ActivityType;
  onSave: (ActivityFormData: FormData) => void;
  isLoading: boolean;
};

const ManageActivityForm = ({ onSave, isLoading, activity }: Props) => {
  const formMethods = useForm<ActivityFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(activity);
    }, [activity, reset]);

  const onSubmit = handleSubmit((formDataJson: ActivityFormData) => {
    const formData = new FormData();
    if (activity) {
      formData.append("_id", activity._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("price", formDataJson.price.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("guestCount", formDataJson.guestCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    // formDataJson.facilities.forEach((facility) => {
    //   formData.append("facilities", facility);
    // });

    if (formDataJson.imageUrls) {
        formDataJson.imageUrls.forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url);
        });
    //   formDataJson.imageUrls.forEach((imageUrl) => {
    //     formData.append("imageUrls", imageUrl);
    //   });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageActivityForm;
