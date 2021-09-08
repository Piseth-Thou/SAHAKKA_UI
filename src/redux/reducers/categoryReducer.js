import { categoryActionType } from "../actions/actionType";

const initialState = {
	categories: [],
	category:[],
	
};	

const categoryReducer = (state = initialState, {type,payload}) => {
	switch (type) {
		case categoryActionType.FETCH_CATEGORIES:
			return { ...state, categories: [payload] };	
		case categoryActionType.FETCH_CATEGORY_BY_ID:
			return { ...state, category: [payload] };

		default:
			return state;
	}
};

export default categoryReducer;
