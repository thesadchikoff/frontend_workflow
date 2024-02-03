import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Coin from "../../assets/coin.svg";
import MyShopProduct from "../../components/my-shop-item";
import SectionHeader from "../../components/section-header";
import { formatNumber } from "../../helpers/format-balance.helper";
import { getRoleName } from "../../helpers/get-role-name.helper";
import { useAppSelector } from "../../hooks/useAppSelector";
import shopService from "../../services/shop/shop.service";
import { MyShopItem } from "../../types/shop.type";
import styles from "./Profile.module.scss";
import { ShoppingBasket } from "lucide-react";

const Profile = () => {
  const user = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["use-item"],
    mutationFn: shopService.useProductItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-items"] });
    },
  });
  const { roleName, bgColor, borderColor, textColor } = getRoleName(user?.role);
  const { data, isSuccess } = useQuery<MyShopItem[]>({
    queryKey: ["my-items"],
    queryFn: shopService.getMyItems,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <>
      {user && (
        <div className="w-full h-full flex flex-col gap-10 relative">
          <div className="flex flex-col h-full">
            <SectionHeader title="Ваш профиль" />
            <div className="p-5 bg-[#0F1623] rounded flex items-center justify-between">
              <div className="flex items-center gap-5">
                <h1 className="text-2xl font-bold">{user!.username}</h1>
                <span
                  className={`rounded text-[10px] bg-opacity-[15%] px-4 py-1 ${bgColor} ${textColor} border ${borderColor} `}
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
            <SectionHeader title="Мои покупки" />
            {!data ? (
              <div className={styles.not_found_block}>
                <h1 className="flex items-center gap-2 opacity-30">
                  <ShoppingBasket />У Вас нет приобретенных привилегий
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-10">
                {isSuccess &&
                  data &&
                  data.map((item) => {
                    return (
                      <MyShopProduct item={item} action={() => mutate(item)} />
                    );
                  })}
              </div>
            )}
          </div>
          {/* <div className="w-full absolute bottom-0 bg-sky-600 left-0">
            <h1>Вы администратор</h1>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Profile;
