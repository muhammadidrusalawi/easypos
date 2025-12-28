import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {SettingsLayout} from "@/layouts/SettingsLayout.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {categoryService} from "@/services/category.ts";
import {useForm} from "react-hook-form";
import {type UpdateCategoryForm, updateCategorySchema} from "@/schemas/category/updateCategorySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";

export default function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const categoryId = Number(id);

    const { data: category, isLoading } =
        categoryService.useDetail(categoryId);

    const updateMutation = categoryService.useUpdate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateCategoryForm>({
        resolver: zodResolver(updateCategorySchema),
    });

    useEffect(() => {
        if (category) {
            reset({
                id: category.id,
                name: category.name,
            });
        }
    }, [category, reset]);

    const onSubmit = async (data: UpdateCategoryForm) => {
        try {
            const res = await updateMutation.mutateAsync({
                id: categoryId,
                payload: data,
            });

            if (res.success && res.data) {
                navigate("/settings/categories");
            }
        } catch {
            reset();
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <SettingsLayout>
                    <div className="h-full w-full flex items-center justify-center">
                        <p>Loading...</p>
                    </div>
                </SettingsLayout>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <SettingsLayout>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 bg-white p-4 rounded-md border"
                >
                    <input
                        type="hidden"
                        {...register("id", { valueAsNumber: true })}
                    />

                    <div>
                        <label htmlFor="name">Nama Kategori</label>
                        <div className="relative mt-2 flex flex-col gap-1">
                            <input
                                type="text"
                                {...register("name")}
                                className="w-full px-4 py-2 text-sm font-medium border rounded-md"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
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
                            disabled={isSubmitting || updateMutation.isPending}
                        >
                            {isSubmitting || updateMutation.isPending
                                ? "Menyimpan..."
                                : "Simpan"}
                        </button>
                    </div>
                </form>
            </SettingsLayout>
        </DashboardLayout>
    );
}