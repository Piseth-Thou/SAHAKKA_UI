import React, { useEffect } from 'react'
import './styles.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { onFetchOwnerGetAllPost, onFetchOwnerGetAllPostPending, onFetchOwnerGetAllPostDraft } from '../../redux/actions/postAction';
import { Tabs } from 'antd';
import CardProject from '../../components/BusinessOwner/CardProject';
import { NavLink } from 'react-router-dom';
import { strings } from '../../localization/localization'
import ExploreCate from '../../components/ExploreCate';
import { useRef } from 'react';
import { header } from '../../utils/header';


const { TabPane } = Tabs;
const Feed = () => {

    const user = useRef({})
    user.current = JSON.parse(localStorage.getItem("user"));
    console.log(" HEADER : ", header())

    const state = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(onFetchOwnerGetAllPost());
        dispatch(onFetchOwnerGetAllPostPending());
        dispatch(onFetchOwnerGetAllPostDraft());
    }, []);

    console.log("ownerGetAllPost", state.ownerGetAllPost)
    // // console.log(state.ownerGetAllPostPending)
    // // console.log(state.ownerGetAllPostDraft)


    return (
        <div className="bu-feed">
            <Container>
                <Row className="my-5 revers">
                    <Col lg={6} md={6}>
                        <h2 className="mt-5 h1-title">{strings.welcome} {user.current.username} ! </h2>
                        <p className="my-4">{strings.desInFeedBusiness}</p>
                        <NavLink to="/post_project">
                            <Button variant="warning">{strings.postProject}</Button>
                        </NavLink>
                    </Col>
                    <Col lg={6} md={6}>
                        <img className="image-tl" src="./assets/business_img/cover-img.png" width="100%" alt="cover" />
                    </Col>
                </Row>
                <h5 className="my-5">{strings.projectDashboard}</h5>
                <Tabs type="card">
                    <TabPane tab={strings.project} key="1">
                        {state.ownerGetAllPost.map((value) =>
                            value.payload.map((val) => <><CardProject ownerGetAllPosts={val} /><br /></>)
                        )}
                    </TabPane>
                    <TabPane tab={strings.pending} key="2" className="pending">
                        {state.ownerGetAllPostPending.map((value) =>
                            value.payload.map((val) => <><CardProject ownerGetAllPosts={val} /><br /></>)
                        )}
                    </TabPane>
                    <TabPane tab={strings.draft} key="3" className="draft">
                        {state.ownerGetAllPostDraft.map((value) =>
                            value.payload.map((val) => <><CardProject ownerGetAllPosts={val} /><br /></>)
                        )}
                    </TabPane>
                </Tabs>
                <br/>
                {/* Categories Owl carousel */}
                <h5 className="mb-5">{strings.exploreTheCategories}</h5>
                <div className="categories">
                    <ExploreCate />
                </div>
            </Container>
        </div>
    );
};

export default Feed;