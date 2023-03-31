import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import OrgSevice from '../API/OgrSerivce';
import OrganizationDiv from '../components/OrganizationDiv';
import { useFetching } from '../hooks/useFetching';
import classes from './css/Organizations.module.css';

const Organizations = () => {
    const [orgArr, setOrgArr] = useState([]);
    const router = useHistory();

    const [fetchOrg, isOrgLoading, OrgError] = useFetching(async () => {
        try {
            const { data } = await OrgSevice.getAll();
            console.log(data);
            setOrgArr(data)
        }
        catch (err) {
            console.log(err.response.data);
        }
    });

    useEffect(() => {
        fetchOrg();
    }, []);

    const goTo = (link) =>{
        router.push(link)
    }

    return (
        <div className={classes.organizations_container}>
            {orgArr.map((element, index) =>
                <OrganizationDiv
                    key={element.organization_id}
                    name={element.name}
                    img={element.img}
                    organization_id={element.organization_id}
                    goTo={goTo}
                // onClick={() => goTo(`organization/${element.organization_id}`)}
                />
            )}
        </div>
    )
}

export default Organizations