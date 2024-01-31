import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../components/section-header";
import shopService from "../../services/shop/shop.service";
import { ShopItem } from "../../types/shop.type";
import Button from "../../components/button";
import { useAppSelector } from "../../hooks/useAppSelector";
import Coin from "../../assets/coin.svg";

const ShopPage = () => {
  const user = useAppSelector((state) => state.user);
  const { data, isSuccess } = useQuery<ShopItem>({
    queryKey: ["shop"],
    queryFn: shopService.getShopItems,
  });
  const ShopItem = ({ item }: { item: ShopItem }) => {
    return (
      <div>
        <h1>{item.title}</h1>
        <span>{item.description}</span>
        <div>
          <span>{item.price}</span>
          <Button title="Приобрести" />
        </div>
      </div>
    );
  };
  console.log(data);
  return (
    <div>
      <SectionHeader title="Магазин">
        <span className="flex items-center gap-1">
          Ваш баланс {user?.balance}
          <article>WCoin</article>
        </span>
      </SectionHeader>
      <div className="grid grid-cols-4 gap-4">
        {isSuccess && <ShopItem item={data} />}
      </div>
    </div>
  );
};

export default ShopPage;
