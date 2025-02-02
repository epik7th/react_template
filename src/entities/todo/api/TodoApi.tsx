import { useCallback, useState } from 'react'
import { ITodo } from '../model/ITodo'

export const useGetTodo = () => {
	const [data, setData] = useState<ITodo[] | null>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>()

	const get = useCallback(async (searchText: string, sort: boolean): Promise<void> => {
		try {
			setLoading(true)
			const result: ITodo[] = await fetch(
				`http://localhost:3000/todos?title_like=${searchText}${sort ? '&_sort=title&_order=asc' : ''}`,
			).then<ITodo[]>((response) => response.json())
			setData(result)
		} catch {
			setError('Ошибка получения списка задач')
		} finally {
			setLoading(false)
		}
	}, [])

	return { get, data, loading, error }
}

export const useUpdateTodo = () => {
	const [data, setData] = useState<ITodo | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<string | null>()

	const update = useCallback(async (id: string, data: Omit<Partial<ITodo>, 'id'>): Promise<void> => {
		try {
			setIsSuccess(false)
			setLoading(true)
			const result: ITodo = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			}).then<ITodo>((response) => response.json())
			setData(result)
			setIsSuccess(true)
		} catch {
			setError('Ошибка обновления задачи')
			setIsSuccess(false)
		} finally {
			setLoading(false)
		}
	}, [])

	return { update, data, loading, error, isSuccess }
}

export const useRemoveTodo = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<string | null>()

	const remove = useCallback(async (id: string): Promise<void> => {
		try {
			setIsSuccess(false)
			setLoading(true)
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'DELETE',
			})
			if (response.ok) {
				setIsSuccess(true)
			} else {
				setError('Ошибка удаления задачи')
				setIsSuccess(false)
			}
		} catch {
			setError('Ошибка удаления задачи')
			setIsSuccess(false)
		} finally {
			setLoading(false)
		}
	}, [])

	return { remove, loading, error, isSuccess }
}

export const useAddTodo = () => {
	const [data, setData] = useState<ITodo | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<string | null>()

	const add = useCallback(async (data: Omit<ITodo, 'id'>): Promise<void> => {
		try {
			setIsSuccess(false)
			setLoading(true)
			const result: ITodo = await fetch(`http://localhost:3000/todos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			}).then<ITodo>((response) => response.json())
			setData(result)
			setIsSuccess(true)
		} catch {
			setError('Ошибка получения списка задач')
			setIsSuccess(false)
		} finally {
			setLoading(false)
		}
	}, [])

	return { add, data, loading, error, isSuccess }
}
