import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";
import type { SortKey, SortDirection } from "../hooks/useSortOrder";

interface SortKeyInterface {
    value: SortKey;
}

interface SortDirectionInterface {
    value: SortDirection;
}

interface FilterAndSortProps {
    titleFilter: string;
    tagFilter: string;
    setTitleFilter: (value: string) => void;
    setTagFilter: (value: string) => void;
    sortKey: SortKeyInterface;
    sortDirection: SortDirectionInterface;
    setSortKey: (key: SortKeyInterface) => void;
    setSortDirection: (direction: SortDirectionInterface) => void;
}


const FilterAndSort = ({ titleFilter, tagFilter, setTitleFilter, setTagFilter, sortKey, sortDirection, setSortKey, setSortDirection}: FilterAndSortProps) => {
    return (
        <>
            <SelectField
                label="Sort by"
                name="sortKey"
                value={sortKey.value}
                onChange={(e) => setSortKey({ value: e.target.value as "category" | "date" })}
                options={[
                    {code: "category", description: "Category Alphabetically"},
                    {code: "date", description: "Date Added"}
                ]}
            />

            <SelectField
                label="Sort direction"
                name="sortDirection"
                value={sortDirection.value}
                onChange={(e) => setSortDirection({ value: e.target.value as "asc" | "desc" })}
                options={[
                    {code: "asc", description: "Ascending"},
                    {code: "desc", description: "Descending"}
                ]}
            />

            <InputField 
                label="Search By Title"
                name="titleFilter"
                placeholder="Type to search..."
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
            />

            <InputField 
                label="Search By Topic"
                name="tagFilter"
                placeholder="Type to search..."
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
            />

        </>
    )
}

export default FilterAndSort;