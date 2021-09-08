import {
	fetchPost,
	fetchOwnerGetAllPost,
	fetchOwnerGetAllPostPending,
	fetchOwnerGetAllPostDraft,
	deleteServicePost,
	fetchPostById,
	updatePostById,
	fetchOwnerGetAllServicePost,
	fetchOwnerGetAllServicePostDraft,
	fetchOwnerGetAllServicePostPending,
	deletePost,
	fetchServicePostByCategory,
} from '../../services/postService';
import { postActionType } from './actionType';

export const onFetchPosts = (page) => async (dispatch) => {
	let posts = await fetchPost(page);
	dispatch({
		type: postActionType.FETCH_POST,
		payload: posts,
		isLoading: false,
	});
}
export const onFetchPostsById = (id) => async (dispatch) => {
	let posts = await fetchPostById(id);
	dispatch({
		type: postActionType.FETCH_POSTBYID,
		payload: posts,
		isLoading: false,
	});
}

export const onDeletePostServicePost = (postId) => async (dispatch) => {
	let message = await deleteServicePost(postId);

	dispatch({
		type: postActionType.DELETE_SERVICE_POSTBYID,
		payload: postId,
	});
};

export const onDeletePost = (post_id) => async (dispatch) => {
	let message = await deletePost(post_id);

	dispatch({
		type: postActionType.DELETE_POSTBYID,
		payload: post_id,
	})
}

// // ===================== Handle update post ==================
// export const onUpdatePost = (postId, updatedPost) => async (dispatch) => {
// 	let message = await updatePostById(postId, updatedPost);

// 	dispatch({
// 		type: postActionType.UPDATE_POST,
// 		payload: { postId, updatedPost },
// 	});
// };


// ===================== Fetch All ownergetpost===================
export const onFetchOwnerGetAllPost = () => async (dispatch) => {
	let ownerGetAllPost = await fetchOwnerGetAllPost();
	dispatch({
		type: postActionType.FETCH_OWNER_GET_ALLPOST,
		payload: ownerGetAllPost,
	});
}

export const onFetchOwnerGetAllPostPending = () => async (dispatch) => {
	let ownerGetAllPostPending = await fetchOwnerGetAllPostPending();
	dispatch({
		type: postActionType.FETCH_OWNER_GET_ALLPOST_PENDING,
		payload: ownerGetAllPostPending,
	});
}

export const onFetchOwnerGetAllPostDraft = () => async (dispatch) => {
	let ownerGetAllPostDraft = await fetchOwnerGetAllPostDraft();
	dispatch({
		type: postActionType.FETCH_OWNER_GET_ALLPOST_DRAFT,
		payload: ownerGetAllPostDraft,
	})
}

// ===================== Fetch All ownerGetAllServicePost===================
export const onFetchOwnerGetAllServicePost = (page) => async (dispatch) => {
	let ownerGetAllServicePost = await fetchOwnerGetAllServicePost(page);
	dispatch({
		type: postActionType.FETCH_OWNER_GET_ALL_SERVICE_POST,
		payload: ownerGetAllServicePost,
	})
}

export const onFetchOwnerGetAllServicePostPending = () => async (dispatch) => {
	let ownerGetAllServicePostPending = await fetchOwnerGetAllServicePostPending();
	dispatch({
		type: postActionType.FETCH_OWNER_GET_ALL_SERVICE_POST_PENDING,
		payload: ownerGetAllServicePostPending,
	})
}

export const onFetchOwnerGetAllServicePostDraft = () => async (dispatch) => {
	let ownerGetAllServicePostDraft = await fetchOwnerGetAllServicePostDraft();
	dispatch({
		type: postActionType.FETCH_OWNER_GET_ALL_SERVICE_POST_DRAFT,
		payload: ownerGetAllServicePostDraft,
	})
}
// ------------Fetch service post of freelancer by category-------
export const onFetchServicePostsByCategory = (category) => async (dispatch) => {
	let posts = await fetchServicePostByCategory(category);
	dispatch({
		type: postActionType.FETCH_POSTBYCATEGORY,
		payload: posts,
		isLoading: false,
	});
}