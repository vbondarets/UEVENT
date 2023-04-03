import React, { useEffect, useState } from 'react';
import EventSevice from '../API/EventService';
import { useFetching } from '../hooks/useFetching';
import classes from './css/OrganizationDiv.module.css'

const OrganizationDiv = (props) => {
  const [eventCount, setEventCount] = useState(0);

  const [fetchEvent, isEventLoading, EventError] = useFetching(async () => {
    try {
      const { data } = await EventSevice.getByOrg(props.organization_id);
      setEventCount(data.length);
    }
    catch (err) {
      console.log(err.response.data);
    }
  });
  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div
      className={classes.organization_container}
      onClick={() => props.goTo(`organizations/${props.organization_id}`)}
    >
      <div className={classes.organization_img_container}>
        <img className={classes.organization_img} src={props.img} alt={`${props.name} img`} />
      </div>
      <p className={classes.organization_name}>{props.name}</p>
      {props.email &&
        <div>
          <p className={classes.organization_text}>{props.email}</p>
          <p className={classes.organization_text}>Events count: {eventCount}</p>
        </div>
      }
    </div>
  )
}

export default OrganizationDiv