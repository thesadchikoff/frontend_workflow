import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'
import { OnlyAuth, OnlyUnAuth } from './hoc/ProtectedRoute.tsx'
import { useAppDispatch } from './hooks/useAppDispatch.ts'
import HomePage from './screens/home'
import LoginPage from './screens/login'
import ProfilePage from './screens/profile'
import RegisterPage from './screens/register/index.tsx'
import userService from './services/user/user.service.ts'
import { logout, updateProfile } from './store/auth/auth.slice.ts'

function App() {
	const dispatch = useAppDispatch()
	const { data, isError } = useQuery({
		queryKey: ['getMe'],
		queryFn: userService.getProfile,
		refetchOnWindowFocus: 'always',
	})
	useEffect(() => {
		if (isError) {
			dispatch(logout())
		}
		dispatch(updateProfile(data))
	}, [data])
	console.log(data)
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path={'/'} element={<OnlyAuth component={<HomePage />} />} />
					<Route
						path={'/profile'}
						element={<OnlyAuth component={<ProfilePage />} />}
					/>
					<Route
						path={'/login'}
						element={<OnlyUnAuth component={<LoginPage />} />}
					/>
					<Route
						path={'/register'}
						element={<OnlyUnAuth component={<RegisterPage />} />}
					/>
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default App
