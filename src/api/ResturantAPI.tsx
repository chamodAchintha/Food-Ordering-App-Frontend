import { SearchState } from "@/pages/SearchPage";
import { Resturant, ResturantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetResturant = (resturantId?: string) => {
  const getResturantByIdRequest = async (): Promise<Resturant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/resturant/${resturantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get resturant");
    }

    return response.json();
  };

  const { data: resturant, isLoading } = useQuery(
    "fetchResturant",
    getResturantByIdRequest,
    {
      enabled: !!resturantId,
    }
  );

  return { resturant, isLoading };
};

export const useSearchResturants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<ResturantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/resturant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get resturant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchResturants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
