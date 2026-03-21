import type { Resource } from "../../lib/fetchResources";
import ResourceCard from "./ResourceCard";


interface ResourcesProps {
    resources: Resource[];
    isLoading: boolean;
}

const Resources = ({ resources, isLoading }: ResourcesProps) => {

    if(isLoading) { return <span>Loading...</span> };

    if(resources?.length === 0) {
        return (
            <p>No resources found based on your filter criteria.</p>
        )
    }

    return (
        <>
            {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </>
    );
};

export default Resources;