import { type ReactNode, useState } from 'react';
import * as D from '@radix-ui/react-dialog';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import ButtonIcon from '../Buttons/ButtonIcon';
import Section from '../Layout/Section';
import styles from './Dialog.module.scss';

interface DialogProps {
  open?: boolean;
  title?: string;
  children?: ReactNode;
  className?: string;
  trigger?: ReactNode;
}

const Dialog = ({ open, title, children, className, trigger }: DialogProps) => {

    const [isOpen, setIsOpen] = useState(open);

    const contentClasses = [
        styles["dialog_content"],
        className
    ]

    const onOpenChange = (open: boolean) => {
        setIsOpen(open);
    }


    return (
        <D.Root open={isOpen} onOpenChange={onOpenChange}>
            <D.Trigger asChild>
                {trigger}
            </D.Trigger>
            <D.Portal>
                <D.Overlay className={styles["dialog_overlay"]}>
                    <D.Content className={contentClasses.join(" ")}>
                        {title && (
                            <div className={styles["dialog_header"]}>
                                <D.Title className={styles["dialog_header-title"]}>{title}</D.Title>
                                <D.Close asChild>
                                    <ButtonIcon icon={HighlightOffSharpIcon} noBg />
                                </D.Close>
                            </div>
                        )}
                        <Section.Border />
                        <VisuallyHidden.Root><D.Title></D.Title></VisuallyHidden.Root>
                        <VisuallyHidden.Root><D.Description></D.Description></VisuallyHidden.Root>
                        <div className={styles["dialog_body"]}>
                            {children}
                        </div>
                    </D.Content>
                </D.Overlay>
            </D.Portal>
        </D.Root>
    );
}

export default Dialog;
