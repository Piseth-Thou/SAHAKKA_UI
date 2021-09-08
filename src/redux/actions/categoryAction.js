import { fetchCategories, fetchCategoryById } from "../../services/categoryService";
import { categoryActionType } from "./actionType";

export const onFetchCategories = () => async (dispatch) => {
	let categories = await fetchCategories();
	dispatch({
		type: categoryActionType.FETCH_CATEGORIES,
		payload: categories,
	});
};

export const onFetchCategoryById = (Id) => async (dispatch) => {
	let category = await fetchCategoryById(Id);
	dispatch({
		type: categoryActionType.FETCH_CATEGORY_BY_ID,
		payload: category,
	})
}


	

