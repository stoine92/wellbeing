import { describe, it, expect } from "vitest";
import { formatDuration } from "./formatDuration";

describe("formatDuration", () => {
    it("should format minutes with a read label for Articles", () => {
        expect(formatDuration(8, "Articles")).toBe("8 min read");
    });

    it("should format minutes with a watch label for Podcasts", () => {
        expect(formatDuration(25, "Podcasts")).toBe("25 min watch");
    });

    it("should format minutes with a watch label for Recipes", () => {
        expect(formatDuration(10, "Recipes")).toBe("10 min watch");
    });

    it("should format minutes with a watch label for Fitness", () => {
        expect(formatDuration(10, "Fitness")).toBe("10 min watch");
    });

    it("should format minutes with a watch label for Meditation", () => {
        expect(formatDuration(15, "Meditation")).toBe("15 min watch");
    });

    it("should format minutes with a read label for Newsletters", () => {
        expect(formatDuration(5, "Newsletters")).toBe("5 min read");
    });

    it("should format exact hours", () => {
        expect(formatDuration(60, "Articles")).toBe("1h read");
        expect(formatDuration(120, "Podcasts")).toBe("2h watch");
    });

    it("should format hours and remaining minutes", () => {
        expect(formatDuration(90, "Fitness")).toBe("1h 30min watch");
        expect(formatDuration(75, "Meditation")).toBe("1h 15min watch");
    });

    it("should handle 0 minutes", () => {
        expect(formatDuration(0, "Articles")).toBe("0 min read");
    });
});