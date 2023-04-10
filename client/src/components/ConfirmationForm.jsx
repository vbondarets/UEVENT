import React from 'react';
import MyButton from './UI/button/MyButton';
import classes from './css/confirmationForm.module.css';
import OrgSevice from '../API/OrgSerivce';
import { useHistory } from 'react-router-dom';

const ConfirmationForm = (props) => {

    const router = useHistory();

    const deleteOrg = async(e) =>{
        e.preventDefault();
        const {data} = await OrgSevice.delete(props.organization_id);
        if(data === "Organization delited"){
            props.setModal(false);
            router.goBack();
        }
        else {
            props.setModal(false);
        }
    }
    const close = (e) =>{
        e.preventDefault();
        props.setModal(false)
    }
  return (
    <div>
        <h2 className={classes.text}>Are you sure?</h2>
        <div className={classes.button_container}>
            <MyButton onClick={(e) => deleteOrg(e)}>Yes</MyButton>
            <MyButton onClick={(e) => close(e)}>No</MyButton>
        </div>
    </div>
  )
}

export default ConfirmationForm