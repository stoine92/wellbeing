import Container from "../components/Layout/Container";
import Section from "../components/Layout/Section";
import { fetchResources } from "../lib/fetchResources";
import type { Resource } from "../lib/fetchResources";
import { useQuery } from "@tanstack/react-query";


function Home () {

  const { data: resources, isLoading } = useQuery<Resource[]>({
        queryFn: () => fetchResources(),
        queryKey: ["resources"],
    });

    console.log(resources);

    return (
       <Container>
            <Section>
                <Section.Side>
                  <span>Aside Section</span>
                </Section.Side>

                <Section.Main>
                  <Section.Head 
                    title="Example Title" 
                    subtitle="Example Subtitle"
                  />
                  <Section.Border />
                  <Section.Content>
                    <span>Section Content</span>
                  </Section.Content>
                </Section.Main>
            </Section>
       </Container>
    )
}

export default Home;