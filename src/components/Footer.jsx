import React from 'react'
import './styles.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Media from 'react-media'
import { FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import { strings } from '../localization/localization'
import { Img } from 'react-image'


export default function Footer() {
    return (
        <div className="footer">
            <Media query={{ maxWidth: 813 }}>
                {matches =>
                    matches ? (
                        <div>
                            <Container>
                                <Row>
                                    <Col lg={3} md={3} sm={3} xs={3}>
                                        <Img src={["./logo-footer.png", "../logo-footer.png"]} />
                                    </Col>
                                    <Col lg={9} md={9} sm={9} xs={9}>
                                        <p className="text">{strings.footerDis}</p>
                                    </Col>
                                </Row>
                                <br /><br />
                                <Row>
                                    <Col lg={3} md={3} sm={6} xs={6}>
                                        <div className="sahakka">
                                            <h6>{strings.sahakka}</h6>
                                            <ul>
                                                <li><Link to='/aboutus'>{strings.aboutUs}</Link></li>
                                                <li><Link to='#'>{strings.termOfService}</Link></li>
                                                <li><Link to='#'>{strings.privacyPolicy}</Link></li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col lg={3} md={3} sm={6} xs={6}>
                                        <div className="sahakka discover">
                                            <h6>{strings.discover}</h6>
                                            <ul>
                                                <li><Link to='#'>Freelancers</Link></li>
                                                <li><Link to='#'>{strings.project}</Link></li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col lg={3} md={3} sm={6} xs={6}>
                                        <div className="sahakka">
                                            <h6>{strings.support}</h6>
                                            <ul>
                                                <li><Link to='#'>{strings.faq}</Link></li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col lg={3} md={3} sm={6} xs={6}>
                                        <div className="sahakka">
                                            <h6>{strings.contactUs}</h6>
                                            <ul className="contact-us">
                                                <li>
                                                    <a href="#"><FacebookOutlined style={{ fontSize: '18px', color: '#ffff', marginRight: '10px' }} /> Facebook</a>
                                                </li>
                                                <li>
                                                    <a href="#"><LinkedinOutlined style={{ fontSize: '18px', color: '#ffff', marginRight: '10px' }} /> Link In</a>
                                                </li>
                                                <li>
                                                    <a href="#"><SendOutlined style={{ fontSize: '17px', color: '#ffff', marginRight: '10px', transform: 'rotate(-20deg)' }} /> Telegram</a>
                                                </li>
                                                <li>
                                                    <a href="#"><TwitterOutlined style={{ fontSize: '18px', color: '#ffff', marginRight: '10px' }} />  Twitter</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="b-footer">
                                © {strings.copyRight}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Container>
                                <Row>
                                    <Col lg={4} md={4}>
                                        <div className="d-flex">
                                            <Img src={["./logo-footer.png", "../logo-footer.png"]} />
                                            <p className="text">{strings.footerDis}</p>
                                        </div>
                                    </Col>
                                    <Col lg={2} md={2}>
                                        <h6>{strings.sahakka}</h6>
                                        <ul>
                                            <li><Link to='/aboutus'>{strings.aboutUs}</Link></li>
                                            <li><Link to='#'>{strings.termOfService}</Link></li>
                                            <li><Link to='#'>{strings.privacyPolicy}</Link></li>
                                        </ul>
                                    </Col>
                                    <Col lg={2} md={2}>
                                        <h6>{strings.discover}</h6>
                                        <ul>
                                            <li><Link to='#'>Freelancers</Link></li>
                                            <li><Link to='#'>{strings.project}</Link></li>
                                        </ul>
                                    </Col>
                                    <Col lg={2} md={2}>
                                        <h6>{strings.support}</h6>
                                        <ul>
                                            <li><Link to='#'>{strings.faq}</Link></li>
                                        </ul>
                                    </Col>
                                    <Col lg={2} md={2}>
                                        <h6>{strings.contactUs}</h6>
                                        <ul className="contact-us">
                                            <li>
                                                <a href="#"><FacebookOutlined style={{ fontSize: '18px', color: '#ffff', marginRight: '10px' }} /> Facebook</a>
                                            </li>
                                            <li>
                                                <a href="#"><LinkedinOutlined style={{ fontSize: '18px', color: '#ffff', marginRight: '10px' }} /> Link In</a>
                                            </li>
                                            <li>
                                                <a href="#"><SendOutlined style={{ fontSize: '17px', color: '#ffff', marginRight: '10px', transform: 'rotate(-20deg)' }} /> Telegram</a>
                                            </li>
                                            <li>
                                                <a href="#"><TwitterOutlined style={{ fontSize: '18px', color: '#ffff', marginRight: '10px' }} />  Twitter</a>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="b-footer">
                                © {strings.copyRight}
                            </div>
                        </div>
                    )
                }
            </Media>
        </div>
    )
}
