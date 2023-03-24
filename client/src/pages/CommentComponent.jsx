import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getUsers, get_Comments_On_Event } from "../actions/CommentAction";

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
            <div>
                {AllComments.map (comments => {
                    for (let index = 0; index < Users.length; index++) {
                        if (Users[index].user_id === comments.user_id) {
                            return (
                                <div>
                                    <h3>{Users[index].login}</h3>
                                    <p>{comments.comment}</p>
                                </div>
                            )
                        }
                    }
                })}
                <input type="text" value={comment} placeholder="Enter your comment" onChange={e => setComment(e.target.value)}/>
                <button onClick={() => dispatch(createComment(comment, event_id, UserStore.user.userId) )}>Comment</button>
            </div>
        )
    }
    else {
        return (
            <p>No comments yet</p>
        )
    }
}