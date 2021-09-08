import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import ExploreCate from '../../components/ExploreCate';
import { strings } from '../../localization/localization';

export default function LearnMoreBus() {
    return (
        <div className="first-page" style={{ marginBottom: '6em' }}>
            <Container className="mb-5">
                <Row className="mt-5 revers">
                    <Col lg={6} md={6} xs={12}>
                        <h1 className="mb-3 h1-title" style={{ marginTop: '2em' }}>{strings.hiring} {strings.on} <span style={{ color: '#ffb000' }}>{strings.sahakka}</span></h1>
                        <p>{strings.desInHomepage}</p>
                        <div className="float-start">
                            <NavLink to="/login">
                                <Button className="me-4 draft" variant="warning">{strings.startHiring}</Button>
                            </NavLink>
                        </div>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <img className="image-tl" src="./assets/freelancer_pro/banner-human.png" alt="Feed img" width="100%" />
                    </Col>
                </Row>
                <h2 className="text-center my-5">{strings.startHiring} {strings.on} <span style={{ color: '#ffb000' }}>{strings.steps}</span></h2>
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
                        <img src="./assets/freelancer_pro/sample4.png" width="30%" alt="no img show" />
                        <h6 className="text-center mt-3">{strings.workEarn}</h6>
                        <p>{strings.workEarnDis}</p>
                    </Col>
                </Row>
                <h3 className="my-5">{strings.exploreTheCategories}</h3>
                <ExploreCate />
            </Container>
        </div>
    )
}
