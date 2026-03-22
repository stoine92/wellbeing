import type { Resource } from "../../lib/fetchResources";
import ResourceCard from "./ResourceCard";
import { groupByCategory } from "../utils/groupByCategory";
import styles from "./Resources.module.scss"


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
    };

    const grouped = groupByCategory(resources);


    return (
        <>
            {Object.entries(grouped).map(([category, items]) => (
                <section key={category} className={styles["resources"]}>
                    <h2 className={styles["resources-title"]}>{category}</h2>
                    {items.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </section>
            ))}
        </>
    );
};

export default Resources;