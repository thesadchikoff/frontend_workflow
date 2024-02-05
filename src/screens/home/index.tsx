import { FC, useEffect, useRef } from 'react'

const HomePage: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		// Проверяем, что реф не равен null перед использованием
		if (canvasRef.current) {
			// Получаем контекст canvas
			const context = canvasRef.current.getContext('2d')

			// Теперь у вас есть доступ ко всем атрибутам и методам canvas
			if (context) {
				// Используйте context для рисования или других операций
				context.fillStyle = 'blue'
				context.fillRect(10, 10, 50, 1000)
				// context.fillText('Text', 100, 10)
				const text = context.strokeText('Статистика задач', 100, 100, 600)
			}
		}
	}, [])
	return (
		<div>
			<h1>Welcome to Home Page</h1>
			<canvas ref={canvasRef}></canvas>
		</div>
	)
}

export default HomePage
