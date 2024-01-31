import Coin from "../../assets/coin.svg";
import { formatNumber } from "../../helpers/format-balance.helper";
import { getRoleName } from "../../helpers/get-role-name.helper";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./Profile.module.scss";
const Profile = () => {
  const user = useAppSelector((state) => state.user);
  const { roleName, color } = getRoleName(user?.role);
  return (
    <>
      {user && (
        <div className="w-full h-full flex flex-col gap-10">
          <div>
            <h1 className="mb-5 text-3xl font-bold">Ваш профиль</h1>
            <div className="p-5 bg-[#0F1623] rounded flex items-center justify-between">
              <div className="flex items-center gap-5">
                <h1 className="text-2xl font-bold">{user!.username}</h1>
                <span
                  className={`rounded text-[10px] bg-opacity-[8%] px-4 py-1 bg-[${color}] text-[${color}] border border-[${color}] `}
                >
                  {roleName}
                </span>
              </div>
              <div className={styles.balance_info}>
                <span className={styles.balance_count}>
                  {formatNumber(Number(user?.balance))}
                </span>
                <img src={Coin} alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
