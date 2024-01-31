import { HTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Props = {
  title: string;
  icon?: JSX.Element;
  disable?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const Button = ({ icon, title, onClick, disable }: Props) => {
  return (
    <button disabled={disable} onClick={onClick} className={styles.button}>
      {icon && <i className={styles["btn-icon"]}>{icon}</i>}
      <span className="flex-1">{title}</span>
    </button>
  );
};

export default Button;
