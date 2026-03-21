import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Section from "./Section";

describe("Section", () => {
    it("renders children and applies root class", () => {
        const { container } = render(
            <Section>
                <div>Test Content</div>
            </Section>
        );

        expect(screen.getByText("Test Content")).toBeInTheDocument();

        const root = container.firstElementChild as HTMLElement | null;
        expect(root).toBeTruthy();
    });

    it("renders Section.Main with its children and class", () => {
        const { container } = render(
            <Section>
                <Section.Main>
                    <span>Inner Main</span>
                </Section.Main>
            </Section>
        );

        expect(screen.getByText("Inner Main")).toBeInTheDocument();

        const root = container.firstElementChild as HTMLElement | null;
        expect(root).toBeTruthy();

    });

    it("renders Section.Head with title and optional subtitle", () => {
        render(
            <Section>
                <Section.Head title="Main title" subtitle="a subtitle" />
            </Section>
        );

        const h1 = screen.getByRole("heading", { level: 1, name: "Main title" });
        expect(h1).toBeInTheDocument();

        const h3 = screen.getByRole("heading", { level: 3, name: "a subtitle" });
        expect(h3).toBeInTheDocument();
    });
    
    it("renders Section.Side with its children and class", () => {
        const { container } = render(
            <Section>
                <Section.Side>
                    <span>Inner Side</span>
                </Section.Side>
            </Section>
        );

        expect(screen.getByText("Inner Side")).toBeInTheDocument();

        const root = container.firstElementChild as HTMLElement | null;
        expect(root).toBeTruthy();

    });
    
});