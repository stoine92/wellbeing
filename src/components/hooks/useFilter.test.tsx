import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useFilter } from "./useFilter";
import type { Resource } from "../../lib/fetchResources";

const mockResources: Resource[] = [
    {
        id: "001",
        category: "Podcasts",
        title: "Mindful Moments",
        thumbnail: "https://example.com/image.jpg",
        tags: ["wellbeing", "mindfulness", "relaxation"],
        duration: 25,
        description: "A calming podcast focused on mindfulness techniques.",
        date_uploaded: "2025-07-10",
    },
    {
        id: "002",
        category: "Articles",
        title: "The Science of Sleep",
        thumbnail: "https://example.com/image2.jpg",
        tags: ["wellbeing", "sleep", "science"],
        duration: 8,
        description: "Explore the latest research on sleep.",
        date_uploaded: "2025-06-22",
    },
    {
        id: "003",
        category: "Fitness",
        title: "Morning Stretch Routine",
        thumbnail: "https://example.com/image3.jpg",
        tags: ["mobility", "energy", "routine"],
        duration: 10,
        description: "Start your day with a stretch.",
        date_uploaded: "2025-07-01",
    },
];

describe("useFilter", () => {
    it("should return all resources when filters are empty", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        expect(result.current.filteredResources).toHaveLength(3);
    });

    it("should filter by title case insensitively", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        act(() => result.current.setTitleFilter("mindful"));
        expect(result.current.filteredResources).toHaveLength(1);
        expect(result.current.filteredResources?.[0].title).toBe("Mindful Moments");
    });

    it("should filter by title with leading whitespace", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        act(() => result.current.setTitleFilter("   science"));
        expect(result.current.filteredResources).toHaveLength(1);
        expect(result.current.filteredResources?.[0].title).toBe("The Science of Sleep");
    });

    it("should return empty array when title filter matches nothing", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        act(() => result.current.setTitleFilter("zzznomatch"));
        expect(result.current.filteredResources).toHaveLength(0);
    });

    it("should filter by tag case insensitively", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        act(() => result.current.setTagFilter("sleep"));
        expect(result.current.filteredResources).toHaveLength(1);
        expect(result.current.filteredResources?.[0].id).toBe("002");
    });

    it("should return multiple resources when tag matches more than one", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        act(() => result.current.setTagFilter("wellbeing"));
        expect(result.current.filteredResources).toHaveLength(2);
    });

    it("should filter by both title and tag simultaneously", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        act(() => {
            result.current.setTitleFilter("science");
            result.current.setTagFilter("sleep");
        });
        expect(result.current.filteredResources).toHaveLength(1);
        expect(result.current.filteredResources?.[0].id).toBe("002");
    });

    it("should return empty when title and tag filters conflict", () => {
        const { result } = renderHook(() => useFilter(mockResources));
        act(() => {
            result.current.setTitleFilter("mindful");
            result.current.setTagFilter("sleep");
        });
        expect(result.current.filteredResources).toHaveLength(0);
    });

    it("should handle undefined resources", () => {
        const { result } = renderHook(() => useFilter(undefined));
        expect(result.current.filteredResources).toBeUndefined();
    });

    it("should handle empty resources array", () => {
        const { result } = renderHook(() => useFilter([]));
        expect(result.current.filteredResources).toHaveLength(0);
    });
});