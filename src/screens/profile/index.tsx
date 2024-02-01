import { useQuery } from '@tanstack/react-query'
import Coin from '../../assets/coin.svg'
import SectionHeader from '../../components/section-header'
import { formatNumber } from '../../helpers/format-balance.helper'
import { getRoleName } from '../../helpers/get-role-name.helper'
import { useAppSelector } from '../../hooks/useAppSelector'
import shopService from '../../services/shop/shop.service'

import Button from '../../components/button'
import { MyShopItem } from '../../types/shop.type'
import styles from './Profile.module.scss'
const Profile = () => {
	const user = useAppSelector(state => state.user)
	const { roleName, bgColor, borderColor, textColor } = getRoleName(user?.role)
	const { data, isSuccess } = useQuery<MyShopItem[]>({
		queryKey: ['my-items'],
		queryFn: shopService.getMyItems,
		refetchOnWindowFocus: 'always',
	})
	const ShopItem = ({ item }: { item: MyShopItem }) => {
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
					<Button title='Использовать' />
				</div>
			</div>
		)
	}

	return (
		<>
			{user && (
				<div className='w-full h-full flex flex-col gap-10'>
					<div className='flex flex-col'>
						<SectionHeader title='Ваш профиль' />
						<div className='p-5 bg-[#0F1623] rounded flex items-center justify-between'>
							<div className='flex items-center gap-5'>
								<h1 className='text-2xl font-bold'>{user!.username}</h1>
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
								<img src={Coin} alt='' />
							</div>
						</div>
						<SectionHeader title='Мои покупки' />
						<div className='grid grid-cols-2 gap-10'>
							{isSuccess &&
								data &&
								data.map(item => {
									return <ShopItem item={item} />
								})}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
