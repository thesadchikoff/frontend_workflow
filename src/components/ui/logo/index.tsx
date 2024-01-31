import { Link } from "react-router-dom";
import logoImage from "../../../assets/logo.svg";

interface Logo {
  isReturned?: boolean;
}

const Logo = ({ isReturned = false }: Logo) => {
  if (isReturned) {
    return (
      <Link to={"/"} className={"flex items-center gap-5"}>
        <img src={logoImage} alt="Logo" />
        <h1>WorkFlow</h1>
      </Link>
    );
  }
  return (
    <div className={"flex items-center gap-5"}>
      <img src={logoImage} alt="Logo" />
      <h1>WorkFlow</h1>
    </div>
  );
};

export default Logo;
