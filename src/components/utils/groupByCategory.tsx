import type { Category, Resource } from "../../lib/fetchResources";

export const groupByCategory = (resources: Resource[]): Record<Category, Resource[]> => {
    return resources.reduce((acc, resource) => {
        const { category } = resource;
        if (!acc[category]) acc[category] = [];
        acc[category].push(resource);
        return acc;
    }, {} as Record<Category, Resource[]>);
};