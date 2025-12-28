import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {SettingsLayout} from "@/layouts/SettingsLayout.tsx";
import {ImageUpload} from "@/components/ui/imageUpload.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {menuService} from "@/services/menu.ts";
import {type createMenuForm, createMenuSchema} from "@/schemas/menus/createMenuSchema.ts";
import {categoryService} from "@/services/category.ts";

export default function CreateMenu() {
    const createMenu = menuService.useCreate();
    const {
        data: categories = [],
        isLoading: isCategoryLoading,
        isError: isCategoryError,
    } = categoryService.useList();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<createMenuForm>({
        resolver: zodResolver(createMenuSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data: createMenuForm) => {
        try {
            const res = await createMenu.mutateAsync(data);

            if (res.success) {
                navigate("/settings/products");
            } else {
                reset();
            }
        } catch {
            reset();
        }
    };


    return (
        <DashboardLayout>
            <SettingsLayout>
                <h2 className="text-xl font-semibold">Create New Menu</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
                        <div className="relative mt-2 flex flex-col gap-1">
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Enter menu name"
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-red-400"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-800">Category</label>
                        <div className="relative mt-2 flex flex-col gap-1">
                            <select
                                {...register("category_id", { valueAsNumber: true })}
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-red-400"
                                disabled={isCategoryLoading || isCategoryError}
                            >
                                <option value={0}>Select category</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.category_id.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-800">Price</label>
                        <div className="relative mt-2 flex flex-col gap-1">
                            <input
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                placeholder="Enter price"
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-red-400"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm">{errors.price.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800">
                            Image
                        </label>

                        <Controller
                            control={control}
                            name="image"
                            render={({ field }) => (
                                <ImageUpload onChange={field.onChange} />
                            )}
                        />

                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end col-span-2 gap-2">
                        <Link
                            to="/settings/products"
                            className="px-6 py-2 bg-gray-500 text-white rounded-md text-sm font-medium"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-red-500 text-white rounded-md text-sm disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </SettingsLayout>
        </DashboardLayout>
    )
}