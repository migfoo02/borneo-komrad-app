import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  startDate: Date;
  endDate: Date;
  guestCount: number;
  activityId: string;
  saveSearchValues: (
    destination: string,
    startDate: Date,
    endDate: Date,
    guestCount: number
  ) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [startDate, setstartDate] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("startDate") || new Date().toISOString())
  );
  const [endDate, setendDate] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("endDate") || new Date().toISOString())
  );
  const [guestCount, setguestCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("guestCount") || "1")
  );
  const [activityId, setActivityId] = useState<string>(
    () => sessionStorage.getItem("activityId") || ""
  );

  const saveSearchValues = (
    destination: string,
    startDate: Date,
    endDate: Date,
    guestCount: number,
    activityId?: string
  ) => {
    setDestination(destination);
    setstartDate(startDate);
    setendDate(endDate);
    setguestCount(guestCount);
    if (activityId) {
      setActivityId(activityId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("startDate", startDate.toISOString());
    sessionStorage.setItem("endDate", endDate.toISOString());
    sessionStorage.setItem("guestCount", guestCount.toString());
    if (activityId) {
      sessionStorage.setItem("activityId", activityId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        startDate,
        endDate,
        guestCount,
        activityId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
  };