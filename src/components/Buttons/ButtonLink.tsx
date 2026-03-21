import css from "./ButtonLink.module.scss";

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

const ButtonLink = ({ className = "", children, type = 'button', onClick }: ButtonProps) => {

  const classes: string[] = [
        css.buttonLink,
        className
    ];

    return(
        <button 
            className={classes.join(" ")}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ButtonLink;