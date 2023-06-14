import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

// type categories = 'DONE' | 'DOING' | 'TO_DO'

export let categories: string[] = ['TO_DO', 'DOING', 'DONE']

export interface IToDo {
	text: string
	id: number
	category: string
}

const { persistAtom: toDoPersist } = recoilPersist({
	key: 'todoLocal',
	storage: localStorage
})
const { persistAtom: categoryPersist } = recoilPersist({
	key: 'categoryLocal',
	storage: localStorage
})

export const categoryState = atom<string>({
	key: 'category',
	default: categories[0]
})

export const newCategoriesState = atom<string[]>({
	key: 'newCategoriesState',
	default: categories,
	effects_UNSTABLE: [categoryPersist]
})

export const toDoState = atom<IToDo[]>({
	key: 'toDo',
	default: [],
	effects_UNSTABLE: [toDoPersist]
})

export const toDoSelector = selector({
	key: 'toDoSelector',
	get: ({ get }) => {
		const toDos = get(toDoState)
		const category = get(categoryState)
		return toDos.filter((toDo) => toDo.category === category)
	}
})
