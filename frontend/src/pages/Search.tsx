import { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import SearchResultsCard from "../components/SearchResultsCard.tsx";
import Pagination from "../components/Pagination.tsx";
import StarRatingFilter from "../components/StarRatingFilter.tsx";
import ActivityTypesFilter from "../components/ActivityTypesFilter.tsx";
import FacilitiesFilter from "../components/FacilitiesFilter.tsx";
import PriceFilter from "../components/PriceFilter.tsx";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>(
    []
  );
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    startDate: search.startDate.toISOString(),
    endDate: search.endDate.toISOString(),
    guestCount: search.guestCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedActivityTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: activityData } = useQuery(
    ["searchActivities", searchParams],
    () => apiClient.searchActivities(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    // Update selectedStars based on whether the checkbox is checked or not
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleActivityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const activityType = event.target.value;

    // Update selectedStars based on whether the checkbox is checked or not
    setSelectedActivityTypes((prevActivityTypes) =>
      event.target.checked
        ? [...prevActivityTypes, activityType]
        : prevActivityTypes.filter((activity) => activity !== activityType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <ActivityTypesFilter
            selectedActivityTypes={selectedActivityTypes}
            onChange={handleActivityTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {activityData?.pagination.total} Activities found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="priceAsc">
              Price (low to high)
            </option>
            <option value="priceDesc">
              Price (high to low)
            </option>
          </select>
        </div>
        {activityData?.data.map((activity) => (
          <SearchResultsCard activity={activity} />
        ))}
        <div>
          <Pagination
            page={activityData?.pagination.page || 1}
            pages={activityData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
