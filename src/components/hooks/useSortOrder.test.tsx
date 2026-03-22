import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useSortOrder } from "./useSortOrder";
import type { Resource } from "../../lib/fetchResources";

const mockResources: Resource[] = [
    {
        id: "001",
        category: "Meditation",
        title: "Guided Meditation",
        thumbnail: "https://example.com/image.jpg",
        tags: ["relaxation", "sleep"],
        duration: 15,
        description: "A calming meditation session.",
        date_uploaded: "2025-07-28",
    },
    {
        id: "002",
        category: "Articles",
        title: "The Science of Sleep",
        thumbnail: "https://example.com/image2.jpg",
        tags: ["sleep", "science"],
        duration: 8,
        description: "Explore the latest research on sleep.",
        date_uploaded: "2025-06-22",
    },
    {
        id: "003",
        category: "Fitness",
        title: "Morning Stretch",
        thumbnail: "https://example.com/image3.jpg",
        tags: ["mobility", "energy"],
        duration: 10,
        description: "Start your day with a stretch.",
        date_uploaded: "2025-08-05",
    },
];

describe("useSortOrder", () => {
    it("should return resources sorted by category ascending by default", () => {
        const { result } = renderHook(() => useSortOrder(mockResources));
        const categories = result.current.sortedResources?.map((r) => r.category);
        expect(categories).toEqual(["Articles", "Fitness", "Meditation"]);
    });

    it("should sort by category descending", () => {
        const { result } = renderHook(() => useSortOrder(mockResources));
        act(() => result.current.setSortDirection({ value: "desc" }));
        const categories = result.current.sortedResources?.map((r) => r.category);
        expect(categories).toEqual(["Meditation", "Fitness", "Articles"]);
    });

    it("should sort by date ascending", () => {
        const { result } = renderHook(() => useSortOrder(mockResources));
        act(() => result.current.setSortKey({ value: "date" }));
        const ids = result.current.sortedResources?.map((r) => r.id);
        expect(ids).toEqual(["002", "001", "003"]); // Jun, Jul, Aug
    });

    it("should sort by date descending", () => {
        const { result } = renderHook(() => useSortOrder(mockResources));
        act(() => {
            result.current.setSortKey({ value: "date" });
            result.current.setSortDirection({ value: "desc" });
        });
        const ids = result.current.sortedResources?.map((r) => r.id);
        expect(ids).toEqual(["003", "001", "002"]); // Aug, Jul, Jun
    });

    it("should handle resources without date_uploaded by treating them as 0", () => {
        const resourcesWithoutDate: Resource[] = [
            { ...mockResources[0], date_uploaded: undefined },
            { ...mockResources[1] },
        ];
        const { result } = renderHook(() => useSortOrder(resourcesWithoutDate));
        act(() => result.current.setSortKey({ value: "date" }));
        const ids = result.current.sortedResources?.map((r) => r.id);
        expect(ids).toEqual(["001", "002"]); // undefined treated as 0, comes first
    });

    it("should not mutate the original array", () => {
        const original = [...mockResources];
        const { result } = renderHook(() => useSortOrder(mockResources));
        act(() => result.current.setSortKey({ value: "date" }));
        expect(mockResources).toEqual(original);
    });

    it("should handle undefined resources", () => {
        const { result } = renderHook(() => useSortOrder(undefined));
        expect(result.current.sortedResources).toBeUndefined();
    });

    it("should handle empty resources array", () => {
        const { result } = renderHook(() => useSortOrder([]));
        expect(result.current.sortedResources).toHaveLength(0);
    });

    it("should default sortKey to category", () => {
        const { result } = renderHook(() => useSortOrder(mockResources));
        expect(result.current.sortKey.value).toBe("category");
    });

    it("should default sortDirection to asc", () => {
        const { result } = renderHook(() => useSortOrder(mockResources));
        expect(result.current.sortDirection.value).toBe("asc");
    });
});