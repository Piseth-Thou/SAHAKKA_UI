import React, { useEffect } from 'react'
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import { LikeOutlined, CommentOutlined, FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import CopComment from '../../components/Comment'
import { strings } from '../../localization/localization'
import { useDispatch, useSelector } from 'react-redux'
import { onFetchProjectPostByID, onFetchProjectPosts } from '../../redux/actions/projectPostAction'
import { Img } from 'react-image'
import { Spin } from 'antd'

function BsCardDetail() {
    let param = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectPost, isLoading } = useSelector(state => state.projectPostReducer)

    useEffect(() => {
        dispatch(onFetchProjectPostByID(param.id))
    }, [])

    console.log("projectPost by ID : ", projectPost)

    return (
        <>
            {
                !isLoading ?
                    projectPost && projectPost.map((value) => {
                        const descriptions = value.description.split('\n')
                        return (
                            <div className="post-detail bs-card-detail">
                                <Container>
                                    <div className="post-cover  my-4">
                                        <Img src={[`${value.postImage}`, "https://i.stack.imgur.com/y9DpT.jpg"]} alt=".." width="100%" />
                                    </div>
                                    <Row className="my-5 revers">
                                        <Col xl={3} lg={4} md={12} sm={12} xs={12}>
                                            <Row>
                                                <Col xl={12} lg={12} md={6}>
                                                    <h5 className="published-by">{strings.publishedBy}</h5>
                                                    <div className="posted-by mt-4">
                                                        <div className="d-flex mb-2">
                                                            <div className="profile-thumbnail">
                                                                <Img src={[`${value.user && value.user.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']} alt=".." />
                                                            </div>
                                                            <h6 className="mt-3 ms-1">
                                                                {value.user && value.user.username}<br />
                                                                <a onClick={() => history.push('/bs_profile/' + value.user.user_id)} style={{ fontSize: '12px', fontWeight: '400', color: '#ffb000', textDecoration: 'none' }}>
                                                                    <span>{strings.viewProfile}</span>
                                                                </a>
                                                            </h6>
                                                        </div>
                                                        <p style={{ marginLeft: '4em', padding: '8px' }}>
                                                            {/* {value.user && value.user.bio === "" ? "No bio show" : value.user.bio} */}
                                                        </p>
                                                        <div className="socail-medai">
                                                            <FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer' }} />
                                                            <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer' }} />
                                                            <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer' }} />
                                                            <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer' }} />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={12} lg={12} md={6}>
                                                    <div className="addi-sec">
                                                        <h5 className="my-4">{strings.additionalInformation}</h5>
                                                        <div className="addi-info">
                                                            <div className="d-flex">
                                                                <img className="float-end me-4" src="../assets/freelancer_pro/public.png" alt=".." />
                                                                <p><b>{strings.publishedDate}</b><br />{value.createDate === "" ? "No date show" : value.createDate}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <img className="float-end me-4" src="../assets/freelancer_pro/deadline.png" alt=".." />
                                                                <p><b>{strings.deadLine}</b><br />{value.postDeadline === "" ? "No date show" : value.postDeadline}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <img className="float-end me-4" src="../assets/freelancer_pro/location.png" alt=".." />
                                                                <p><b>{strings.location}</b><br />Phnom Penh , Cambodia</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={9} lg={8} md={12} sm={12} xs={12}>
                                            <div className="des mt-5">
                                                <p><b>{value.title && value.title === "" ? "No title show" : value.title}</b></p>
                                                {
                                                    value.categories && value.categories.length === 0 ? <Button variant="warning">No category show</Button> :
                                                        value.categories && value.categories.map((cat) =>
                                                            <Button variant="warning">{cat}</Button>
                                                        )
                                                }<br /><br />
                                                <p>{value.description === "" ? "No descrition show" : 
                                                    descriptions.map((des)=><li style={{listStyle:'none'}}>{des}</li>)
                                                }</p>
                                                <div className="d-flex mt-4">
                                                    <p className="me-5"><LikeOutlined style={{ fontSize: '25px', verticalAlign: 'text-bottom' }} /> {value.likes === null || "" ? 0 : value.likes} Likes</p>
                                                    {/* <p><CommentOutlined style={{ fontSize: '25px', verticalAlign: 'text-bottom' }} /> {value.comments && value.comments.length} Comments</p> */}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* <Row className="review">
                                        <Col lg={2} md={2}></Col>
                                        <Col lg={10} md={10}>
                                            <b>{value.comments && value.comments.length} {strings.reviews}</b>
                                            <CopComment />
                                            {
                                                value.comments && value.comments.map((com) => {
                                                    return (
                                                        <div className="comment d-flex mt-4">
                                                            <div className="profile-reviewer">
                                                                <Img src={[`${com.user.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']} alt=".." />
                                                            </div>
                                                            <div>
                                                                <h6>{com.user.username}</h6>
                                                                <p className="post-date">{strings.posted} : {com.created_date === "" ? "No date show" : com.created_date}</p>
                                                                <p>{com.comment_text === "" ? "No comment show " : com.comment_text}</p>
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
                        <Spin tip="Loading..." style={{ color: '#ffb000', height: '200px', marginTop: '10em' }}></Spin>
                    </div>
            }
        </>
    )
}

export default BsCardDetail
