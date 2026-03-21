import type { Category } from "../../lib/fetchResources";

const categoryLabelMap: Record<Category, "read" | "watch"> = {
    Podcasts: "watch",
    Articles: "read",
    Newsletters: "read",
    Recipes: "watch",
    Fitness: "watch",
    Meditation: "watch",
};

export const formatDuration = (minutes: number, category: Category): string => {
    const label = categoryLabelMap[category];

    if (minutes < 60) return `${minutes} min ${label}`;

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    if (remaining === 0) return `${hours}h ${label}`;

    return `${hours}h ${remaining}min ${label}`;
};