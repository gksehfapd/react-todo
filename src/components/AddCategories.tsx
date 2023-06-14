import { useForm } from 'react-hook-form'
import { categories, newCategoriesState } from './atoms'
import { useSetRecoilState } from 'recoil'

interface ICategory {
	newCategory: string
}

const AddCategories = () => {
	const setCategories = useSetRecoilState(newCategoriesState)
	const { handleSubmit, register, setValue } = useForm<ICategory>()

	const handleCategoryAdd = ({ newCategory }: ICategory) => {
		console.log('기존 카테고리들 : ', categories)
		console.log('추가할 카테고리 : ', newCategory)
		setCategories((prev) => [...prev, newCategory])
		console.log('추가된 이후 카테고리들 : ', categories)
		setValue('newCategory', '')
	}
	return (
		<form onSubmit={handleSubmit(handleCategoryAdd)}>
			<input
				{...register('newCategory', { required: 'plz write to do' })}
				type="text"
				placeholder="categories"
			/>
			<button>Add</button>
		</form>
	)
}

export default AddCategories
