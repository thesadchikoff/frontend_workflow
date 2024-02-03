import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Coin from "../../assets/coin.svg";
import Button from "../../components/button";
import SectionHeader from "../../components/section-header";
import { formatNumber } from "../../helpers/format-balance.helper";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import shopService from "../../services/shop/shop.service";
import { getProfile } from "../../store/auth/auth.action";
import { ShopItem } from "../../types/shop.type";
import styles from "./Shop.module.scss";

const ShopPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { data, isSuccess } = useQuery<ShopItem[]>({
    queryKey: ["shop"],
    queryFn: shopService.getShopItems,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: shopService.buyShopItem,
    mutationKey: ["buy"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-me"],
      });
      dispatch(getProfile());
    },
  });
  const ShopItem = ({ item }: { item: ShopItem }) => {
    return (
      <div className={styles.shop_item}>
        <div className={styles.shop_header}>
          <h1 className={styles.shop_title}>{item.title}</h1>
        </div>
        <div className={styles.shop_body}>
          <span className={styles.shop_description}>{item.description}</span>
        </div>
        <div className={styles.shop_footer}>
          <div className={styles.shop_price}>
            <img src={Coin} />
            <span>{item.price}</span>
          </div>
          <Button onClick={() => mutate(item)} title="Приобрести" />
        </div>
      </div>
    );
  };
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <SectionHeader title="Магазин">
        <span className={styles.total_balance}>
          Ваш баланс <article>{formatNumber(user?.balance)}</article>
          <img src={Coin} alt="Coin" />
        </span>
      </SectionHeader>
      <div className={styles.shop_wrapper}>
        {isSuccess &&
          data &&
          data.map((item) => {
            return <ShopItem item={item} />;
          })}
      </div>
    </div>
  );
};

export default ShopPage;
