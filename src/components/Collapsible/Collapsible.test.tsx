import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Collapsible from "./Collapsible";
import userEvent from "@testing-library/user-event";

describe("Collapsible Content", () => {
    it("renders the title", () => {
        render(
            <Collapsible title="Title">
                Content
            </Collapsible>
        );

        expect(screen.getByRole("heading", { name: /Title/i })).toBeInTheDocument();
    });

    it("shows content when trigger is clicked", async () => {
        const user = userEvent.setup();

        render(
            <Collapsible title="open">
                Content
            </Collapsible>
        );

        const trigger = screen.getByText(/open/i);
        await user.click(trigger);

        expect(screen.getByText(/Content/i)).toBeInTheDocument();
    });

    it("does not show content by default", async () => {
        render(
            <Collapsible title="open">
                Hidden
            </Collapsible>
        );

        expect(screen.queryByText(/Hidden/i)).not.toBeInTheDocument();
    });
    
});