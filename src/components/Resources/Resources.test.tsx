import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Resources from "./Resources";
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

describe("Resources", () => {
    it("should render a loading state", () => {
        render(<Resources resources={[]} isLoading={true} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render empty state when no resources", () => {
        render(<Resources resources={[]} isLoading={false} />);
        expect(screen.getByText("No resources found based on your filtered criteria.")).toBeInTheDocument();
    });

    it("should not render cards when loading", () => {
        render(<Resources resources={mockResources} isLoading={true} />);
        expect(screen.queryByText("Mindful Moments")).not.toBeInTheDocument();
    });

    it("should render category headings", () => {
        render(<Resources resources={mockResources} isLoading={false} />);
        expect(screen.getByRole("heading", { level: 2, name: "Podcasts" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 2, name: "Articles" })).toBeInTheDocument();
    });

    it("should not render a category heading if no resources belong to it", () => {
        render(<Resources resources={mockResources} isLoading={false} />);
        expect(screen.queryByRole("heading", { name: "Recipes" })).not.toBeInTheDocument();
    });

    it("should render all resource cards", () => {
        render(<Resources resources={mockResources} isLoading={false} />);
        expect(screen.getByText("Mindful Moments")).toBeInTheDocument();
        expect(screen.getByText("The Science of Sleep")).toBeInTheDocument();
        expect(screen.getByText("Morning Mindset")).toBeInTheDocument();
    });

    it("should group multiple resources under the same category", () => {
        render(<Resources resources={mockResources} isLoading={false} />);
        const podcastSection = screen.getByRole("heading", { name: "Podcasts" }).closest("section");
        expect(podcastSection).toContainElement(screen.getByText("Mindful Moments"));
        expect(podcastSection).toContainElement(screen.getByText("Morning Mindset"));
    });

    it("should render the correct number of category sections", () => {
        render(<Resources resources={mockResources} isLoading={false} />);
        const sections = screen.getAllByRole("region");
        expect(sections).toHaveLength(2);
    });
});