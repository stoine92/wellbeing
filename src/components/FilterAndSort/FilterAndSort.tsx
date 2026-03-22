import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";
// import type { useFilterReturn } from "../hooks/useFilter";
// import type { SortKeyInterface, SortDirectionInterface } from "../hooks/useSortOrder";
// import type { Dispatch } from "react";


interface FilterAndSortProps {
    titleFilter: string;
    tagFilter: string;
    setTitleFilter: (value: string) => void;
    setTagFilter: (value: string) => void;
}


// const FilterAndSort: FC<FilterAndSortProps> = ({ filter, setFilter, sortKey, setSortKey, sortDirection, setSortDirection }) => {
const FilterAndSort = ({ titleFilter, tagFilter, setTitleFilter, setTagFilter }: FilterAndSortProps) => {
    return (
        <>
            <SelectField
                label="Sort by"
                name="sortKey"
                // value={sortKey.value}
                // onChange={(e) => setSortKey({ value: e.target.value as "name" | "added" })}÷
                options={[
                    {code: "category", description: "Category Alphabetically"},
                    {code: "date", description: "Date Added"}
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