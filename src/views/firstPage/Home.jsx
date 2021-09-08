import React, { useEffect, useState } from 'react';
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { strings } from '../../localization/localization';
import ExploreCate from '../../components/ExploreCate';


export default function Home() {
    return (
        <div className="first-page">
            <Container className="py-5">
                <Row className="mb-5 revers">
                    <Col lg={6} md={6}>
                        <h1 className="mt-5 h1-title">{strings.sahakka}</h1>
                        <p>{strings.desInHomepage}</p>
                        <div className="float-start">
                            <NavLink to="/login">
                                <Button className="me-4 draft" variant="warning">Freelancer</Button>
                                <Button variant="warning">{strings.client}</Button>
                            </NavLink>
                        </div>
                    </Col>
                    <Col lg={6} md={6}>
                        <img className="image-tl" src="./assets/popular/banner.png" alt="Feed img" width="100%" />
                    </Col>
                </Row>
                <Row>
                    {/* Categories Owl carousel */}
                    <h3 className="mb-5">{strings.exploreTheCategories}</h3>
                    <div className="categories">
                        <ExploreCate />
                    </div>
                </Row>
                <Row className="my-5">
                    <Col lg={6} md={6}>
                        <img className="image-tr" src="./assets/popular/banner-second.png" alt="Feed img" width="100%" />
                    </Col>
                    <Col lg={6} md={6}>
                        <h1 className="mt-5 h1-title">{strings.forFreelancer}</h1>
                        <p>{strings.desFreelacerHomepage}</p>
                        <div className="float-start">
                            <NavLink to="/learnmore_free">
                                <Button className="me-4 draft" variant="warning">{strings.learningMore}</Button>
                            </NavLink>
                            <NavLink to="/login">
                                <Button variant="warning">{strings.startFreelacing}</Button>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                {/* ----------------- */}
                <h3 className="text-center mb-5">{strings.benefitOf} <span style={{ color: '#ffb000' }}>Freelancing</span></h3>
                <Row>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/benefit/benefit1.png" width="50%" alt="no img show" />
                        <h6 className="mt-4">{strings.opportunities}</h6>
                    </Col>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/benefit/benefit2.png" width="50%" alt="no img show" />
                        <h6 className="mt-4">{strings.choosetheRightClient} <br /> {strings.thatAreBestForYou} </h6>
                    </Col>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/benefit/benefit3.png" width="50%" alt="no img show" />
                        <h6 className="mt-4">{strings.immenseFlexibility}<br /> {strings.exposure}</h6>
                    </Col>
                </Row>
                <Row className="my-5 revers">
                    <Col lg={6} md={6}>
                        <h1 className="mt-5 h1-title">{strings.forClient}</h1>
                        <p>{strings.desForClient}</p>
                        <div className="float-start">
                            <NavLink to="/learnmore_bus">
                                <Button className="me-4 draft" variant="warning">{strings.clientLearnMore}</Button>
                            </NavLink>
                            <NavLink to="/login">
                                <Button variant="warning">{strings.startHiring}</Button>
                            </NavLink>
                        </div>
                    </Col>
                    <Col lg={6} md={6}>
                        <img className="image-tl" src="./assets/popular/banner-third.png" alt="Feed img" width="100%" />
                    </Col>
                </Row>
                {/* ----------------- */}
                <h3 className="text-center mb-5">{strings.benefits} <span style={{ color: '#ffb000' }}>{strings.hiring}</span> Freelancer</h3>
                <Row>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/benefit/benefit1.png" width="50%" alt="no img show" />
                        <h6 className="mt-4" >{strings.flexibilityTopSelection}</h6>
                    </Col>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/benefit/benefit2.png" width="50%" alt="no img show" />
                        <h6 className="mt-4">{strings.costEffectiveOutcome}</h6>
                    </Col>
                    <Col lg={4} md={4} className="text-center">
                        <img src="./assets/benefit/benefit3.png" width="50%" alt="no img show" />
                        <h6 className="mt-4">{strings.betterWorkQuality}</h6>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}
