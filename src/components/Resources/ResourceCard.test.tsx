import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ResourceCard from "./ResourceCard";
import type { Resource } from "../../lib/fetchResources";

const mockResource: Resource = {
    id: "001",
    category: "Podcasts",
    title: "Mindful Moments",
    thumbnail: "https://example.com/image.jpg",
    tags: ["wellbeing", "mindfulness", "relaxation"],
    duration: 25,
    description: "A calming podcast focused on mindfulness techniques for daily life.",
    date_uploaded: "2025-07-10",
};

describe("ResourceCard", () => {
    it("should render the title", () => {
        render(<ResourceCard resource={mockResource} />);
        expect(screen.getByText("Mindful Moments")).toBeInTheDocument();
    });

    it("should render the thumbnail with correct alt text", () => {
        render(<ResourceCard resource={mockResource} />);
        expect(screen.getByAltText("Mindful Moments")).toBeInTheDocument();
    });

    it("should render the formatted duration", () => {
        render(<ResourceCard resource={mockResource} />);
        expect(screen.getAllByText("25 min watch").length).toBeGreaterThan(0);
    });

    it("should render no more than 3 tags", () => {
        render(<ResourceCard resource={mockResource} />);
        const tags = screen.getAllByText(/wellbeing|mindfulness|relaxation/);
        expect(tags.length).toBeLessThanOrEqual(3);
    });

    it("should open the dialog when the info button is clicked", async () => {
        const user = userEvent.setup();
        render(<ResourceCard resource={mockResource} />);

        const infoButton = screen.getByRole("button");
        await user.click(infoButton);

        expect(screen.getByText("A calming podcast focused on mindfulness techniques for daily life.")).toBeInTheDocument();
    });

    it("should show the category in the dialog", async () => {
        const user = userEvent.setup();
        render(<ResourceCard resource={mockResource} />);

        await user.click(screen.getByRole("button"));

        expect(screen.getByText("Podcasts")).toBeInTheDocument();
    });

    it("should show the formatted date in the dialog", async () => {
        const user = userEvent.setup();
        render(<ResourceCard resource={mockResource} />);

        await user.click(screen.getByRole("button"));

        expect(screen.getByText("10 Jul 2025")).toBeInTheDocument();
    });

    it("should render a resource without a date_uploaded without crashing", () => {
        const resourceWithoutDate: Resource = { ...mockResource, date_uploaded: undefined };
        render(<ResourceCard resource={resourceWithoutDate} />);
        expect(screen.getByText("Mindful Moments")).toBeInTheDocument();
    });
});