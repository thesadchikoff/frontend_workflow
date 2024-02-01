import { MyShopItem } from '../../types/shop.type'
import Button from '../button'
import styles from './MyShopItem.module.scss'

interface MyShopProduct {
	item: MyShopItem
	action?: () => void
}

const MyShopProduct = ({ item, action }: MyShopProduct) => {
	return (
		<div className={styles.shop_item}>
			<div className={styles.shop_header}>
				<h1 className={styles.shop_title}>{item.title}</h1>
			</div>
			<div className={styles.shop_body}>
				<span className={styles.shop_description}>{item.description}</span>
			</div>
			<div className={styles.shop_footer}>
				<Button onClick={action} title='Использовать' />
			</div>
		</div>
	)
}

export default MyShopProduct
