import { createCom, DeleteCom, getAllUsers, getCommnent_Event } from "../API/CommetsApi";


export const get_Comments_On_Event = (event_id) => async(dispatch) => {
    try {
        const {data} = await getCommnent_Event(event_id)
        if (data.length > 0) {
            return dispatch( {type: 'getCommentsOnEvent', payload: data} )
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = () => async(dispatch) => {
    try {
        const {data} = await getAllUsers()
        if (data.length > 0) {
            return dispatch( {type:'getAllUsers', payload: data} )
        }
    } catch (error) {
        console.log(error);
    }
}

export const createComment = (comment, event_id, user_id) => async(dispatch) => {
    try {
        const {data} = await createCom(comment, event_id, user_id)
        if (data === "Comment created!") {
            const Data = await getCommnent_Event(event_id)
            if (Data.data.length > 0) {
                console.log(Data.data);
                return dispatch( {type: 'createCom', payload: Data.data} )
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const DeleteComment = (comment_id, user_id, event_id) => async(dispatch) => {
    try {
        const {data} = await DeleteCom(comment_id, user_id)
        if (data === 'Comment was deleted') {
            const Data = await getCommnent_Event(event_id)
            if (Data.data.length > 0) {
                console.log(Data.data);
                return dispatch( {type: 'deleteComment', payload: Data.data} )
            }
        }
    } catch (error) {
        console.log(error);
    }
}