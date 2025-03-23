import { useFormContext } from "react-hook-form";
import { ActivityTypes } from "../../config/activity-options-config";
import { ActivityFormData } from "./ManageActivityForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ActivityFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-3 gap-2">
        {ActivityTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-200 text-sm rounded-full px-4 py-2 font-semibold flex justify-center items-center"
                : "cursor-pointer bg-gray-200 text-sm rounded-full px-4 py-2 font-semibold flex justify-center items-center"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
