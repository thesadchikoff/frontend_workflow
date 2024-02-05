import { Link, NavLink, Navigate } from 'react-router-dom'
import Coin from '../../../assets/coin.svg'
import { navLinks, navLinksAdmin } from '../../../data/nav-links.data'
import { formatNumber } from '../../../helpers/format-balance.helper'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { logout } from '../../../store/auth/auth.slice'
import Button from '../../button'
import './Sidebar.scss'

const Sidebar = () => {
	const user = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const logoutHandler = () => {
		dispatch(logout())
		return <Navigate to='/login' />
	}
	if (user) {
		return (
			<aside className='sidebar'>
				<nav className='navigation'>
					{user.role === 'admin'
						? navLinksAdmin.map(link => {
								return (
									<NavLink
										end
										to={link.path}
										className={`link_item`}
										title={link.title}
									>
										<link.icon size={16} />
										<span className='text-[14px]'>{link.title}</span>
									</NavLink>
								)
						  })
						: navLinks.map(link => {
								return (
									<NavLink
										end
										to={link.path}
										className={`link_item`}
										title={link.title}
									>
										<link.icon size={16} />
										<span className='text-[14px]'>{link.title}</span>
									</NavLink>
								)
						  })}
				</nav>
				<footer className='sidebar_footer'>
					<div className={`user_section`}>
						<Link to={'/profile'} className={`user_banner`}>
							<span className={'text-xs '}>{user.username}</span>
							<span className={`balance_info`}>
								<img src={Coin} alt='' width={12} height={12} />
								{formatNumber(Number(user.balance))}
							</span>
						</Link>
					</div>
					<Button size='xs' onClick={logoutHandler} title='Выйти' />
				</footer>
			</aside>
		)
	}
	return null
}

export default Sidebar
