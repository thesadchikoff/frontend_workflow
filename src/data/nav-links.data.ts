import { CalendarCheck2, Home, ShoppingBasket, UsersRound } from 'lucide-react'

export const navLinks = [
	{
		path: '/',
		title: 'Главная',
		icon: Home,
	},
	{
		path: '/tasks',
		title: 'Мои задачи',
		icon: CalendarCheck2,
	},
	{
		path: '/subdivision',
		title: 'Моё подразделение',
		icon: UsersRound,
	},
	{
		path: '/shop',
		title: 'Магазин',
		icon: ShoppingBasket,
	},
]
