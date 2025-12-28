import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {SettingsLayout} from "@/layouts/SettingsLayout.tsx";
import {categoryService} from "@/services/category.ts";
import {type CreateCategoryForm, createCategorySchema} from "@/schemas/category/createCategorySchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";

export default function CreateCategory() {
    const createCategory = categoryService.useCreate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateCategoryForm>({
        resolver: zodResolver(createCategorySchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data: CreateCategoryForm) => {
        try {
            const res = await createCategory.mutateAsync(data);

            if (res.success && res.data) {
                navigate("/settings/categories");
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
                <div className="flex flex-col gap-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 bg-white p-4 rounded-md border"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                            <div className="relative mt-2 flex flex-col gap-1">
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Please enter category name"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-red-400 text-sm font-medium"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => navigate("/settings/categories")}
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="disabled:!cursor-not-allowed disabled:opacity-50"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </DashboardLayout>
    )
}