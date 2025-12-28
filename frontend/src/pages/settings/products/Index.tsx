import {PencilLine, Plus, Settings2} from "lucide-react";
import {SettingsLayout} from "@/layouts/SettingsLayout.tsx";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Link, useNavigate} from "react-router-dom";
import {menuService} from "@/services/menu.ts";
import {useMenuCategoryFilter} from "@/hooks/useMenuCategoryFilter.ts";

export default function Products() {
    const {
        data: menus = [],
        isLoading,
        isError,
        error,
    } = menuService.useList();
    const navigate = useNavigate();
    const {
        categories,
        activeCategory,
        setActiveCategory,
        filteredMenus,
    } = useMenuCategoryFilter(menus);
    // const [activeCategory, setActiveCategory] = useState<string>("All");
    //
    // const categories = useMemo<string[]>(() => {
    //     const unique = new Set<string>();
    //
    //     menus.forEach((menu) => {
    //         if (menu.category?.name) {
    //             unique.add(menu.category.name);
    //         }
    //     });
    //
    //     return ["All", ...Array.from(unique)];
    // }, [menus]);
    //
    // const filteredMenus = useMemo<Menu[]>(() => {
    //     if (activeCategory === "All") return menus;
    //
    //     return menus.filter(
    //         (menu) => menu.category?.name === activeCategory
    //     );
    // }, [menus, activeCategory]);

    if (isLoading)
        return (
            <DashboardLayout>
                <SettingsLayout>
                    <div className="h-full w-full flex items-center justify-center">
                        <p>Loading...</p>
                    </div>
                </SettingsLayout>
            </DashboardLayout>
        );

    if (isError)
        return (
            <DashboardLayout>
                <SettingsLayout>
                    <div className="w-full h-full flex items-center justify-center">
                        <p>Error: {(error as Error).message}</p>
                    </div>
                </SettingsLayout>
            </DashboardLayout>
        );

    return (
        <DashboardLayout>
            <SettingsLayout>
                <div className="flex w-full items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold">Products Management</h2>
                    <button
                        onClick={() => navigate("/settings/categories")}
                        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm font-medium">
                        <Settings2 className="w-4 h-4"/>
                        Manage Categories
                    </button>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-1 text-sm border rounded-md transition
                                ${
                                activeCategory === category
                                    ? "text-red-500 bg-red-50 border-red-500"
                                    : "bg-white"
                            }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/*<div className="flex items-center gap-2 shrink-0">*/}
                {/*    <span className="px-4 py-1 text-red-500 text-sm bg-red-50 border border-red-500 rounded-md">*/}
                {/*        All*/}
                {/*    </span>*/}
                {/*    <span className="px-4 py-1 text-sm bg-white border rounded-md">*/}
                {/*        Foods*/}
                {/*    </span>*/}
                {/*    <span className="px-4 py-1 text-sm bg-white border rounded-md">*/}
                {/*        Drinks*/}
                {/*    </span>*/}
                {/*    <span className="px-4 py-1 text-sm bg-white border rounded-md">*/}
                {/*        Snacks*/}
                {/*    </span>*/}
                {/*    <span className="px-4 py-1 text-sm bg-white border rounded-md">*/}
                {/*        Beverages*/}
                {/*    </span>*/}
                {/*    <span className="px-4 py-1 text-sm bg-white border rounded-md">*/}
                {/*        Meal*/}
                {/*    </span>*/}
                {/*</div>*/}

                <div className="w-full flex-1 grid grid-cols-5 gap-4 overflow-y-auto scrollbar-hide">
                    <Link
                        to="/settings/products/create"
                        className="flex h-64 flex-col items-center justify-center bg-red-50 text-red-500 border border-dashed border-red-500 rounded-xl gap-2 hover:bg-red-100 transition-colors duration-200"
                    >
                        <Plus size={25} />
                        <p className="text-sm font-medium">Add Product</p>
                    </Link>

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
                                <button className="flex items-center justify-center gap-2 w-full bg-red-50 text-sm text-red-400 font-medium rounded-b-xl p-2 hover:bg-red-100 transition-colors duration-300">
                                    <PencilLine size={12} />
                                    Edit
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
                {/*<div className="w-full flex-1 grid grid-cols-5 gap-4 overflow-y-auto scrollbar-hide">*/}
                {/*    <Link to="/settings/products/create"*/}
                {/*        className="flex h-64 flex-col items-center justify-center bg-red-50 text-red-500 border border-dashed border-red-500 rounded-xl gap-2 hover:bg-red-100 transition-colors duration-200">*/}
                {/*        <Plus size={25}/>*/}
                {/*        <p className="text-sm font-medium">Add Product</p>*/}
                {/*    </Link>*/}
                {/*    {menus.map((item) => (*/}
                {/*        <div*/}
                {/*            key={item.id}*/}
                {/*            className="flex h-64 flex-col bg-white border rounded-xl"*/}
                {/*        >*/}
                {/*            <div className="h-40 w-full p-2">*/}
                {/*                <img*/}
                {/*                    src={item.image}*/}
                {/*                    alt={item.name}*/}
                {/*                    className="w-full h-full object-contain rounded-t-xl"*/}
                {/*                />*/}
                {/*            </div>*/}

                {/*            <div className="flex flex-col items-center justify-center flex-1 px-2 text-center">*/}
                {/*                <span className="text-sm font-medium truncate w-full">*/}
                {/*                    {item.name}*/}
                {/*                </span>*/}
                {/*                <span className="text-xs font-medium text-muted-foreground">*/}
                {/*                    Rp{item.price}*/}
                {/*                </span>*/}
                {/*            </div>*/}

                {/*            <div className="flex items-center justify-center">*/}
                {/*                <button*/}
                {/*                    className="flex items-center justify-center gap-2 w-full bg-red-50 text-sm text-red-400 font-medium rounded-b-xl p-2 hover:bg-red-100 transition-colors duration-300"*/}
                {/*                >*/}
                {/*                    <PencilLine size={12}/>*/}
                {/*                    Edit*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}

                {/*    {menus.length === 0 && (*/}
                {/*        <p className="text-sm text-muted-foreground text-center">*/}
                {/*            No menu found*/}
                {/*        </p>*/}
                {/*    )}*/}
                {/*</div>*/}
            </SettingsLayout>
        </DashboardLayout>
    )
}