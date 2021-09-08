import React, { useEffect } from 'react'
import './styles.css'
import { Col, Container, Row } from 'react-bootstrap'
import BsCard from '../../components/freelancer/BsCard'
import Media from 'react-media'
import { strings } from '../../localization/localization'
import { FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { onFetchBusinessOwnerById } from '../../redux/actions/accountAction';
import { useParams, useHistory } from 'react-router'
import { Img } from 'react-image'
import { Spin } from 'antd'

function BsProfileDetail() {
    let param = useParams();
    const dispatch = useDispatch();
    const { accounts, isLoading } = useSelector((state) => state.accoutReducer)
    const history = useHistory();

    useEffect(() => {
        dispatch(onFetchBusinessOwnerById(param.id));
    }, [param.id]);


    return (
        <>
            {
                !isLoading ?
                    accounts && accounts.map((acc) => {
                        return (
                            <div className="profile-detail bs-profile">
                                <div className="cover">
                                    <img src="../assets/freelancer_pro/cover.png" alt="no cover show" width="100%" />
                                </div>
                                <Container>
                                    <Media query={{ maxWidth: 480 }}>
                                        {matches =>
                                            matches ? (
                                                <>
                                                    <div className="profile">
                                                        <Img src={[`${acc.user.profile_image}`, "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"]} alt=".." />
                                                    </div>
                                                    <div className="text-center">
                                                        <h4>{acc.user.username === "" ? "No name show" : acc.user.username}</h4>
                                                        <p className="bio" style={{ color: '#47444B' }}>{acc.user.bio === "" ? "No bio show" : acc.user.bio}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <Row>
                                                    <Col xl={2} lg={3} md={3} sm={2} xs={2}>
                                                        <div className="profile">
                                                            <Img src={[`${acc.user.profile_image}`, "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"]} alt=".." />
                                                        </div>
                                                    </Col>
                                                    <Col xl={8} lg={7} md={7} sm={8} xs={8} className="mt-3 name-bio">
                                                        <h4>{acc.user.username === "" ? "No name show" : acc.user.username}</h4>
                                                        <p className="bio" style={{ color: '#47444B' }}>{acc.user.bio === "" ? "No bio show" : acc.user.bio}</p>
                                                    </Col>
                                                    <Col xl={2} lg={2} md={2} className="mt-3">
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    </Media>
                                    {/* ............... */}
                                    <Row className="mt-5">
                                        <Col xl={3} lg={4} md={12} sm={12} xs={12}>
                                            <Row>
                                                <Col xl={12} lg={12} md={6}>
                                                    <h5 className="mb-3">{strings.contactInfo}</h5>
                                                    <div className="contact-info">
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/phone.png" height="35px" alt=".." />
                                                            <p><b>{strings.telephone}</b><br />{acc.user.telephone === "" ? "No phone show" : acc.user.telephone}</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/mail.png" height="35px" alt=".." />
                                                            <p><b>{strings.officailEmail}</b><br />{acc.user.official_email === "" ? "No email show" : acc.user.official_email}</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/location.png" height="35px" alt=".." />
                                                            <p><b>{strings.address}</b><br /> {acc.user.location === null ? "No address show" : acc.user.location} </p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <img className="float-end me-4" src="../assets/freelancer_pro/nation.png" height="35px" alt=".." />
                                                            <p><b>{strings.nationality}</b><br />{acc.user.nationality === null ? "No nationality show" : acc.user.nationality} </p>
                                                        </div>
                                                        
                                                        <div className="socail-medai">
                                                            <FacebookOutlined style={{ fontSize: '25px', color: '#3b5998' }} />
                                                            <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-20deg)' }} />
                                                            <TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2' }} />
                                                            <LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5' }} />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={12} lg={12} md={6}>
                                                    <div className="addi-sec">
                                                        {/* -------------Company Infomation----------------- */}
                                                        <h5 className="mb-3 mt-4">{strings.companyInfor}</h5>
                                                        <div className="company-info">
                                                            <Img src={[`${acc.user.company_logo}`, "https://i.stack.imgur.com/y9DpT.jpg"]} alt="company cover" width="100%" />
                                                            <div className="des">
                                                                <h6 className="mb-4">{acc.user.company_name === "" ? "No company name show" : acc.user.company_name}</h6>
                                                                <p>{acc.user.business_description === "" ? "No Business description show" : acc.user.business_description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={9} lg={8} md={12} sm={12} xs={12}>
                                            <div className="project-list">
                                                <Row>
                                                    {acc.projectPost && acc.projectPost.map((projectPost) => {
                                                        return (
                                                            <>
                                                                <Col lg={6} md={6}><BsCard projectPost={projectPost} /></Col>
                                                            </>
                                                        )
                                                    }
                                                    )}<br />
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    })
                    :
                    <div className="text-center mt-5">
                        <Spin tip="Loading..." style={{ color: '#ffb000', height: '200px', marginTop: '10em' }}></Spin>
                    </div>
            }
        </>
    )
}

export default BsProfileDetail
