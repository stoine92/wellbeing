import Container from "../components/Layout/Container";
import Section from "../components/Layout/Section";
import { fetchResources } from "../lib/fetchResources";
import type { Resource } from "../lib/fetchResources";
import { useQuery } from "@tanstack/react-query";
import Resources from "../components/Resources/Resources";
import FilterAndSort from "../components/FilterAndSort/FilterAndSort";
import { useFilter } from "../components/hooks/useFilter";
import { useSortOrder } from "../components/hooks/useSortOrder";


function Home () {

  const { data: resources, isLoading } = useQuery<Resource[]>({
        queryFn: () => fetchResources(),
        queryKey: ["resources"],
    });

    const { titleFilter, tagFilter, setTitleFilter, setTagFilter, filteredResources } = useFilter(resources);

    const { sortedResources, sortKey, sortDirection, setSortKey, setSortDirection } = useSortOrder(filteredResources);
     
    const filterAndSortProps = {
        titleFilter,
        tagFilter,
        setTitleFilter,
        setTagFilter,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection
    }
    
    if(resources?.length === 0 && !isLoading) {
        return (
            <Container>
                <Section>
                    <Section.Main>
                        <Section.Head 
                            title="No resources found" 
                            subtitle="Please add some resources to get started"
                        />
                    </Section.Main>
                </Section>
            </Container>
        )
    }

    return (
       <Container>
            <Section>
                <Section.Side>
                  <FilterAndSort {...filterAndSortProps} />
                </Section.Side>

                <Section.Main>
                  <Section.Head 
                    title="Wellbeing Resources" 
                    subtitle={`Showing ${sortedResources ? sortedResources.length : 0} resource${sortedResources && sortedResources.length !== 1 ? "s" : ""}`}
                    DialogContent={<FilterAndSort {...filterAndSortProps} />}
                  />
                  <Section.Border />
                  <Section.Content>
                    <Resources resources={sortedResources ?? []} isLoading={isLoading} />
                  </Section.Content>
                </Section.Main>
            </Section>
       </Container>
    )
}

export default Home;