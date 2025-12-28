import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Plus, Search} from "lucide-react";
import {menuService} from "@/services/menu.ts";
import {useState} from "react";
import type {Menu} from "@/types/menu.ts";
import {useMenuCategoryFilter} from "@/hooks/useMenuCategoryFilter.ts";
import {orderService} from "@/services/order.ts";
import {useForm} from "react-hook-form";
import {type CreateOrderForm, type CreateOrderPayload, createOrderSchema} from "@/schemas/order/createOrderSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

interface CartItem {
  menu: Menu;
  quantity: number;
}

export default function Dashboard() {
  const { data: menus = [] } = menuService.useList();
  const createOrder = orderService.useCreate();

  /* ======================
     FORM
  ====================== */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrderForm>({
    resolver: zodResolver(createOrderSchema),
  });

  /* ======================
     CART
  ====================== */
  const [cart, setCart] = useState<CartItem[]>([]);

  const {
    categories,
    activeCategory,
    setActiveCategory,
    filteredMenus,
  } = useMenuCategoryFilter(menus);

  const addToCart = (menu: Menu) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.menu.id === menu.id);
      if (exist) {
        return prev.map((i) =>
            i.menu.id === menu.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
        );
      }
      return [...prev, { menu, quantity: 1 }];
    });
  };

  /* ======================
     SUBMIT
  ====================== */
  const onSubmitOrder = async (data: CreateOrderForm) => {
    if (cart.length === 0) return;

    const payload: CreateOrderPayload = {
      customer_name: data.customer_name,
      order_items: cart.map((item) => ({
        menu_id: item.menu.id,
        quantity: item.quantity,
      })),
    };

    await createOrder.mutateAsync(payload);

    setCart([]);
    reset();
  };


  return (
    <DashboardLayout>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex w-full h-full flex-col gap-4 p-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-center">
              Easy<span className="text-red-400"> POS</span>
            </h2>
            <div className="w-full max-w-md">
              <div className="flex items-center border rounded-md px-3 bg-white">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-2 py-2 text-sm font-medium outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-1 text-sm border rounded-md transition
                    ${ activeCategory === category 
                        ? "text-red-500 bg-red-50 border-red-500" 
                        : "bg-white"
                    }`}
                >
                  {category}
                </button>
            ))}
          </div>

          <div className="w-full flex-1 grid grid-cols-5 gap-4 overflow-y-auto scrollbar-hide">
            {filteredMenus.map((item) => (
                <div
                    key={item.id}
                    className="flex h-64 flex-col bg-white border rounded-xl"
                >
                  <div className="h-40 w-full p-2">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-t-xl"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center flex-1 px-2 text-center">
                    <span className="text-sm font-medium truncate w-full">
                      {item.name}
                    </span>

                    <span className="text-xs font-medium text-muted-foreground mt-1">
                      Rp{item.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                        onClick={() => addToCart(item)}
                        className="flex items-center justify-center gap-2 w-full bg-red-50 text-sm text-red-400 font-medium rounded-b-xl p-2 hover:bg-red-100 transition-colors duration-300"
                    >
                      <Plus size={12} /> Add Product
                    </button>
                  </div>
                </div>
            ))}

            {filteredMenus.length === 0 && (
                <p className="col-span-5 text-sm text-muted-foreground text-center">
                  No menu found
                </p>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
            <div className="w-1/3 h-full flex flex-col gap-2 items-center justify-center text-center bg-white border-l p-4">
              <span>
                <Plus size={25} className="text-muted-foreground" />
              </span>

              <p className="text-lg text-muted-foreground font-medium">
                Add Product
                <br />
                From Special Menu
              </p>
            </div>
        ) : (
            <div className="w-1/3 h-full flex flex-col bg-white border-l gap-4 p-4">
              <h3 className="font-semibold">Order Summary</h3>

              <form
                  onSubmit={handleSubmit(onSubmitOrder)}
                  className="flex flex-col flex-1 gap-3"
              >
                <div>
                  <input
                      {...register("customer_name")}
                      placeholder="Customer name"
                      className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-400"
                  />
                  {errors.customer_name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.customer_name.message}
                      </p>
                  )}
                </div>
                
                <div className="flex-1 space-y-2 overflow-y-auto p-1">
                  {cart.map((item) => {
                    const subtotal = item.menu.price * item.quantity;

                    return (
                        <div
                            key={item.menu.id}
                            className="flex justify-between items-start text-sm"
                        >
                          <div>
                            <p className="font-medium">{item.menu.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} × Rp{item.menu.price}
                            </p>
                          </div>
                          <span className="font-medium">
                            Rp{subtotal}
                          </span>
                        </div>
                    );
                  })}
                </div>

                <div className="border-t pt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Item
                    </span>
                    <span>
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <span>Grand Total</span>
                    <span>
                      Rp{cart.reduce(
                          (acc, item) =>
                              acc + item.menu.price * item.quantity,
                          0
                      )}
                    </span>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={createOrder.isPending}
                    className="mt-2 w-full bg-red-400 text-white py-2 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {createOrder.isPending
                      ? "Submitting..."
                      : "Submit Order"}
                </button>
              </form>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
}
