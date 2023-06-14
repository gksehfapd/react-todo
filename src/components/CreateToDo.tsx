import { useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { categoryState, toDoState } from './atoms'

interface IForm {
	toDo: string
}

const CreateToDo = () => {
	const setTodos = useSetRecoilState(toDoState)
	const category = useRecoilValue(categoryState)
	const { handleSubmit, register, setValue } = useForm<IForm>()
	const handleValid = ({ toDo }: IForm) => {
		setTodos((prev) => [{ text: toDo, category, id: Date.now() }, ...prev])
		setValue('toDo', '')
	}
	return (
		<form onSubmit={handleSubmit(handleValid)}>
			<input
				{...register('toDo', { required: 'plz write to do' })}
				type="text"
				placeholder="todo"
			/>
			<button>Add</button>
		</form>
	)
}

export default CreateToDo
