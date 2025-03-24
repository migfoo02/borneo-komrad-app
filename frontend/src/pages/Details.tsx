import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
// import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Details = () => {
  const { activityId: activityId } = useParams();

  const { data: activity } = useQuery(
    "fetchActivityById",
    () => apiClient.fetchActivityById(activityId || ""),
    {
      enabled: !!activityId,
    }
  );

  if (!activity) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: activity.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{activity.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {activity.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={activity.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {activity.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{activity.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            price={activity.price}
            activityId={activity._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
