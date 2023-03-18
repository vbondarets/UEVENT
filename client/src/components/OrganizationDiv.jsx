import React from 'react';
import classes from './css/OrganizationDiv.module.css'

const OrganizationDiv = (props) => {
  return (
    <div className={classes.organization_container}>
        <div className={classes.organization_img_container}>
            <img className={classes.organization_img} src={props.img} alt={`${props.name} img`}/>
        </div>
        <p className={classes.organization_name}>{props.name}</p>
    </div>
  )
}

export default OrganizationDiv