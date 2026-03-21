import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "./InputField";

describe("InputField", () => {

    it("renders an input element", () => {
        render(<InputField />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders a label when provided", () => {
        render(<InputField label="First Name" name="firstName" />);
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    });

    it("does not render a label when omitted", () => {
        render(<InputField />);
        expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });

    it("renders placeholder text", () => {
        render(<InputField placeholder="Enter your name" />);
        expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    });

    it("defaults to type text when no type is provided", () => {
        render(<InputField />);
        expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("calls onChange when user types", async () => {
        const handleChange = vi.fn();
        render(<InputField onChange={handleChange} />);

        await userEvent.type(screen.getByRole("textbox"), "hello");
        expect(handleChange).toHaveBeenCalled();
    });

    it("calls onChange once per keystroke", async () => {
        const handleChange = vi.fn();
        render(<InputField onChange={handleChange} />);

        await userEvent.type(screen.getByRole("textbox"), "abc");
        expect(handleChange).toHaveBeenCalledTimes(3);
    });
    
});