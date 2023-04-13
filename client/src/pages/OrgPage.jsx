import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import EventSevice from '../API/EventService';
import OrgSevice from '../API/OrgSerivce';
import EventPreview from '../components/EventPreview';
import Post from '../components/Post';
import { useFetching } from '../hooks/useFetching';
import classes from './css/OrgPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../components/PostForm';
import ConfirmationForm  from '../components/ConfirmationForm';
// import { redirect } from "react-router-dom";
import NotificationsOffRoundedIcon from '@mui/icons-material/NotificationsOffRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';

const OrgPage = () => {

    const [organization, setOrganization] = useState({});
    const [posts, setPosts] = useState([]);
    const [randomEvents, setRandomEvents] = useState([]);
    const { id } = useParams();
    const router = useHistory();
    const User = useSelector(state => state.Auth.user);
    const [modal, setModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [postModal, setPostModal] = useState(false);
    const [isSub, setIsSub] = useState(false);

    const [fetchOrg, isOrgLoading, OrgError] = useFetching(async () => {
        try {
            const { data } = await OrgSevice.getById(id);
            setOrganization(data[0])

        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchGetSub, isGetSubLoading, getSubError] = useFetching(async () => {
        try {
            const { data } = await OrgSevice.getSub({
                user_id: User.userId,
                organization_id: organization.organization_id
            });
            console.log(window.location)
            if(data.user_id && data.organization_id){
                setIsSub(true);
            }
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchSub, isSubLoading, SubError] = useFetching(async () => {
        try {
            if(isSub){
                const { data } = await OrgSevice.deleteSub({
                    user_id: User.userId,
                    organization_id: organization.organization_id
                });
                if(data === "Sub deleted"){
                    setIsSub(false);
                }
            }
            else {
                const { data } = await OrgSevice.createSub({
                    user_id: User.userId,
                    organization_id: organization.organization_id
                });
                if(data === "Sub created"){
                    setIsSub(true);
                }
            }
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchOrgPosts, isOrgPostsLoading, OrgPostsError] = useFetching(async () => {
        try {
            const { data } = await OrgSevice.getByOrg(id);
            console.log(data)
            setPosts(data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const [fetchEvent, isEventLoading, EventError] = useFetching(async () => {
        try {
            const { data } = await EventSevice.getByOrg(organization.organization_id);
            let randomEventIdexsArr = [];
            if(data.length >= 8){
                for(let i = 0; i < data.length; i++){
                    randomEventIdexsArr.push(randomIntFromInterval(1, data.length));
                }
                // console.log(randomEventIdexsArr)
                let eventArr = [];
                for(let i = 0; i < randomEventIdexsArr.length; i++){
                    eventArr.push(data[randomEventIdexsArr[i]])
                }
                setRandomEvents(eventArr);
                // setRandomEvents(eventArr);
            }
            else {
                setRandomEvents(data);
            }
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const goTo = (link) =>{
        // console.log(link)
        // router.goBack()
        // router.push(link)
        // router.replace(link)
        // router.push("events")
        // router.go("/")
        window.location.replace(link)
        console.log(router);
        console.log(window.location);
    }
    const deleteOrg = (e) => {
        e.preventDefault();
        setPostModal(false)
        setConfirmModal(true);
        setModal(true);
    }
    const createPost = (e) => {
        e.preventDefault();
        setConfirmModal(false);
        setPostModal(true)
        setModal(true);
    }

    useEffect(() => {
        fetchOrg();
        fetchOrgPosts();
    }, []);
    useEffect(() => {
        fetchEvent();
        fetchGetSub();
    }, [organization]);

    const isAuthor = () => {
        if(organization.author_id === User.userId){
            return true;
        }
        return false;
    }

    return (
        <div>
            <MyModal visible={modal} setVisible={setModal}>
                {confirmModal 
                    ?
                        <ConfirmationForm 
                            setModal={setModal}
                            organization_id={organization.organization_id}
                        />
                    :
                        <PostForm
                            setModal={setModal}
                            fetchPosts={fetchOrgPosts}
                            organization_id={organization.organization_id}
                        />
                }
            </MyModal>
            <p className={`${classes.org_name}`}>{organization.name}</p>
            <div className={classes.org_image_container}>
                <img className={classes.org_image} src={organization.img} alt={organization.name} />
            </div>
            <div className={classes.notification_contaner}>
                {isSub 
                    ?
                    <NotificationsActiveRoundedIcon onClick={fetchSub} className={classes.notifications}/>
                    :
                    <NotificationsOffRoundedIcon onClick={fetchSub} className={classes.notifications}/>
                }
            </div>
            <p className={`${classes.org_header} ${classes.org_text}`}>About:</p>
            <p className={`${classes.org_description} ${classes.org_text}`}>{organization.description}</p>
            <p className={`${classes.org_header} ${classes.org_text}`}>Location:</p>
            <p className={`${classes.org_location} ${classes.org_text}`}>{organization.location}</p>
            <p className={`${classes.org_header} ${classes.org_text}`}>Contacts:</p>
            <p className={`${classes.org_email} ${classes.org_text}`}>{organization.email}</p>
            {organization.author_id === User.userId &&
                <MyButton onClick={(e) => deleteOrg(e)}>Delete Org</MyButton>
            }
            <p className={`${classes.org_posts}`}>Posts:</p>
            {organization.author_id === User.userId &&
                <MyButton onClick={(e) => createPost(e)}>Create Post</MyButton>
            }
            {posts.length > 0 
                ?
                <div className={classes.posts_container}>
                    {posts.reverse().map((element, index) =>
                        <Post
                            post_id={element.post_id}
                            fetchPosts={fetchOrgPosts}
                            isAuthor={isAuthor()}
                            key={element.post_id}
                            header={element.header}
                            text={element.text}
                            createdAt={element.createdAt}
                        />
                    )}
                </div>
                :
                <p className={`${classes.org_events}`}>No events yet</p>
            }
            <p className={`${classes.org_events}`}>Current events:</p>
            {randomEvents.length > 0 
                ?
                <div className={classes.events_container}>
                    {randomEvents.map((element, index) =>
                        <EventPreview 
                            adress={`http://localhost:3000/events/${element.event_id}`}
                            event={element}
                            key={element.event_id}
                            goTo = {goTo}
                        />
                    )}
                </div>
                :
                <p className={`${classes.org_events}`}>No events yet</p>
            }
        </div>

    )
}

export default OrgPage