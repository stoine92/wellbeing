import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FilterAndSort from "./FilterAndSort";

const defaultProps = {
    titleFilter: "",
    tagFilter: "",
    setTitleFilter: vi.fn(),
    setTagFilter: vi.fn(),
    sortKey: { value: "category" as const },
    sortDirection: { value: "asc" as const },
    setSortKey: vi.fn(),
    setSortDirection: vi.fn(),
};

describe("FilterAndSort", () => {
    it("should render all fields", () => {
        render(<FilterAndSort {...defaultProps} />);
        expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
        expect(screen.getByLabelText("Sort direction")).toBeInTheDocument();
        expect(screen.getByLabelText("Search By Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Search By Topic")).toBeInTheDocument();
    });

    it("should render sort by options", () => {
        render(<FilterAndSort {...defaultProps} />);
        expect(screen.getByText("Category Alphabetically")).toBeInTheDocument();
        expect(screen.getByText("Date Added")).toBeInTheDocument();
    });

    it("should render sort direction options", () => {
        render(<FilterAndSort {...defaultProps} />);
        expect(screen.getByText("Ascending")).toBeInTheDocument();
        expect(screen.getByText("Descending")).toBeInTheDocument();
    });

    it("should call setTitleFilter when title input changes", async () => {
        const user = userEvent.setup();
        render(<FilterAndSort {...defaultProps} />);
        await user.type(screen.getByLabelText("Search By Title"), "mindful");
        expect(defaultProps.setTitleFilter).toHaveBeenCalled();
    });

    it("should call setTagFilter when topic input changes", async () => {
        const user = userEvent.setup();
        render(<FilterAndSort {...defaultProps} />);
        await user.type(screen.getByLabelText("Search By Topic"), "sleep");
        expect(defaultProps.setTagFilter).toHaveBeenCalled();
    });

    it("should call setSortKey when sort by select changes", async () => {
        const user = userEvent.setup();
        render(<FilterAndSort {...defaultProps} />);
        await user.selectOptions(screen.getByLabelText("Sort by"), "date");
        expect(defaultProps.setSortKey).toHaveBeenCalledWith({ value: "date" });
    });

    it("should call setSortDirection when sort direction select changes", async () => {
        const user = userEvent.setup();
        render(<FilterAndSort {...defaultProps} />);
        await user.selectOptions(screen.getByLabelText("Sort direction"), "desc");
        expect(defaultProps.setSortDirection).toHaveBeenCalledWith({ value: "desc" });
    });

    it("should reflect the current titleFilter value", () => {
        render(<FilterAndSort {...defaultProps} titleFilter="mindful" />);
        expect(screen.getByLabelText("Search By Title")).toHaveValue("mindful");
    });

    it("should reflect the current tagFilter value", () => {
        render(<FilterAndSort {...defaultProps} tagFilter="sleep" />);
        expect(screen.getByLabelText("Search By Topic")).toHaveValue("sleep");
    });

    it("should reflect the current sortKey value", () => {
        render(<FilterAndSort {...defaultProps} sortKey={{ value: "date" }} />);
        expect(screen.getByLabelText("Sort by")).toHaveValue("date");
    });

    it("should reflect the current sortDirection value", () => {
        render(<FilterAndSort {...defaultProps} sortDirection={{ value: "desc" }} />);
        expect(screen.getByLabelText("Sort direction")).toHaveValue("desc");
    });
});