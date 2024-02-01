type Role = 'user' | 'admin' | null

export const getRoleName = (role: Role) => {
	switch (role) {
		case 'user':
			return {
				roleName: 'Пользователь',
				textColor: 'text-[#2509CF]',
				borderColor: 'border-[#2509CF]',
				bgColor: 'bg-[#2509CF]',
			}
		case 'admin':
			return {
				roleName: 'Администратор',
				textColor: 'text-[#FF4040]',
				borderColor: 'border-[#FF4040]',
				bgColor: 'bg-[#FF4040]',
			}
		default:
			return {
				roleName: 'Без роли',
				textColor: 'text-[#2509CF]',
				borderColor: 'border-[#2509CF]',
				bgColor: 'bg-[#2509CF]',
			}
	}
}
