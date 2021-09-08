import React from 'react'
import './styles.css'
import { Container, Row, Col } from 'react-bootstrap'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import { strings } from '../../localization/localization';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <div className="first-page about-us">
            <Container>
                <Row className="my-5">
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <div className="logo-img">
                            <img src="./assets/freelancer_pro/logo-about.png" alt="Feed img" width="100%" />
                        </div>
                    </Col>
                    <Col lg={9} md={9} sm={12} xs={12}>
                        <h1 className="my-5">{strings.welcomeTo}<span style={{ color: '#ffb000' }}> {strings.sahakka}</span></h1>
                        <p>
                            {strings.desInHomepage}
                        </p>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col lg={5} md={5} sm={12} xs={12}>
                        <img className="image-tr" src="./assets/freelancer_pro/about2.png" alt="Feed img" width="100%" height="250vh" />
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12}>
                        <div className="p-5 pt-0 our-story">
                            <h3 className=" mb-2">{strings.ourStory}</h3>
                            <div className=" mb-5 cus-border-button"></div>
                            <p>{strings.ourStoryDis}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-5 revers">
                    <Col lg={7} md={7} sm={12} xs={12}>
                        <div className="p-5 pt-0 ps-0 our-mission">
                            <h3 className=" mb-2">{strings.ourMission}</h3>
                            <div className=" mb-5 cus-border-button"></div>
                            <p>{strings.ourMissionDis}</p>
                        </div>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12}>
                        <img className="image-tl" src="./assets/freelancer_pro/about-mission.png" alt="Feed img" width="100%" height="250vh" />
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col lg={5} md={5} sm={12} xs={12}>
                        <img className="image-tr" src="./assets/freelancer_pro/about-vision.png" alt="Feed img" width="100%" height="250vh" />
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12}>
                        <div className="p-5 pt-0 our-vision">
                            <h3 className=" mb-2">{strings.ourVision}</h3>
                            <div className=" mb-5 cus-border-button"></div>
                            <p>{strings.ourVisionDis}</p>
                        </div>
                    </Col>
                </Row>
                <div className="text-center">
                    <h2 className="our-team-header">{strings.ourTeam}</h2>
                </div>
                <div className="our-team">
                    <Row className="mb-5">
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <img className="profile" src="./assets/our-team/keo.png" style={{ height: '250px' }} alt="Feed img" />
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={12}>
                            <h3 className=" mb-2" style={{ color: '#ffb000' }}>Kay Keo</h3>
                            <b className="mb-3">PROJECT LEADER</b>
                            <div className=" mt-3 cus-border-button-team"></div>
                            <div className="social-media mt-3">
                              <a href="https://www.facebook.com/profile.php?id=100009996454316" target="_blank"><FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer' }} className="px-2"  /></a> 
                                <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer' }} className="px-2" />
                                <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer' }} className="px-2" />
                                <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer' }} className="px-2" />
                            </div>
                            <p className="mt-4">
                            {strings.keoBio}
                            </p>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row className="mb-5 revers">
                        <Col lg={8} md={8} sm={12} xs={12}>
                            <div>
                                <h3 className=" mb-2" style={{ color: '#ffb000' }}>Leng Chhinghor</h3>
                                <b className="mb-3">DEVELOPER</b>
                                <div className=" mt-3 cus-border-button-team">
                                </div>
                                <div className="social-media mt-3">
                                   <a href="https://www.facebook.com/stom.sharow" target="_blank"><FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer',cursor:'pointer' }} className="px-2" /></a> 
                                    <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer',cursor:'pointer' }} className="px-2" />
                                    <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer',cursor:'pointer' }} className="px-2" />
                                    <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer',cursor:'pointer' }} className="px-2" />
                                </div>
                                <p className="mt-4">
                                {strings.horBio}
                                </p>
                                <hr></hr>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <img className="profile" src="./assets/our-team/chhinghor-circle.png" style={{ height: '250px', float: "right" }} alt="Feed img" />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <img className="profile" src="./assets/our-team/sengtit.png" style={{ height: '250px' }} alt="Feed img" />
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={12}>
                            <h3 className=" mb-2" style={{ color: '#ffb000' }}>Tray Sengtit</h3>
                            <b className="mb-3">DEVELOPER</b>
                            <div className=" mt-3 cus-border-button-team"></div>
                            <div className="social-media mt-3">
                               <a href="https://www.facebook.com/profile.php?id=100025297791332" target="_blank"><FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer' }} className="px-2" /></a> 
                                <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer' }} className="px-2" />
                                <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer' }} className="px-2" />
                                <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer' }} className="px-2" />
                            </div>
                            <p className="mt-4">
                            {strings.titBio}
                            </p>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row className="mb-5 revers">
                        <Col lg={8} md={8} sm={12} xs={12}>
                            <div>
                                <h3 className=" mb-2" style={{ color: '#ffb000' }}>Chiv Kimchhor</h3>
                                <b className="mb-3">DEVELOPER</b>
                                <div className=" mt-3 cus-border-button-team">
                                </div>
                                <div className="social-media mt-3">
                                  <a href="https://www.facebook.com/profile.php?id=100007796627194" target="_blank"><FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer' }} className="px-2" /></a>  
                                    <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer' }} className="px-2" />
                                    <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer' }} className="px-2" />
                                    <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer' }} className="px-2" />
                                </div>
                                <p className="mt-4">
                                {strings.chhorBio}
                                </p>
                                <hr></hr>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <img className="profile" src="./assets/our-team/kimchhor.png" style={{ height: '320px', float: 'right' }} alt="Feed img" />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <img className="profile" src="./assets/our-team/piseth.png" style={{ height: '250px' }} alt="Feed img" />
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={12}>
                            <h3 className=" mb-2" style={{ color: '#ffb000' }}>Thou Piseth</h3>
                            <b className="mb-3">DEVELOPER</b>
                            <div className=" mt-3 cus-border-button-team"></div>
                            <div className="social-media mt-3">
                             <a href="https://www.facebook.com/ThouPiseth14" target="_blank"><FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer' }} className="px-2" /></a>   
                                <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer' }} className="px-2" />
                                <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer' }} className="px-2" />
                                <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer' }} className="px-2" />
                            </div>
                            <p className="mt-4">
                            {strings.sethBio}
                            </p>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row className="mb-5 revers">
                        <Col lg={8} md={8} sm={12} xs={12} >
                            <div>
                                <h3 className=" mb-2" style={{ color: '#ffb000' }}>Kung Porleas</h3>
                                <b className="mb-3">DEVELOPER</b>
                                <div className=" mt-3 cus-border-button-team">
                                </div>
                                <div className="social-media mt-3">
                                   <a href="https://www.facebook.com/polorskong.polorskong" target="_blank"><FacebookOutlined style={{ fontSize: '25px', color: '#3b5998',cursor:'pointer' }} className="px-2" /></a> 
                                    <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)',cursor:'pointer' }} className="px-2" />
                                    <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2',cursor:'pointer'}} className="px-2" />
                                    <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5',cursor:'pointer' }} className="px-2" />
                                </div>
                                <p className="mt-4">
                                {strings.porleasBio}
                                </p>
                                <hr></hr>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <img className="profile" src="./assets/our-team/porlors.png" style={{ height: '320px', float: "right" }} alt="Feed img" />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}
