import type { Resource } from "../../lib/fetchResources";
import { formatDuration } from "../utils/formatDuration";
import styles from "./ResourceCard.module.scss";

interface Props {
    resource: Resource;
}

const ResourceCard = ({ resource }: Props) => {
    const { duration, category, tags, thumbnail, title } = resource;

    
    return (
        <div className={styles["resourceCard"]}>
            <div className={styles["resourceCard_image"]}>
                <img src={thumbnail} alt={title} className={styles["resourceCard_img"]} />
            </div>
            <div className={styles["resourceCard_content"]}>
                <div className={styles["resourceCard_headings"]}>
                    <h3 className={styles["resourceCard_headings-title"]}>{title}</h3>
                    <span>{formatDuration(duration, category)}</span>
                </div>

                <div className={styles["resourceCard_tags"]}>
                    {tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles["resourceCard_tags-tag"]}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
