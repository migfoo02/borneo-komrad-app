import { useFormContext } from "react-hook-form";
import { ActivityFormData } from "./ManageActivityForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ActivityFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Number of Guests
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("guestCount", {
              required: "This field is required",
            })}
          />
          {errors.guestCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.guestCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
