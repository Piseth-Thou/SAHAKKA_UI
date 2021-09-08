import React, { useState, useEffect } from 'react'
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {
    StarFilled, FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined
} from '@ant-design/icons'
import CopComment from '../../components/Comment'
import { strings } from '../../localization/localization'
import { useDispatch, useSelector } from 'react-redux';
import { onFetchPostsById } from '../../redux/actions/postAction';
import { useParams, useHistory } from 'react-router'
import { Img } from 'react-image'
import { Spin } from 'antd'

function FreeCardDetail() {

    let param = useParams();
    const dispatch = useDispatch();
    const { posts , isLoading } = useSelector((state) => state.postReducer)
    const history = useHistory();

    // console.log("Post", post);
    useEffect(() => {
        dispatch(onFetchPostsById(param.id));
    }, []);

    //  console.log('Post Id', post.posts);

    return (

        <>
            {
                !isLoading ?
                    posts && posts.map((value) => {
                        return (
                            <div className="post-detail">
                                <Container>
                                    <Row className="my-5 revers">
                                        <Col xl={3} lg={4} md={12} sm={12} xs={12}>
                                            <Row>
                                                <Col xl={12} lg={12} md={6} sm={12} xs={12}>
                                                    <h5 className="published-by">{strings.publishedBy}</h5>
                                                    <div className="posted-by mt-4">
                                                        <div className="d-flex">
                                                            <div className="profile-thumbnail">
                                                                <Img
                                                                    src={[`${value.user && value.user.profile_image}`, '../assets/freelancer_pro/no-pro.png']}
                                                                />
                                                            </div>
                                                            <div>
                                                                <h6>{value.user && value.user.username === "" ? "No Name Show" : value.user && value.user.username}</h6>
                                                                <span style={{ fontSize: '13px', color: '#ffb000' }}> Full stack developer </span>
                                                                <p><StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '2px' }} /> <span style={{ marginLeft: '20px' }}>5.0(20)</span></p>
                                                            </div>
                                                        </div>
                                                        <p style={{ fontSize: '15px' }}> {value.user && value.user.bio === "" ? "No bio show" : value.user && value.user.bio} </p>
                                                        <div className="socail-medai">
                                                            <FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer' }} />
                                                            <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer' }} />
                                                            <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer' }} />
                                                            <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer' }} />
                                                        </div>
                                                        <div onClick={() => history.push('/freelancer_profile_detail/' + value.user.user_id)}><Button variant="warning">{strings.viewProfile}</Button></div>
                                                    </div>
                                                </Col>
                                                <Col xl={12} lg={12} md={6} sm={12} xs={12}>
                                                    <div className="addi-sec">
                                                        <h5 className="my-4">{strings.additionalInformation}</h5>
                                                        <div className="addi-info">
                                                            <div className="d-flex">
                                                                <img className="float-end me-4" src="../assets/freelancer_pro/phone.png" height="35px" alt=".." />
                                                                <p><b>{strings.telephone}</b><br />{value.user && value.user.telephone === "" ? "No Phone show" :value.user && value.user.telephone}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <img className="float-end me-4" src="../assets/freelancer_pro/mail.png" height="35px" alt=".." />
                                                                <p><b>{strings.officailEmail}</b><br />{value.user && value.user.official_email === "" ? "No Email show" :value.user && value.user.official_email}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <img className="float-end me-4" src="../assets/freelancer_pro/location.png" height="35px" alt=".." />
                                                                <p><b>{strings.address}</b><br />{value.user && value.user.location === null ? "No Location show" :value.user && value.user.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={9} lg={8} md={12} sm={12} xs={12}>
                                            <div className="post-cover  my-5">
                                                <Img
                                                    src={[`${value.post_image}`, 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png']}
                                                />
                                            </div>
                                            <div className="des mt-5">
                                                <p><b>{value.title === "" ? <b>No Title </b> : value.title}</b></p>
                                                {
                                                    value.service_post_categories && value.service_post_categories.length === 0 ? <Button variant="warning" >No Category show</Button> :
                                                        value.service_post_categories && value.service_post_categories.map((cat) =>
                                                            <Button variant="warning" className="me-2 mb-2">{cat}</Button>
                                                        )
                                                }<br/><br/>
                                                <p>{value.post_description === "" ? "No Description" : value.post_description}</p>
                                                <p><StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '2px' }} /> <span style={{ marginLeft: '20px' }}>4.5(127)</span></p>
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* <Row className="review">
                                        <Col lg={2} md={2}></Col>
                                        <Col lg={10} md={10}>
                                            <b>{value.number_of_review} {strings.reviews}</b>
                                            <CopComment />
                                            {
                                                value.servicePostReview && value.servicePostReview.map((viewer) => {
                                                    return (
                                                        <div className="comment d-flex mt-4">
                                                            <div className="profile-reviewer">
                                                                <Img
                                                                    src={[`${viewer.profile_image}`, '../assets/freelancer_pro/no-pro.png']}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="d-flex">
                                                                    <h6>{viewer.username === "" ? "No name show" : viewer.username}</h6>
                                                                    <p className="ms-3">
                                                                        <StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '4px' }} /> <span style={{ marginLeft: '20px' }}>{viewer.number_of_star}</span>
                                                                    </p>
                                                                </div>
                                                                <p className="post-date" style={{ marginTop: '-13px' }}>{strings.posted} : {viewer.review_date}</p>
                                                                <p>
                                                                    {viewer.review_text === "" ? "No comment" : viewer.review_text}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Col>
                                    </Row> */}
                                </Container>
                            </div>
                        )
                    }
                    )
                    :
                    <div className="text-center mt-5">
                        <Spin tip="Loading..." style={{ color: '#ffb000',height:'200px',marginTop:'10em' }}></Spin>
                    </div>
            }
        </>
    )
}

export default FreeCardDetail
