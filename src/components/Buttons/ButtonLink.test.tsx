import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonLink from "./ButtonLink";

describe("ButtonLink", () => {
    it("renders children correctly", () => {
        render(<ButtonLink>Click</ButtonLink>);

        const button = screen.getByRole("button", { name: /click/i });
        expect(button).toBeInTheDocument();
    });

    it("applies custom className", () => {
        render (<ButtonLink className="test-class">Click</ButtonLink>);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("test-class");
    });

    it("calls onClick when clicked", async () => {
        const handleClick = vi.fn();
        render (<ButtonLink onClick={handleClick}>Click</ButtonLink>);

        await userEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
});