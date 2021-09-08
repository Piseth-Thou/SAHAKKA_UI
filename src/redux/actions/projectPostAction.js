import { deleteProjectPost, fetchProjectPost, fetchProjectPostByID, insertProjectPost, updateProjectPostById , fetchProjectPostByCategory} from "../../services/projectPostService";
import { projectPostActionType } from "./actionType";

export const onFetchProjectPosts = (page) => async (dispatch) => {
    let projectPosts = await fetchProjectPost(page);
    dispatch({
        type: projectPostActionType.FETCH_PROJECTPOST,
        payload: projectPosts,
        isLoading : false ,
    });
}
export const onFilterLikesCount = (postId,totalLikes) => async (dispatch) => {
    
    dispatch({
        type: projectPostActionType.FILTER_POST_LIKES,
        payload: {postId,totalLikes},
        isLoading : false,
    });
}
export const onFetchProjectPostByID = (postId) => async (dispatch) => {
    let projectPost = await fetchProjectPostByID(postId);
    dispatch({
        type: projectPostActionType.FETCH_PROJECTPOST_BY_ID,
        payload: projectPost,
        isLoading : false ,
    });
}
export const onFetchProjectPostByCategory = (category) => async (dispatch) => {
    let projectPosts = await fetchProjectPostByCategory(category);
    dispatch({
        type: projectPostActionType.FETCH_PROJECTPOST_BY_CATEGORY,
        payload: projectPosts,
        isLoading : false ,
    });
}
// ===================== Handle Create post =================
export const onInsertProjectPost = (newProjectPost) => async (dispatch) => {
    let projectPost = await insertProjectPost(newProjectPost);
    dispatch({
        type: projectPostActionType.INSERT_PROJECTPOST,
        payload: projectPost,
    });
}

// ===================== Handle update post ==================
export const onUpdateProjectPost = (postId, updatedPost) => async (dispatch) => {
	let message = await updateProjectPostById(postId, updatedPost);

	dispatch({
		type: projectPostActionType.UPDATE_POST,
		payload: { postId, updatedPost },
	});
};

export const onDeleteProjectPost = (postId) => async (dispatch) => {
	let isSuccess = await deleteProjectPost(postId);
    if(isSuccess){
        dispatch({
            type: projectPostActionType.DELETE_PROJECTPOST,
            payload: postId,
        });
    }
};



