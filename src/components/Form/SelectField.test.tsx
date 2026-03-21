import { describe, it, expect, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SelectField from "./SelectField";


const mockOptions = [
    { code: "test", description: "Test" },
    { code: "test2", description: "Test 2" },
    { code: "test3", description: "Test 3" },
];


describe("SelectField", () => {

    it("renders a select element", () => {
        render(<SelectField options={mockOptions} />);
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders all options", () => {
        render(<SelectField options={mockOptions} />);
        expect(screen.getByRole("option", { name: "Test" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Test 2" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Test 3" })).toBeInTheDocument();
    });

    it("renders a label when provided", () => {
        render(<SelectField options={mockOptions} label="Country" name="country" />);
        expect(screen.getByLabelText("Country")).toBeInTheDocument();
    });

    it("renders with the correct selected value", () => {
        render(<SelectField options={mockOptions} value="test2" onChange={vi.fn()} />);
        expect(screen.getByRole("combobox")).toHaveValue("test2");
    });

    it("calls onChange with the correct value", async () => {
        const handleChange = vi.fn();
        render(<SelectField options={mockOptions} onChange={handleChange} />);

        await userEvent.selectOptions(screen.getByRole("combobox"), "test3");
        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({ value: "test3" }),
            })
        );
    });
});