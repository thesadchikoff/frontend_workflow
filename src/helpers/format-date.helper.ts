export function formatDate(date: string) {
	const changeDate = new Date(date)
	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
	return formatter.format(changeDate)
}
