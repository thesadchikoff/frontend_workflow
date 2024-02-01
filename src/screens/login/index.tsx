import { KeyRound, Loader2, UserRound } from 'lucide-react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../components/button/index.tsx'
import AppLink from '../../components/ui/app-link/index.tsx'
import Input from '../../components/ui/input/index.tsx'
import { useAppDispatch } from '../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { login } from '../../store/auth/auth.action.ts'
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
	const isLoading = useAppSelector(state => state.isLoading)
	const dispatch = useAppDispatch()

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h1 className={'text-xl'}>Welcome to Workflow!</h1>
				<div className={styles.form_container}>
					<Input
						placeholder={'Введите логин'}
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
					<span className='mobile:text-[10px] tablet:text-xs notebook:text-xs desktop:text-xs text-[#616979] flex items-center gap-1'>
						У Вас нет аккаунта?{' '}
						<AppLink to='/register' title='Зарегистрируйтесь!' />
					</span>
				</div>
			</form>
		</div>
	)
}

export default LoginPage
