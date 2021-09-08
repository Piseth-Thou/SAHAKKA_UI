import { fetchFreelancerById , fetchBusinessOwnerById} from "../../services/accoutService";
import { accountActionType } from "./actionType";


export const onFetchFreelancerById = (Id) => async (dispatch) => {
	let accounts = await fetchFreelancerById(Id);
	dispatch({
		type: accountActionType.FETCH_FREELANCER_BY_ID,
		payload: accounts,
		isLoading: false,
	})
}
export const onFetchBusinessOwnerById = (Id) => async (dispatch) => {
	let accounts = await fetchBusinessOwnerById(Id);
	dispatch({
		type: accountActionType.FETCH_BUSINESSOWNER_BY_ID,
		payload: accounts,
		isLoading: false,
	})
}
