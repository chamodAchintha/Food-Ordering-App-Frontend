import {
  useCreateMyResturant,
  useGetMyResturant,
  useUpdateMyResturant,
  useGetMyResturantOrders,
} from "@/api/MyResturantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

export default function ManageResturantPage() {
  const { createResturant, isLoading: isCreateLoading } =
    useCreateMyResturant();
  const { resturant } = useGetMyResturant();
  const { updateResturant, isLoading: isUpdateLoading } =
    useUpdateMyResturant();

  const { orders } = useGetMyResturantOrders();

  const isEditing = !!resturant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-resturant">Manage Resturant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-resturant">
        <ManageResturantForm
          resturant={resturant}
          onSave={isEditing ? updateResturant : createResturant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
