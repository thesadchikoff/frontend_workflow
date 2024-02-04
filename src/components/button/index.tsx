import { HTMLAttributes } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

type Props = {
  title: string;
  icon?: JSX.Element | null;
  disable?: boolean;
  type: "primary" | "ghost" | "access" | "danger";
} & HTMLAttributes<HTMLButtonElement>;

const Button = ({ icon, title, onClick, disable, type = "primary" }: Props) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={cn(styles.button, { [styles.primary]: type === "primary" })}
    >
      {icon && <i className={styles["btn-icon"]}>{icon}</i>}
      <span className="flex-1">{title}</span>
    </button>
  );
};

export default Button;
