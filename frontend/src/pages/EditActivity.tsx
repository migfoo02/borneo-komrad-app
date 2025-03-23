import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageActivityForm from "../forms/ManageActivityForm/ManageActivityForm";
import { useAppContext } from "../contexts/AppContext";

const EditActivity = () => {
  const { activityId } = useParams();
  const { showToast } = useAppContext();

  const { data: activity } = useQuery(
    "fetchMyActivityById",
    () => apiClient.fetchMyActivityById(activityId || ""),
    {
      enabled: !!activityId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyActivityById, {
    onSuccess: () => {
      showToast({ message: "Activity Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Activity", type: "ERROR" });
    },
  });

  const handleSave = (activityFormData: FormData) => {
    mutate(activityFormData);
  };

  return (
    <ManageActivityForm activity={activity} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditActivity;