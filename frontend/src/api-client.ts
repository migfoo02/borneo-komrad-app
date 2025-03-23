import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { ActivityType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// react query
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error signing out");
  }
};

export const addMyActivity = async (activityFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-activities`, {
    method: "POST",
    credentials: "include",
    body: activityFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add activity");
  }

  return response.json();
};

export const fetchMyActivities = async (): Promise<ActivityType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-activities`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching activities");
  }

  return response.json();
};

export const fetchMyActivityById = async (
  activityId: string
): Promise<ActivityType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-activities/${activityId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching activities");
  }

  return response.json();
};

export const updateMyActivityById = async (activityFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-activities/${activityFormData.get("activityId")}`,
    {
      method: "PUT",
      body: activityFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update activity");
  }

  return response.json();
};
