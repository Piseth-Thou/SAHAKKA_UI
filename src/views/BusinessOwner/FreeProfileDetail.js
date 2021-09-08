import React, { useEffect } from 'react'
import './styles.css'
import FreeCard from '../../components/BusinessOwner/FreeCard'
import { Tabs, Spin } from 'antd'
import { Col, Container, Row } from 'react-bootstrap'
import Media from 'react-media'
import { strings } from '../../localization/localization'
import {
    FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { onFetchFreelancerById } from '../../redux/actions/accountAction';
import { useParams, useHistory } from 'react-router'
import { Img } from 'react-image'

const { TabPane } = Tabs;

function FreeProfileDetail() {

    let param = useParams();
    const dispatch = useDispatch();
    const { accounts, isLoading } = useSelector((state) => state.accoutReducer)

    useEffect(() => {
        dispatch(onFetchFreelancerById(param.id));
    }, []);

    // console.log("Account ==> : ", accounts);

    return (
        <>
            {
                !isLoading ?
                    accounts && accounts.map((acc) => {
                        const experience = acc.user.work_experience && acc.user.work_experience.split("\n")
                        const edBackround = acc.user.educational_background && acc.user.educational_background.split("\n")
                        const achivce = acc.user.achievement && acc.user.achievement.split("\n")

                        return (
                            <div className="profile-detail">
                                <div className="cover">
                                    <Img
                                        src={["../assets/freelancer_pro/cover.png", '../assets/freelancer_pro/cover.png']}
                                        width="100%"
                                    />
                                </div>
                                <Container>
                                    <Media query={{ maxWidth: 480 }}>
                                        {matches =>
                                            matches ? (
                                                <>
                                                    <div className="profile">
                                                        <Img src={[`${acc.user.profile_image}`, '../assets/freelancer_pro/no-pro.png']} />
                                                    </div>
                                                    <Row>
                                                        <Col sm={12} xs={12} className="mt-3 text-center">
                                                            <h4>{acc.user.username === "" ? <h4>No name show</h4> : acc.user.username}</h4>
                                                            <p style={{ fontSize: '14px', color: '#ffb000' }}>{acc.user.skill === "" ? <p>No skill show</p> : acc.user.skill}</p>
                                                        </Col>
                                                        <p className="text-center">{acc.user.bio === " " ? <p>No Bio show</p> : acc.user.bio}</p>
                                                    </Row>
                                                </>
                                            ) : (
                                                <Row>
                                                    <Col xl={2} lg={3} md={3}>
                                                        <div className="profile">
                                                            <Img src={[`${acc.user.profile_image}`, '../assets/freelancer_pro/no-pro.png']} />
                                                        </div>
                                                    </Col>
                                                    <Col xl={8} lg={7} md={9} className="mt-3">
                                                        <h4>{acc.user.username === "" ? <h4>No name show</h4> : acc.user.username}</h4>
                                                        <p style={{ fontSize: '14px', color: '#ffb000' }}>{acc.user.skill === "" ? <p>No skill show</p> : acc.user.skill}</p>
                                                        <p>{acc.user.bio === " " ? <p>No Bio show</p> : acc.user.bio}</p>
                                                    </Col>
                                                </Row>
                                            )}
                                    </Media>
                                    {/* ............... */}
                                    <Row className="mt-4">
                                        <Col xl={3} lg={4} md={12} sm={12} xs={12}>
                                            <Row>
                                                <Col xl={12} lg={12} md={6}>
                                                    <h5 className="mb-3">{strings.contactInfo}</h5>
                                                    <div className="contact-info">
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/phone.png" height="35px" alt=".." />
                                                            <p><b>{strings.telephone}</b><br />{acc.user.telephone === "" ? "No telephone show" : acc.user.telephone}</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/mail.png" height="35px" alt=".." />
                                                            <p><b>{strings.officailEmail}</b><br />{acc.user.official_email === " " ? "No official email show" : acc.user.official_email}</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/location.png" height="35px" alt=".." />
                                                            <p><b>{strings.address}</b><br />{acc.user.location === null ? "No location show" : acc.user.location}</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/nation.png" height="35px" alt=".." />
                                                            <p><b>{strings.nationality}</b><br />{acc.user.nationality === null ? "No nationality show" : acc.user.nationality}</p>
                                                        </div>
                                                        <div className="d-flex">
                                                <img className="float-end me-4" src="../assets/freelancer_pro/globle.png" height="35px" alt=".." />
                                                <p><b>{strings.language}</b><br />{acc.user.languages === null ? "No language show" : acc.user.languages}</p>
                                            </div>
                                                        <div className="socail-medai">
                                                            <FacebookOutlined style={{ fontSize: '25px', color: '#3b5998', cursor: 'pointer' }} />
                                                            <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)', cursor: 'pointer' }} />
                                                            <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2', cursor: 'pointer' }} />
                                                            <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5', cursor: 'pointer' }} />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={12} lg={12} md={6}>
                                                    {/* ..........Experiences & Achivement........... */}
                                                    <Tabs type="card" className="mt-4 ex-ac">
                                                        <TabPane tab={strings.experiences} key="1">
                                                            <div className="experience">
                                                                {acc.user.work_experience === "" ? "No experience show" :
                                                                    experience?.map((ex) => <li>{ex}</li>)
                                                                }
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tab={strings.achievement} key="2">
                                                            <div className="achivement">{acc.user.achievement === "" ? "No achievement show" :
                                                                achivce?.map((ac) => <li>{ac}</li>)
                                                            }
                                                            </div>
                                                        </TabPane>
                                                    </Tabs>
                                                </Col>
                                                <Col xl={12} lg={12} md={12}>
                                                    {/* -------------Educational Background----------------- */}
                                                    <h5 className="mb-3 mt-4">{strings.educationalBackground}</h5>
                                                    <div className="education">
                                                        {acc.user.educational_background === "" ? "No achievement show" :
                                                            edBackround?.map((ed) => <li style={{ listStyle: 'none' }}>{ed}</li>)
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={9} lg={8} md={12} sm={12} xs={12}>
                                            <Row style={{ marginTop: '2.7em', marginBottom: '2.7em' }}>
                                                {acc.servicePost && acc.servicePost.map((post) => {
                                                    return (
                                                        <Col xl={4} lg={6} md={6}>
                                                            <FreeCard post={post} />
                                                            <br /></Col>
                                                    )
                                                }
                                                )}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    }) :
                    <div className="text-center mt-5">
                        <Spin tip="Loading..." style={{ color: '#ffb000',height:'200px',marginTop:'10em' }}></Spin>
                    </div>
            }
        </>
    )
}

export default FreeProfileDetail
