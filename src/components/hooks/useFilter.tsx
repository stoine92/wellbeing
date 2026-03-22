import { useState } from "react";
import type { Resource } from "../../lib/fetchResources";

interface useFilterReturn {
    titleFilter: string;
    tagFilter: string;
    setTitleFilter: (value: string) => void;
    setTagFilter: (value: string) => void;
    filteredResources: Resource[] | undefined;
}


export function useFilter(resources: Resource[] | undefined): useFilterReturn {
    const [titleFilter, setTitleFilter] = useState<string>("");
    const [tagFilter, setTagFilter] = useState<string>("");

    const filteredResources = resources?.filter((resource) => {
        const matchesTitle = resource.title.trimStart().toLowerCase().includes(titleFilter.trimStart().toLowerCase());

        const matchesTags = tagFilter === "" || resource.tags?.some((tag) => (
            tag.toLowerCase().includes(tagFilter.trimStart().toLowerCase())
        ));

        return matchesTitle && matchesTags;
    });


    return {
        titleFilter,
        tagFilter,
        setTitleFilter,
        setTagFilter,
        filteredResources,
    }
}