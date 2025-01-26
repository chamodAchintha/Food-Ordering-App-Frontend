import { Order, Resturant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyResturant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyResturantRequest = async (): Promise<Resturant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get resturant");
    }
    return response.json();
  };

  const { data: resturant, isLoading } = useQuery(
    "fetchMyResturant",
    getMyResturantRequest
  );

  return { resturant, isLoading };
};

export const useCreateMyResturant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyResturantRequest = async (
    resturantFormData: FormData
  ): Promise<Resturant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: resturantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to crete resturant");
    }

    return response.json();
  };

  const {
    mutate: createResturant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyResturantRequest);

  if (isSuccess) {
    toast.success("Resturant created");
  }
  if (error) {
    toast.error("Unable to update resturant");
  }

  return { createResturant, isLoading };
};

export const useUpdateMyResturant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateResturantRequest = async (
    resturantFormData: FormData
  ): Promise<Resturant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: resturantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update resturant");
    }

    return response.json();
  };

  const {
    mutate: updateResturant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateResturantRequest);

  if (isSuccess) {
    toast.success("Resturant Updated");
  }

  if (error) {
    toast.error("Unable to update resturant");
  }

  return { updateResturant, isLoading };
};

export const useGetMyResturantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyResturantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/resturant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyResturantOrders",
    getMyResturantOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyResturantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyResturantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/resturant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateResturantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyResturantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateResturantStatus, isLoading };
};
