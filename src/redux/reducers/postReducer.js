import { postActionType } from "../actions/actionType";

const initialState = {
    posts: [],
    ownerGetAllPost: [],
    ownerGetAllPostPending: [],
    ownerGetAllPostDraft: [],
    ownerGetAllServicePost: [],
    ownerGetAllServicePostPending: [],
    ownerGetAllServicePostDraft: [],
    isLoading: true,
    totalPage: null
};


const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case postActionType.FETCH_POST:
            return {
                ...state,
                posts: [payload],
                isLoading: payload.isLoading,
                totalPage: payload.total_page
            };
        case postActionType.FETCH_POSTBYID:
            return {
                ...state,
                isLoading: payload.isLoading,
                posts: [payload]
            };
        case postActionType.FETCH_POSTBYCATEGORY:
            return {
                ...state,
                isLoading: payload.isLoading,
                posts: [payload]
            };
        case postActionType.INSERT_POST:
            return {
                ...state,
                posts: payload
            }
        case postActionType.DELETE_SERVICE_POSTBYID:
            return {
                ...state,
                ownerGetAllServicePost: [{ ...state.ownerGetAllServicePost[0], payload: state.ownerGetAllServicePost[0].payload.filter((post) => post.id != payload) }],
                ownerGetAllServicePostPending: [{ ...state.ownerGetAllServicePostPending[0], payload: state.ownerGetAllServicePostPending[0].payload.filter((post) => post.id != payload) }],
                ownerGetAllServicePostDraft: [{ ...state.ownerGetAllServicePostDraft[0], payload: state.ownerGetAllServicePostDraft[0].payload.filter((post) => post.id != payload) }]
            }
        case postActionType.DELETE_POSTBYID:
            return {
                ...state,
                ownerGetAllPost: [{ ...state.ownerGetAllPost[0], payload: state.ownerGetAllPost[0].payload.filter((post) => post.post_id != payload) }],
                ownerGetAllPostDraft: [{ ...state.ownerGetAllPostDraft[0], payload: state.ownerGetAllPostDraft[0].payload.filter((post) => post.post_id != payload) }],
                ownerGetAllPostPending: [{ ...state.ownerGetAllPostPending[0], payload: state.ownerGetAllPostPending[0].payload.filter((post) => post.post_id != payload) }],
            }
        case postActionType.FETCH_OWNER_GET_ALLPOST:
            return {
                ...state,
                ownerGetAllPost: [payload]
            };
        case postActionType.FETCH_OWNER_GET_ALLPOST_PENDING:
            return {
                ...state,
                ownerGetAllPostPending: [payload]
            };
        case postActionType.FETCH_OWNER_GET_ALLPOST_DRAFT:
            return {
                ...state,
                ownerGetAllPostDraft: [payload]
            };


        case postActionType.FETCH_OWNER_GET_ALL_SERVICE_POST:
            return {
                ...state,
                ownerGetAllServicePost: [payload],
                totalPage: payload.total_page
            };
        case postActionType.FETCH_OWNER_GET_ALL_SERVICE_POST_PENDING:
            return {
                ...state,
                ownerGetAllServicePostPending: [payload]
            };
        case postActionType.FETCH_OWNER_GET_ALL_SERVICE_POST_DRAFT:
            return {
                ...state,
                ownerGetAllServicePostDraft: [payload]
            }
        default:
            return state;

    };
}


export default postReducer;