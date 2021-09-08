import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { strings } from '../../localization/localization';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useHistory } from 'react-router';

const state = {
    responsive: {
        0: {
            items: 1,
        },
        450: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
        },
    },
}

export default function LearnMoreFree() {

    const history = useHistory();

    return (
        <div className="first-page" style={{ marginBottom: '6em' }}>
            <Container className="mb-5 ">
                <Row className="mt-5 revers">
                    <Col lg={6} md={6} xs={12}>
                        <h1 className="mb-3 h1-title" style={{ marginTop: '2em' }}>Freelancing {strings.on} <span style={{ color: '#ffb000' }}>{strings.sahakka}</span></h1>
                        <p>{strings.desInHomepage}</p>
                        <div className="float-start">
                            <NavLink to="/login">
                                <Button className="me-4 draft" variant="warning">{strings.startWorking}</Button>
                            </NavLink>
                        </div>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <img className="image-tl" src="./assets/freelancer_pro/banner-human.png" alt="Feed img" width="100%" />
                    </Col>
                </Row>
                <h2 className="text-center my-5">{strings.startFreeIn}<span style={{ color: '#ffb000' }}> {strings.steps}</span></h2>
                <Row className="sample-steps">
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/freelancer_pro/sample2.png" width="30%" alt="no img show" />
                        <h6 className=" text-center mt-3">{strings.createYourProfile}</h6>
                        <p>{strings.createYourProfileDis}</p>
                    </Col>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/freelancer_pro/sample1.png" width="30%" alt="no img show" />
                        <h6 className=" text-center mt-3">{strings.exploreProjects}</h6>
                        <p>{strings.exploreProjectsDis}</p>
                    </Col>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/freelancer_pro/sample3.png" width="30%" alt="no img show" />
                        <h6 className="text-center mt-3">{strings.workEarn}</h6>
                        <p>{strings.workEarnDis}</p>
                    </Col>
                </Row>
                <h3 className="my-5">{strings.exploreTheCategories}</h3>
                {/* ------------Explore category------------- */}
                <div className="owl-section">
                    <OwlCarousel
                        className="owl-theme"
                        loop margin={10} nav
                        autoplay={true}
                        items={5}
                        autoplayTimeout={2000}
                        dots={false}
                        responsive={state.responsive}
                        autoplayTimeout={1500}
                    >
                        <div class="item">
                            <div className="category-type" onClick={() => history.push("/project/backend_development")}>
                                <p>BackEnd Development</p>
                            </div>
                            <img src="./assets/popular/p1.jpg" width="60" alt="owl" height="300" />
                        </div>
                        <div class="item">
                            <div className="category-type" onClick={() => history.push("/project/web_development")}>
                                <p>Web & Mobile Design</p>
                            </div>
                            <img src="./assets/popular/p2.jpg" width="60" alt="owl" height="300" />
                        </div>
                        <div class="item">
                            <div className="category-type" onClick={() => history.push("/project/game_design")}>
                                <p>Game Design</p>
                            </div>
                            <img src="./assets/popular/p3.jpg" width="60" alt="owl" height="300" />
                        </div>
                        <div class="item">
                            <div className="category-type" onClick={() => history.push("/project/logo_design")}>
                                <p>Logo Design</p>
                            </div>
                            <img src="./assets/popular/p4.jpg" width="60" alt="owl" height="300" />
                        </div>
                        <div class="item">
                            <div className="category-type" onClick={() => history.push("/project/application_development")}>
                                <p>Android Application Developement</p>
                            </div>
                            <img src="./assets/popular/p5.jpg" width="60" alt="owl" height="300" />
                        </div>
                        <div class="item">
                            <div className="category-type" onClick={() => history.push("/project/all")}>
                                <p>{strings.all}</p>
                            </div>
                            <img src="./assets/popular/p4.jpg" width="60" height="300" />
                        </div>
                    </OwlCarousel>
                </div>
            </Container>
        </div>
    )
}
