import { useSetRecoilState } from 'recoil'
import { categories, IToDo, toDoState } from './atoms'

const localCategories = localStorage.getItem('categoryLocal')

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState)
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name }
		} = event
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
			const newToDo = { text, id, category: name as any }
			return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)]
		})
	}

	const delBtn = () => {
		setToDos((oldToDos) => {
			return oldToDos.filter((toDo) => toDo.id !== id)
		})
	}

	if (localCategories) {
		const parseCategoryData = JSON.parse(localCategories !== null ? localCategories : '')
		const useCategory = parseCategoryData['newCategoriesState']
		return (
			<li>
				<span>{text}</span>

				{useCategory.map(
					(orderCategory: string) =>
						category !== orderCategory && (
							<button name={orderCategory} onClick={onClick}>
								{orderCategory}
							</button>
						)
				)}
				<button onClick={delBtn}>X</button>
			</li>
		)
	} else {
		return (
			<li>
				<span>{text}</span>

				{categories.map(
					(orderCategory) =>
						category !== orderCategory && (
							<button name={orderCategory} onClick={onClick}>
								{orderCategory}
							</button>
						)
				)}
				<button onClick={delBtn}>X</button>
			</li>
		)
	}
}

export default ToDo
