import { DashboardLayout } from "@/layouts/DashboardLayout";
import {Eye, FileDown, Funnel, PencilLine, Search, Trash2} from "lucide-react";
import {orderService} from "@/services/order.ts";

export default function Orders() {
    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = orderService.useList();

    const { mutate: deleteOrder, isPending: isDeleting } =
        orderService.useDelete();

    if (isLoading)
        return (
            <DashboardLayout>
                <div className="h-screen w-full flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            </DashboardLayout>
        );

    if (isError)
        return (
            <DashboardLayout>
                <div className="h-screen w-full flex items-center justify-center">
                    <p>Error: {(error as Error).message}</p>
                </div>
            </DashboardLayout>
        );
    return (
        <DashboardLayout>
            <div className="h-screen w-full flex flex-col gap-4 p-4">
                <div className="flex w-full justify-between gap-4">
                    <div className="w-full">
                        <h2 className="text-2xl font-bold">Orders List</h2>
                        <p className="text-sm text-muted-foreground">
                            List of recent orders
                        </p>
                    </div>

                    <div className="w-full flex items-start justify-end gap-2">
                        <button className="p-2 bg-white text-muted-foreground border rounded-md  transition-colors duration-200">
                            <Funnel size={20}/>
                        </button>
                        <div className="w-full max-w-lg">
                            <div className="flex items-center border rounded-md px-3 bg-white">
                                <Search className="h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full px-2 py-2 text-sm font-medium outline-none"
                                />
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-md hover:bg-red-500 transition-colors duration-200">
                            <FileDown size={18}/>
                            Download
                        </button>
                    </div>
                </div>

                <div className="w-full h-fit overflow-hidden bg-white border rounded-xl">
                    <div className="overflow-x-auto h-full">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                            <tr className="text-left">
                                <th className="px-4 py-3 font-medium">Invoice</th>
                                <th className="px-4 py-3 font-medium">Customer Name</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Total Items</th>
                                <th className="px-4 py-3 font-medium">Total Price</th>
                                <th className="px-4 py-3 font-medium text-right">
                                    Action
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        INV-20251222-001
                                    </td>

                                    <td className="px-4 py-3">
                                        {order.customer_name}
                                    </td>

                                    <td className="px-4 py-3 text-muted-foreground">
                                        {order.created_at
                                            ? (() => {
                                                const d = new Date(order.created_at);

                                                const dd = String(d.getDate()).padStart(2, "0");
                                                const mm = String(d.getMonth() + 1).padStart(2, "0");
                                                const yyyy = d.getFullYear();

                                                const hh = String(d.getHours()).padStart(2, "0");
                                                const min = String(d.getMinutes()).padStart(2, "0");

                                                return `${dd}/${mm}/${yyyy} - ${hh}:${min}`;
                                            })()
                                            : "-"}
                                    </td>

                                    <td className="px-4 py-3">
                                        {order.OrderItem?.reduce(
                                            (sum, item) => sum + item.quantity,
                                            0
                                        ) ?? 0}
                                    </td>


                                    <td className="px-4 py-3 font-medium">
                                        Rp{order.total?.toLocaleString("id-ID")}
                                    </td>


                                    <td className="px-4 py-3 flex items-center gap-4 justify-end">
                                        <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                            <Eye size={14} />
                                            View
                                        </button>
                                        <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                            <PencilLine size={14} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteOrder(order.id)}
                                            disabled={isDeleting}
                                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}


                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-3 text-center">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}