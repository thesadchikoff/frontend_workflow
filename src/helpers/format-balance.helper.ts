export function formatNumber(number: number) {
	return new Intl.NumberFormat('ru-RU').format(number)
}
