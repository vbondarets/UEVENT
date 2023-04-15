import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrgSevice from '../API/OrgSerivce';
import OrganizationDiv from '../components/OrganizationDiv';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import OrgForm from '../components/OrgForm'
import { useFetching } from '../hooks/useFetching';
import classes from './css/Organizations.module.css';

const Organizations = () => {
    const [orgArr, setOrgArr] = useState([]);
    const router = useHistory();
    const [modal, setModal] = useState(false);
    const isAuth = useSelector(state => state.Auth.status);

    const [fetchOrg] = useFetching(async () => {
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
        // console.log(isAuth)
    }, []);

    const goTo = (link) => {
        router.push(link)
    }

    return (
        <div>
            <MyModal visible={modal} setVisible={setModal}>
                <OrgForm 
                    setModal={setModal}
                    fetchOrg={fetchOrg}
                />
            </MyModal>
            {isAuth && 
                <div className={classes.organizations_createBtn}>
                    <MyButton onClick={async () => {setModal(true)}}>Create your organization</MyButton>
                </div>
            }
            <div className={classes.organizations_container}>
                {orgArr.map((element, index) =>
                    <OrganizationDiv
                        key={element.organization_id}
                        name={element.name}
                        img={element.img}
                        organization_id={element.organization_id}
                        email={element.email}
                        goTo={goTo}
                    // onClick={() => goTo(`organization/${element.organization_id}`)}
                    />
                )}
            </div>
        </div>
    )
}

export default Organizations