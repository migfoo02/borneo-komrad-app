import { useMutation } from "react-query";
import ManageActivityForm from "../forms/ManageActivityForm/ManageActivityForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const AddActivity = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyActivity, {
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

  return <ManageActivityForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddActivity;
