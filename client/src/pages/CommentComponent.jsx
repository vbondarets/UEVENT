import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, DeleteComment, getUsers, get_Comments_On_Event } from "../actions/CommentAction";
import style from './css/Comment.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

export const CommentComponent = (props) => {
    const {event_id} = props
    const CommentsStore = useSelector( store => store.Comment)
    const [comment, setComment] = useState('')
    const UserStore = useSelector( store => store.Auth)

    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch(get_Comments_On_Event(event_id))
        dispatch(getUsers())
    }, [dispatch, event_id])
    let AllComments = CommentsStore.CommentsOnEvent
    let Users = CommentsStore.Users
    console.log(UserStore.user);
    if(AllComments.length > 0) {
        return (
            <div className={style.container_comment}>
                {AllComments.map (comments => {
                    for (let index = 0; index < Users.length; index++) {
                        if (Users[index].user_id === comments.user_id) {
                            return (
                                <div className={style.comment}>
                                    <div className={style.head_of_comment}>
                                        <h3>{Users[index].login}</h3>
                                        {comments.user_id === UserStore.user.userId ? <DeleteIcon 
                                            onClick = { () => {dispatch(DeleteComment(comments.comment_id, UserStore.user.userId, event_id))}}
                                            className={style.deleteIcon}/> 
                                            : 
                                            <></>}
                                    </div>
                                    <p>{comments.comment}</p>
                                </div>
                            )
                        }
                    }
                })}
                <div className={style.input_comment}>
                    <input type="text" value={comment} placeholder="Enter your comment" onChange={e => setComment(e.target.value)}/>
                    <button onClick={() => {dispatch(createComment(comment, event_id, UserStore.user.userId)); setComment('')}}>Comment</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <p>No comments yet</p>
        )
    }
}