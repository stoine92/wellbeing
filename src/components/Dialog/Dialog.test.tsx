import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dialog from "./DIalog";
import ButtonLink from "../Buttons/ButtonLink";

describe("Dialog", () => {

    it("does not show dialog content before trigger is clicked", () => {
        render(
            <Dialog title="Test" trigger={<ButtonLink>Open</ButtonLink>}>
                <span>Dialog body</span>
            </Dialog>
        );

        expect(screen.queryByText("Dialog body")).not.toBeInTheDocument();
    });

    it("opens dialog when trigger is clicked", async () => {
        render (
            <Dialog title="Test" trigger={<ButtonLink>Open</ButtonLink>}>
                <span>Dialog body</span>
            </Dialog>
        );

        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(screen.getByText("Dialog body")).toBeInTheDocument();
    });

    it("render title when provided", async () => {
        render (
            <Dialog title="Test" trigger={<ButtonLink>Open</ButtonLink>}>
                <span>Dialog body</span>
            </Dialog>
        );

        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("renders no title when title is ommitted", async () => {
        render (
            <Dialog trigger={<ButtonLink>Open</ButtonLink>}>
                <span>Dialog body</span>
            </Dialog>
        );

        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(screen.queryByRole("heading")).toBeInTheDocument();
    });

    it("renders children inside the dialog body", async () => {
        render (
            <Dialog title="Test" trigger={<ButtonLink>Open</ButtonLink>}>
                <span>Dialog body</span>
            </Dialog>
        );

        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(screen.getByText("Dialog body")).toBeInTheDocument();
    });

    it("closes dialog when the close button is clicked", async () => {
        render(
            <Dialog title="Test Dialog" trigger={<ButtonLink>Open</ButtonLink>}>
                <p>Dialog body</p>
            </Dialog>
        );

        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(screen.getByText("Dialog body")).toBeInTheDocument();

        const buttons = screen.getAllByRole("button");
        const closeButton = buttons[buttons.length - 1];
        await userEvent.click(closeButton);

        expect(screen.queryByText("Dialog body")).not.toBeInTheDocument();
    });

    it("closes dialog when Escape key is pressed", async () => {
        render(
            <Dialog title="Test Dialog" trigger={<ButtonLink>Open</ButtonLink>}>
                <p>Dialog body</p>
            </Dialog>
        );

        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(screen.getByText("Dialog body")).toBeInTheDocument();

        await userEvent.keyboard("{Escape}");
        expect(screen.queryByText("Dialog body")).not.toBeInTheDocument();
    });
    
});