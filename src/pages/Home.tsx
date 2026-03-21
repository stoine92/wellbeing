import Container from "../components/Layout/Container";
import Section from "../components/Layout/Section";


function Home () {
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