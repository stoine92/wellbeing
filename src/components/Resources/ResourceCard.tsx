import type { Resource } from "../../lib/fetchResources";
import { formatDuration } from "../utils/formatDuration";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ButtonIcon from "../Buttons/ButtonIcon";
import Dialog from "../Dialog/DIalog";
import { formatDate } from "../utils/formatDate";
import styles from "./ResourceCard.module.scss";

interface Props {
    resource: Resource;
}

const ResourceCard = ({ resource }: Props) => {
    const { duration, category, tags, thumbnail, title, description, date_uploaded } = resource;


    return (
        <div className={styles["resourceCard"]}>
            <div className={styles["resourceCard_image"]}>
                <img src={thumbnail} alt={title} className={styles["resourceCard_image-img"]} />
            </div>
            <div className={styles["resourceCard_content"]}>
                <div className={styles["resourceCard_headings"]}>
                    <div className={styles["resourceCard_headings-body"]}>
                        <h3 className={styles["resourceCard_headings-title"]}>{title}</h3>
                        <Dialog trigger={<ButtonIcon noBg icon={InfoOutlinedIcon}/>}>
                            <div className={styles["resourceCard_dialog-main"]}>
                                <img src={thumbnail} alt={title} className={styles["resourceCard_dialog-image"]} />
                                <div className={styles["resourceCard_dialog-overlay"]}>
                                    <span className={styles["resourceCard_dialog-category"]}>{category}</span>
                                    <h2 className={styles["resourceCard_dialog-title"]}>{title}</h2>
                                </div>
                            </div>
                            <div className={styles["resourceCard_dialog-content"]}>
                                <span className={styles["resourceCard_dialog-description"]}>{description}</span>
                                <div className={styles["resourceCard_dialog-meta"]}>
                                    <span>{formatDuration(duration, category)}</span>
                                    {date_uploaded && <span>{formatDate(date_uploaded)}</span>}
                                </div>
                                {tags?.length > 0 &&
                                    <div className={styles["resourceCard_tags"]}>
                                        {tags.map((tag) => (
                                            <span key={tag} className={styles["resourceCard_tags-tag"]}>{tag}</span>
                                        ))}
                                    </div>
                                }
                            </div>
                        </Dialog>
                    </div>
                    <span className={styles["resourceCard_headings-duration"]}>{formatDuration(duration, category)}</span>
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
