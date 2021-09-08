import { accountActionType } from "../actions/actionType";

const initialState = {
	accounts: [],
	isLoading : true,
};

const accountReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case accountActionType.FETCH_FREELANCER_BY_ID:
			return {
				...state,
				accounts: [payload],
				isLoading : payload.isLoading
			};
		case accountActionType.FETCH_BUSINESSOWNER_BY_ID:
			return {
				...state,
				accounts: [payload],
				isLoading : payload.isLoading
			};
		default:
			return state;
	}
};

export default accountReducer;