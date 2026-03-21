import styles from "./PageHead.module.scss";

const PageHead = () => {
    return (
        <header className={styles.pageHead}>
            <div className={styles.pageHead_inner}>
                <div className={styles.pageHead_account}>
                    <h3 className={styles["pageHead_account-title"]}>Wisdom Wellbeing</h3>
                </div>
            </div>
        </header>
    )
}

export default PageHead;