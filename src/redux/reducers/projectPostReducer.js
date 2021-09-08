import { projectPostActionType } from "../actions/actionType";

const initialState = {
    projectPosts: [],
    projectPost: [],
    isLoading: true,
    totalPage: null
};

const projectPostReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case projectPostActionType.FETCH_PROJECTPOST:
            return {
                ...state,
                projectPosts: [payload],
                isLoading: payload.isLoading,
                totalPage: payload.total_page
            };
        case projectPostActionType.FILTER_POST_LIKES:
                let next = [{ ...state.projectPosts[0], payload: state.projectPosts[0].payload.filter((post) => post.post_id == payload.postId) }]
                let postIndex = state.projectPosts[0].payload.indexOf(next[0].payload[0])
                    let data = state.projectPosts[0].payload;
                    data[postIndex].likes=payload.totalLikes;                 
                let previous = [{ ...state.projectPosts[0], payload:data }]
                return {
                    ...state,
                    projectPosts:previous ,
                    isLoading: payload.isLoading,
                    totalPage: payload.total_page
                };

        case projectPostActionType.FETCH_PROJECTPOST_BY_ID:
            return {
                ...state,
                projectPost: [payload],
                isLoading: payload.isLoading,
            }
        case projectPostActionType.FETCH_PROJECTPOST_BY_CATEGORY:
            return {
                ...state,
                projectPosts: [payload],
                isLoading: payload.isLoading,
                totalPage: payload.total_page
            }
        case projectPostActionType.DELETE_PROJECTPOST:
            let projectPosts = state.projectPosts.filter(projectPost => projectPost.post_id !== payload)
            return { ...state, projectPosts: [...projectPosts] }
        case projectPostActionType.UPDATE_PROJECTPOST:
            let newProjectPosts = [...state.projectPosts]; newProjectPosts = newProjectPosts.map((projectPost) => {
                if (projectPost.postId === payload.postId) {
                    projectPost.title = payload.updateProjectPost.title;
                    projectPost.description = payload.updateProjectPost.description;
                    projectPost.postImage = payload.updateProjectPost.postImage;
                    projectPost.postStatus = payload.updateProjectPost.postStatus;
                    projectPost.categories = payload.updateProjectPost.categories;
                }
                return projectPost;
            });
            return { ...state, projectPosts: newProjectPosts }

        default:
            return state;
    }
}

export default projectPostReducer;