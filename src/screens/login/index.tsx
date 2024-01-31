import { Ban, KeyRound, Loader2, UserRound } from 'lucide-react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../components/button/index.tsx'
import { useAppDispatch } from '../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { login } from '../../store/auth/auth.action.ts'

import { Link } from 'react-router-dom'
import Input from '../../components/ui/input/index.tsx'
import { AuthInputs } from '../../types/form.types.ts'
import styles from './Login.module.scss'
const LoginPage: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid },
	} = useForm<AuthInputs>({ mode: 'all' })
	const onSubmit: SubmitHandler<AuthInputs> = data => {
		dispatch(login(data))
		reset()
	}
	const error = useAppSelector(state => state.error)
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(state => state.isLoading)
	console.log(error)
	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h1 className={'text-xl'}>Welcome to Workflow!</h1>
				<div className={styles.form_container}>
					<Input
						placeholder={'Введите email'}
						{...register('username', {
							required: 'Обязательно к заполнению',
							// pattern: {
							//   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							//   message: "Невалидный email",
							// },
						})}
						error={errors.username}
						icon={<UserRound className={'text-slate-900'} />}
					/>
					<Input
						type='password'
						placeholder={'Введите пароль'}
						{...register('password', {
							required: 'Данное поле является обязательным',
						})}
						error={errors.password}
						icon={<KeyRound className={'text-slate-900'} />}
					/>

					<Button
						icon={isLoading ? <Loader2 className='animate-spin' /> : null}
						title='Войти'
						disable={!isDirty || !isValid || isLoading}
					/>
					<span className='mobile:text-[10px] tablet:text-xs notebook:text-xs desktop:text-xs text-slate-700 flex items-center gap-1'>
						У Вас нет аккаунта?{' '}
						<Link to='/register' className='text-[#FFB46A] underline'>
							Зарегистрируйтесь!
						</Link>
					</span>
					<>
						{error && (
							<span
								className={
									'text-xs text-red-600 flex items-center gap-2 p-2 w-full justify-center border border-red-600'
								}
							>
								<Ban size={12} />
								{error?.response.data}
							</span>
						)}
					</>
				</div>
			</form>
		</div>
	)
}

export default LoginPage
