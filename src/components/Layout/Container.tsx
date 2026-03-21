import type { ReactNode } from "react";
import PageHead from "./PageHead";

import styles from "./Container.module.scss";


interface ContainerProps {
    children: ReactNode;
}

const Container = ({ children }: ContainerProps ) => {
    
    return (
        <div className={styles.container}>
            <PageHead />
            <main className={styles.content}>{children}</main>
            {/* Footer to be considered */}
        </div>
    )
};


export default Container;