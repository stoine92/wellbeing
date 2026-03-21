import Container from "../components/Layout/Container";
import Section from "../components/Layout/Section";
import { fetchResources } from "../lib/fetchResources";
import type { Resource } from "../lib/fetchResources";
import { useQuery } from "@tanstack/react-query";
import Resources from "../components/Resources/Resources";


function Home () {

  const { data: resources, isLoading } = useQuery<Resource[]>({
        queryFn: () => fetchResources(),
        queryKey: ["resources"],
    });
    
    if(resources?.length === 0 && !isLoading) {
        return (
            <Container>
                <Section>
                    <Section.Main>
                        <Section.Head 
                            title="No documents found" 
                            subtitle="Please add some documents to get started"
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
                  <span>Aside Section</span>
                </Section.Side>

                <Section.Main>
                  <Section.Head 
                    title="Wellbeing Resources" 
                    subtitle={`Showing ${resources ? resources.length : 0} resource${resources && resources.length !== 1 ? "s" : ""}`}
                  />
                  <Section.Border />
                  <Section.Content>
                    <Resources resources={resources ?? []} isLoading={isLoading} />
                  </Section.Content>
                </Section.Main>
            </Section>
       </Container>
    )
}

export default Home;