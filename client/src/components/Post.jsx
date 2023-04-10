import React from 'react';
import classes from './css/Post.module.css';
import moment from 'moment';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import OrgSevice from '../API/OrgSerivce';

const Post = (props) => {
    const deletePost = async (e) => {
        e.preventDefault();
        const {data} = await OrgSevice.deletePost(props.post_id);
        if(data === "Post delited"){
            props.fetchPosts();
        }
    }
  return (
    <div className={classes.post_wrapper}>
        <div className={classes.date_container}>
            <p className={classes.date}>{moment(props.createdAt).format('MMMM Do YYYY')}</p>
            <p className={classes.time}>{moment(props.createdAt).format('h:mm a')}</p>
        </div>
        <h2 className={classes.post_header}>{props.header}</h2>
        <pre className={classes.post_text}>{props.text}</pre>
        { props.isAuthor &&
            <div className={classes.delete_container}>
                <DeleteOutlineRoundedIcon onClick={(e) => deletePost(e)} className={classes.delete}/>
            </div>
        }
    </div>
  )
}

export default Post