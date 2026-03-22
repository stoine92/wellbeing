import { useState } from "react";
import type { Resource } from "../../lib/fetchResources";

export type SortKey = "category" | "date";
export type SortDirection = "asc" | "desc";

interface SortKeyInterface {
    value: SortKey;
};

interface SortDirectionInterface { 
    value: SortDirection;
}

interface useSortOrderReturn {
    sortedResources: Resource[] | undefined;
    sortKey: SortKeyInterface;
    sortDirection: SortDirectionInterface;
    setSortKey: (key: SortKeyInterface) => void;
    setSortDirection: (direction: SortDirectionInterface) => void;
}

export function useSortOrder (resources: Resource[] | undefined): useSortOrderReturn {

    const [sortKey, setSortKey] = useState<SortKeyInterface>({ value: "category" });
    const [sortDirection, setSortDirection] = useState<SortDirectionInterface>({ value: "asc" });


    const sortedResources = resources ? [...resources].sort((a, b) => {
        let comparison = 0;

        if (sortKey.value === "category") {
            comparison = a.category.localeCompare(b.category);
        } else if (sortKey.value === "date") {
            const dateA = a.date_uploaded ? new Date(a.date_uploaded).getTime() : 0;
            const dateB = b.date_uploaded ? new Date(b.date_uploaded).getTime() : 0;
            comparison = dateA - dateB;
        }
        return sortDirection.value === "asc" ? comparison : -comparison;
    }) : undefined;


    return { 
        sortedResources,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection
    };
}