import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonIcon from "./ButtonIcon";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

describe("ButtonIcon", () => {
    it("renders correctly", () => {
        render(<ButtonIcon icon={KeyboardArrowDownOutlinedIcon}/>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });
    
    it("applies custom className", () => {
        render (<ButtonIcon icon={KeyboardArrowDownOutlinedIcon} className="test-class" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("test-class");
    });

    it("sets correct button type", () => {
        render (<ButtonIcon icon={KeyboardArrowDownOutlinedIcon} type="submit" />);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "submit");
    });

    it("applies noBg modifier class", () => {
        render (<ButtonIcon icon={KeyboardArrowDownOutlinedIcon} noBg />);

        const button = screen.getByRole("button");
        expect(button.className).toContain("buttonIcon--noBg");
    });

    it("It does not apply noBg modifier class", () => {
        render (<ButtonIcon icon={KeyboardArrowDownOutlinedIcon} />);

        const button = screen.getByRole("button");
        expect(button.className).not.toContain("buttonIcon--noBg");
    });

    it("calls onClick when clicked", async () => {
        const handleClick = vi.fn();
        render (<ButtonIcon icon={KeyboardArrowDownOutlinedIcon} onClick={handleClick} />);

        await userEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders the icon inside the button", () => {
        render (<ButtonIcon icon={KeyboardArrowDownOutlinedIcon}/>);

        userEvent.click(screen.getByRole("button"));
        expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    });
    
});