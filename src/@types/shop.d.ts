export type ShopItem = {
	id: number
	title: string
	description: string
	price: number
}

export type MyShopItem = {
	uniq_id: number
} & ShopItem
