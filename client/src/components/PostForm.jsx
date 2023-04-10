import React, { useState } from 'react'
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import classes from './css/PostForm.module.css'
import OrgSevice from '../API/OrgSerivce';

const PostForm = (props) => {
    const [Header, setHeader] = useState('');
    const [Text, setText] = useState('');
    const [message, setMessage] = useState('');

    const CreatePost = () => {
        const body = {
            organization_id: props.organization_id,
            header: Header,
            text: Text
        };
        const {data} = OrgSevice.createPost(body);
        if(data === "Post created"){
            setHeader('');
            setText('');
            props.fetchOrgPosts()
            props.setModal(false);
        }
        else {
            props.setModal(false);
        }
    }
  return (
    <div>
        <form>
            <MyInput
                value={Header}
                onChange={e => setHeader(e.target.value)}
                type="text"
                placeholder="Header"
            />
            <MyInput
                value={Text}
                onChange={e => setText(e.target.value)}
                type="text"
                placeholder="Text"
            />
            <h3 className={classes.error_message}>{message}</h3>
            <MyButton onClick={CreatePost}>Create</MyButton>
        </form>
    </div>
  )
}

export default PostForm