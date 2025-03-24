import { ActivityTypes } from "../config/activity-options-config";

type Props = {
    selectedActivityTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const ActivityTypesFilter = ({ selectedActivityTypes: selectedActivities, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Activity Type</h4>
        {ActivityTypes.map((activityType) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={activityType}
              checked={selectedActivities.includes(activityType)}
              onChange={onChange}
            />
            <span>{activityType}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default ActivityTypesFilter;