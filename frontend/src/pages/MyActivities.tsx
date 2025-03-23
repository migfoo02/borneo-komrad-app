import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap, BsFillPersonFill } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyActivities = () => {
  const { data: activityData } = useQuery(
    "fetchMyActivities",
    apiClient.fetchMyActivities,
    {
      onError: () => {},
    }
  );

  if (!activityData) {
    return <span>No activities found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Activities</h1>
        <Link
          to="/add-activity"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Activity
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {activityData.map((activity) => (
          <div
            data-testid="activity-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{activity.name}</h2>
            <div className="whitespace-pre-line">{activity.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {activity.city}, {activity.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {activity.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${activity.price}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsFillPersonFill className="mr-1" />
                {activity.guestCount} guests
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {activity.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-activity/${activity._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyActivities;