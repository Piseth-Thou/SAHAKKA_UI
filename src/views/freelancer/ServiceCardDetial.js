import React, { useEffect } from 'react'
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { strings } from '../../localization/localization'
import { StarFilled, FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { onFetchPostsById } from '../../redux/actions/postAction';
import { Img } from 'react-image'
import { Spin } from 'antd'

function ServiceCardDetial() {

    let param = useParams();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.postReducer)
    const history = useHistory();

    console.log("Post", posts);
    useEffect(() => {
        dispatch(onFetchPostsById(param.id));
    }, []);


    return (
        !isLoading ?
            posts && posts.map((detail) => {
                return (
                    <div className="post-detail">
                        <Container>
                            <Row className="my-5 revers">
                                <Col xl={3} lg={4} md={12} sm={12} xs={12}>
                                    <Row>
                                        <Col xl={12} lg={12} md={6}>
                                            <h5 className="published-by">{strings.publishedBy}</h5>
                                            <div className="posted-by mt-4">
                                                <div className="d-flex">
                                                    <div className="profile-thumbnail">
                                                        <Img src={[`${detail.user.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']} alt=".." />
                                                    </div>
                                                    <div>
                                                        <h6>{detail.user.username}</h6>
                                                        <span style={{ fontSize: '13px', color: '#ffb000' }}>{detail.user.skills === "" ? "No skill show" : detail.user.skills}</span>
                                                        <p><StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '2px' }} /> <span style={{ marginLeft: '20px' }}>5.0({detail.number_of_review})</span></p>
                                                    </div>
                                                </div>
                                                <p>{detail.user.bio === "" ? "No bio show" : detail.user.bio} </p>
                                                <div className="socail-medai">
                                                    <FacebookOutlined style={{ fontSize: '25px', color: '#3b5998' }} />
                                                    <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-30deg)' }} />
                                                    <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2' }} />
                                                    <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5' }} />
                                                </div>
                                                <Button onClick={() => history.push('/profile/' + detail.user.user_id)} variant="warning">{strings.viewProfile}</Button>
                                            </div>
                                        </Col>
                                        <Col xl={12} lg={12} md={6}>
                                            <div className="addi-sec">
                                                <h5 className="my-4">{strings.additionalInformation}</h5>
                                                <div className="addi-info">
                                                    <div className="d-flex">
                                                        <img className="float-end me-4" src="../assets/freelancer_pro/phone.png" height="35px" alt=".." />
                                                        <p><b>{strings.telephone}</b><br />{detail.user.telephone === "" ? "No phone show" : detail.user.telephone}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <img className="float-end me-4" src="../assets/freelancer_pro/mail.png" height="35px" alt=".." />
                                                        <p><b>{strings.officailEmail}</b><br />{detail.user.official_email === "" ? "No email show" : detail.user.official_email}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <img className="float-end me-4" src="../assets/freelancer_pro/location.png" height="35px" alt=".." />
                                                        <p><b>{strings.address}</b><br />{detail.user.location === null || "" ? "No location show" : detail.user.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={9} lg={8} md={12} sm={12} xs={12}>
                                    <div className="post-cover  my-5">
                                        <Img src={[`${detail.post_image}`, ' https://i.stack.imgur.com/y9DpT.jpg']} alt=".." width="100%" />
                                    </div>
                                    <div className="des mt-5">
                                        <p><b>{detail.title === "" ? "No title show" : detail.title}</b></p>
                                        {
                                            detail.service_post_categories && detail.service_post_categories.map((cat) =>
                                                <Button variant="warning">{cat}</Button>
                                            )
                                        }<br /><br />
                                        <p>{detail.post_description === "" ? "No description show" : detail.post_description}</p>
                                        <p><StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '2px' }} /> <span style={{ marginLeft: '20px' }}>4.5(127)</span></p>
                                    </div>
                                </Col>
                            </Row>
                            {/* <Row className="review">
                                <Col lg={2} md={2}></Col>
                                <Col lg={10} md={10}>
                                    <b> {detail.servicePostReview.length} {strings.reviews}</b>
                                    {
                                        detail.servicePostReview && detail.servicePostReview.map((com) => {
                                            return (
                                                <div className="comment d-flex mt-4">
                                                    <div className="profile-reviewer">
                                                        <Img src={[`${com.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']} alt=".." />
                                                    </div>
                                                    <div>
                                                        <div className="d-flex">
                                                            <h6>{com.username === "" ? "No name" : com.username}</h6>
                                                            <p className="ms-3">
                                                                <StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '4px' }} />
                                                                <span style={{ marginLeft: '20px' }}>{com.number_of_stars === null || "" ? 0 : com.number_of_stars}</span>
                                                            </p>
                                                        </div>
                                                        <p className="post-date" style={{ marginTop: '-13px' }}>{strings.posted} : {com.review_date === "" || null ? "no date show" : com.review_date}</p>
                                                        <p>
                                                            {com.review_text === "" ? "No text" : com.review_text}
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
            })
            : <div className="text-center mt-5">
                <Spin tip="Loading..." style={{ color: '#ffb000', height: '200px', marginTop: '10em' }}></Spin>
            </div>
    )
}

export default ServiceCardDetial
