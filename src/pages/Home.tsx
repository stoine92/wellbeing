import Container from "../components/Layout/Container";
import Section from "../components/Layout/Section";
import { fetchResources } from "../lib/fetchResources";
import type { Resource } from "../lib/fetchResources";
import { useQuery } from "@tanstack/react-query";
import Resources from "../components/Resources/Resources";
import FilterAndSort from "../components/FilterAndSort/FilterAndSort";
import { useFilter } from "../components/hooks/useFilter";


function Home () {

  const { data: resources, isLoading } = useQuery<Resource[]>({
        queryFn: () => fetchResources(),
        queryKey: ["resources"],
    });

    const { titleFilter, tagFilter, setTitleFilter, setTagFilter, filteredResources } = useFilter(resources);
     
    
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
                  <FilterAndSort titleFilter={titleFilter} tagFilter={tagFilter} setTitleFilter={setTitleFilter} setTagFilter={setTagFilter} />
                </Section.Side>

                <Section.Main>
                  <Section.Head 
                    title="Wellbeing Resources" 
                    subtitle={`Showing ${filteredResources ? filteredResources.length : 0} resource${filteredResources && filteredResources.length !== 1 ? "s" : ""}`}
                    DialogContent={<FilterAndSort titleFilter={titleFilter} tagFilter={tagFilter} setTitleFilter={setTitleFilter} setTagFilter={setTagFilter} />}
                  />
                  <Section.Border />
                  <Section.Content>
                    <Resources resources={filteredResources ?? []} isLoading={isLoading} />
                  </Section.Content>
                </Section.Main>
            </Section>
       </Container>
    )
}

export default Home;