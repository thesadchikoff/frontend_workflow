export type ShopItem = {
	id: number
	title: string
	description: string
	price: number
}

export type MyShopItem = {
	unic_id: number
} & ShopItem
