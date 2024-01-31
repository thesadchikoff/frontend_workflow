import { LogOut, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import Coin from '../../../assets/coin.svg'
import { formatNumber } from '../../../helpers/format-balance.helper.ts'
import { useAppDispatch } from '../../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { logout } from '../../../store/auth/auth.slice.ts'
import { IconSpace } from '../../ui/icon-space/index.tsx'
import Logo from '../../ui/logo/index.tsx'
import styles from './Header.module.scss'

export const Header = () => {
	const user = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	return (
		<header
			className={
				'flex-grow-0 w-full h-[60px] py-2 bg-slate-900 flex items-center px-10 justify-between'
			}
		>
			<Logo isReturned={true} />
			{user && (
				<div className={`${styles.right_section}`}>
					<IconSpace href='/profile' isMobile={true}>
						<UserRound size={18} />
					</IconSpace>
					<Link to={'/profile'} className={`${styles.user_banner}`}>
						<span className={'text-xs'}>{user.username}</span>
						<span className={styles.balance_info}>
							<img src={Coin} alt='' width={12} height={12} />
							{formatNumber(Number(user.balance))}
						</span>
					</Link>
					<IconSpace onClick={() => dispatch(logout())}>
						<LogOut size={18} />
					</IconSpace>
				</div>
			)}
		</header>
	)
}
