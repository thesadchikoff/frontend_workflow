import { PropsWithChildren, Suspense } from 'react'
import Loading from '../../screens/loading'
import './Layout.scss'
import { Header } from './header/Header'
import Sidebar from './sidebar'

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className={'flex flex-col w-full h-full'}>
			<Header />
			<main className={'w-full h-full flex-1 flex'}>
				<Sidebar />

				<section className='flex-1 px-10 py-5'>
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</section>
			</main>
		</div>
	)
}

export default Layout
