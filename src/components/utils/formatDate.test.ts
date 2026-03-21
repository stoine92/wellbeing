import { describe, it, expect, vi } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate utility function", () => {
    it("formats correctly YYYY-MM-DD into dd MMM yyyy", () => {
        expect(formatDate("2020-01-06")).toBe("06 Jan 2020");
        expect(formatDate("2020-05-10")).toBe("10 May 2020");
    })

    it("returns null for empty string", () => {
        expect(formatDate("")).toBeNull();
    })

    it("returns null and logs warning for invalid date", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        try {
            expect(formatDate("2020-14-01")).toBeNull();
            expect(warn).toHaveBeenCalled();
        } finally {
            warn.mockRestore();
        }
    })
});