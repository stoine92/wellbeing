import { useState, type ReactNode, type FC } from "react";
import * as C from "@radix-ui/react-collapsible";
import ButtonIcon from "../Buttons/ButtonIcon";

//Icons
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

//Styles
import styles from "./Collapsible.module.scss";

interface CollapsibleProps {
    title?: string;
    children?: ReactNode;
}


const Collapsible: FC<CollapsibleProps> = ({ title, children }) => {
	const [open, setOpen] = useState<boolean>(false);

    const handleOpenChange = (open: boolean): void => {
        setOpen(open);
    }

	return (
		<C.Root open={open} onOpenChange={handleOpenChange} className={styles.collapsible}>
            <C.Trigger asChild>
                <div className={styles.collapsible_trigger}>
                    <div className={styles.collapsible_header}>
                        <FolderOutlinedIcon />
                        <h3 className={styles["collapsible_header-title"]}>{title}</h3>
                    </div>
                    <ButtonIcon icon={open ? KeyboardArrowUpOutlinedIcon : KeyboardArrowDownOutlinedIcon} />
                </div>
            </C.Trigger>
			<C.Content className={styles["collapsible-collapse"]}>
                <div className={styles.collapsible_content}>
                    { children }
                </div>
			</C.Content>
		</C.Root>
	);
};

export default Collapsible;
