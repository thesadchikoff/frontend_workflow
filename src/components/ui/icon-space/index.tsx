import { PropsWithChildren, RefObject } from "react";
import { Link } from "react-router-dom";
import styles from "./IconSpace.module.scss";
interface IconSpace extends PropsWithChildren {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  isMobile?: boolean;
  href?: string;
  ref?: RefObject<any>;
  title?: string;
}
export const IconSpace = ({
  onClick,
  children,
  isMobile = false,
  href,
  ref,
  title,
}: IconSpace) => {
  if (href) {
    return (
      <Link
        title={title}
        to={href}
        className={isMobile ? styles.icon_is_mobile : styles.icon}
      >
        {children}
      </Link>
    );
  }
  return (
    <div
      title={title}
      ref={ref}
      onClick={onClick}
      className={isMobile ? styles.icon_is_mobile : styles.icon}
    >
      {children}
    </div>
  );
};
