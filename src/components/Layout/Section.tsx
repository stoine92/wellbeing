import type { FC } from "react";
import type { ReactNode } from "react";
import Dialog from "../Dialog/DIalog";
import styles from "./Section.module.scss";


interface SectionComponent extends FC<SectionProps> {
    Main: FC<SectionMainProps>;
    Side: FC<SectionSideProps>;
    Head: FC<SectionHeadProps>;
    Content: FC<SectionContentProps>;
    Border: FC<SectionBorderProps>;
}

interface SectionProps {
    children: ReactNode;
}

const Section: SectionComponent = ({ children }: SectionProps ) => {
    return (
        <div className={styles.section}>
            {children}
        </div>
    )
};

interface SectionMainProps {
    children: ReactNode;
}

const SectionMain = ({ children }: SectionMainProps) => {
    return (
        <div className={styles["section_main"]}>
            {children}
        </div>
    )
};

Section.Main = SectionMain;

interface SectionSideProps {
    children: ReactNode;
}

const SectionSide = ({ children }: SectionSideProps) => {
    const classes = [styles["section_side"]];

    return (
        <div className={classes.join(" ")}>
            <div className={styles["section_side-header"]}>
                <h4>Filter &amp; Sort</h4>
            </div>
            <div className={styles["section_side-content"]}>
                {children}
            </div>
        </div>
    )
}

Section.Side = SectionSide;


interface SectionHeadProps {
    title: string;
    subtitle?: string;
    DialogContent?: ReactNode;
}

const SectionHead = ({ title, subtitle, DialogContent }: SectionHeadProps) => {
    return(
        <div className={styles["section_head"]}>
            <div className={styles["section_head-info"]}>
                <h1 className={styles["section_head-title"]}>{title}</h1>
                {subtitle && <h3 className={styles["section_head-subtitle"]}>{subtitle}</h3>}
            </div>

            <Dialog
                title="Filter &amp; Sort"
                trigger={<button className={styles["section_head-button"]}>Filter &amp; Sort</button>}
            >
                { DialogContent }
            </Dialog>
        </div>
    )
}

Section.Head = SectionHead;


interface SectionContentProps {
    children: ReactNode;
}

const SectionContent = ({ children }: SectionContentProps) => {
    return (
        <div className={styles["section_content"]}>
            { children }
        </div>
    )
}

Section.Content = SectionContent;


interface SectionBorderProps {
    secondary?: boolean;
}

const SectionBorder = ({ secondary }: SectionBorderProps) => {
    const classes = [styles["section_border"]];
    
    if (secondary) { classes.push(styles["section_border--secondary"])}
    return (
        <div className={classes.join(" ")} />
    )
}

Section.Border = SectionBorder;


export default Section;