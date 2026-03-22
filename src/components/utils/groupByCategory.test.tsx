import { describe, it, expect } from "vitest";
import { groupByCategory } from "./groupByCategory";
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
        category: "Podcasts",
        title: "Morning Mindset",
        thumbnail: "https://example.com/image3.jpg",
        tags: ["routine", "mindfulness"],
        duration: 20,
        description: "Start your day with a positive mindset.",
        date_uploaded: "2025-07-01",
    },
];

describe("groupByCategory", () => {
    it("should group resources by category", () => {
        const result = groupByCategory(mockResources);
        expect(result["Podcasts"]).toHaveLength(2);
        expect(result["Articles"]).toHaveLength(1);
    });

    it("should not include categories with no resources", () => {
        const result = groupByCategory(mockResources);
        expect(result["Recipes"]).toBeUndefined();
        expect(result["Fitness"]).toBeUndefined();
        expect(result["Meditation"]).toBeUndefined();
        expect(result["Newsletters"]).toBeUndefined();
    });

    it("should place each resource under the correct category", () => {
        const result = groupByCategory(mockResources);
        expect(result["Podcasts"].map(r => r.id)).toContain("001");
        expect(result["Podcasts"].map(r => r.id)).toContain("003");
        expect(result["Articles"].map(r => r.id)).toContain("002");
    });

    it("should handle an empty array", () => {
        const result = groupByCategory([]);
        expect(Object.keys(result)).toHaveLength(0);
    });

    it("should handle a single resource", () => {
        const result = groupByCategory([mockResources[0]]);
        expect(result["Podcasts"]).toHaveLength(1);
        expect(Object.keys(result)).toHaveLength(1);
    });

    it("should preserve resource data when grouping", () => {
        const result = groupByCategory(mockResources);
        const podcast = result["Podcasts"][0];
        expect(podcast.title).toBe("Mindful Moments");
        expect(podcast.duration).toBe(25);
        expect(podcast.tags).toEqual(["wellbeing", "mindfulness", "relaxation"]);
    });
});