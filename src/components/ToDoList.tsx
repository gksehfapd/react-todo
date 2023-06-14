import { useRecoilState, useRecoilValue } from 'recoil'
import CreateToDo from './CreateToDo'
import { categories, categoryState, toDoSelector } from './atoms'
import ToDo from './ToDo'
import AddCategories from './AddCategories'

const localCategories = localStorage.getItem('categoryLocal')

const ToDoList = () => {
	const toDos = useRecoilValue(toDoSelector)
	const [category, setCategory] = useRecoilState(categoryState)
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any)
	}

	if (localCategories) {
		const parseCategoryData = JSON.parse(localCategories !== null ? localCategories : '')
		const useCategory = parseCategoryData['newCategoriesState']
		return (
			<div>
				<h1>To Dos</h1>
				<hr />
				<h1>Add Categories</h1>
				<AddCategories />
				<hr />
				<select value={category} onInput={onInput}>
					{useCategory.map((orderCategory: string) => (
						<option key={orderCategory} value={orderCategory}>
							{orderCategory}
						</option>
					))}
				</select>
				<CreateToDo />
				{toDos?.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</div>
		)
	} else {
		return (
			<div>
				<h1>To Dos</h1>
				<hr />
				<h1>Add Categories</h1>
				<AddCategories />
				<hr />
				<select value={category} onInput={onInput}>
					{categories.map((orderCategory) => (
						<option key={orderCategory} value={orderCategory}>
							{orderCategory}
						</option>
					))}
				</select>
				<CreateToDo />
				{toDos?.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</div>
		)
	}
}

export default ToDoList
