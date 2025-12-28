import { useMemo, useState } from "react";
import type { Menu } from "@/types/menu";

export function useMenuCategoryFilter(menus: Menu[]) {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = useMemo<string[]>(() => {
        const unique = new Set<string>();

        menus.forEach((menu) => {
            if (menu.category?.name) {
                unique.add(menu.category.name);
            }
        });

        return ["All", ...Array.from(unique)];
    }, [menus]);

    const filteredMenus = useMemo<Menu[]>(() => {
        if (activeCategory === "All") return menus;

        return menus.filter(
            (menu) => menu.category?.name === activeCategory
        );
    }, [menus, activeCategory]);

    return {
        categories,
        activeCategory,
        setActiveCategory,
        filteredMenus,
    };
}