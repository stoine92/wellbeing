import { describe, it, expect } from "vitest";
import { fetchResources } from "./fetchResources";
import type { Resource } from "./fetchResources";

describe("fetchResources", () => {
    it("should return an array of resources", async () => {
        const resources = await fetchResources();
        expect(Array.isArray(resources)).toBe(true);
    });

    it("should return at least one resource", async () => {
        const resources = await fetchResources();
        expect(resources.length).toBeGreaterThan(0);
    });

    it("should return resources with the correct shape", async () => {
        const resources = await fetchResources();
        const resource = resources[0];

        expect(resource).toHaveProperty("id");
        expect(resource).toHaveProperty("category");
        expect(resource).toHaveProperty("title");
        expect(resource).toHaveProperty("thumbnail");
        expect(resource).toHaveProperty("tags");
        expect(resource).toHaveProperty("duration");
        expect(resource).toHaveProperty("description");
    });

    it("should return resources with valid categories", async () => {
        const validCategories = [
            "Podcasts",
            "Articles",
            "Newsletters",
            "Recipes",
            "Fitness",
            "Meditation",
        ];
        const resources = await fetchResources();

        resources.forEach((resource: Resource) => {
            expect(validCategories).toContain(resource.category);
        });
    });

    it("should return resources with no more than 3 tags", async () => {
        const resources = await fetchResources();

        resources.forEach((resource: Resource) => {
            expect(resource.tags.length).toBeLessThanOrEqual(3);
        });
    });

    it("should return resources with a positive duration", async () => {
        const resources = await fetchResources();

        resources.forEach((resource: Resource) => {
            expect(resource.duration).toBeGreaterThan(0);
        });
    });

    it("should resolve after a delay", async () => {
        const start = Date.now();
        await fetchResources();
        const elapsed = Date.now() - start;

        expect(elapsed).toBeGreaterThanOrEqual(500);
    });
});