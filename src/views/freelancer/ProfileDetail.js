import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import { Tabs } from 'antd'
import { Col, Container, Row } from 'react-bootstrap'
import Card from '../../components/freelancer/Card'
import { Link, NavLink, useHistory, useParams } from 'react-router-dom'
import Media from 'react-media'
import { strings } from '../../localization/localization'
import { FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { onFetchOwnerGetAllServicePost, onFetchOwnerGetAllServicePostPending, onFetchOwnerGetAllServicePostDraft } from '../../redux/actions/postAction';
import { onFetchFreelancerById } from '../../redux/actions/accountAction'
import { Img } from 'react-image'
import ReactPaginate from 'react-paginate'
import { Spin } from 'antd'
import { Button } from 'bootstrap'

const { TabPane } = Tabs;

function ProfileDetail() {

    const [page, _] = useState(1)
    const param = useParams();
    const dispatch = useDispatch();
    const { accounts, isLoading } = useSelector((state) => state.accoutReducer)
    const state = useSelector((state) => state.postReducer);

    // const history = useHistory();

    useEffect(() => {
        dispatch(onFetchFreelancerById(param.id));
        dispatch(onFetchOwnerGetAllServicePost(page));
        dispatch(onFetchOwnerGetAllServicePostPending());
        dispatch(onFetchOwnerGetAllServicePostDraft());
    }, []);

    // console.log("acc : ", account);
    // console.log("allservice", state.ownerGetAllServicePost);

    const onPageChange = ({ selected }) => {
        dispatch(onFetchOwnerGetAllServicePost(selected + 1))
    }
    const history=useHistory();

    const user = useRef({});
  user.current = JSON.parse(localStorage.getItem("user"));
    return (
        !isLoading ?
            accounts && accounts.map((acc) => {

                const experience = acc.user.work_experience && acc.user.work_experience.split("\n")
                const edBackround = acc.user.educational_background && acc.user.educational_background.split("\n")
                const achivce = acc.user.achievement && acc.user.achievement.split("\n")

                return (
                    <div className="profile-detail">
                        <div className="cover">
                            <img src="../assets/freelancer_pro/cover.png" alt="no cover show" width="100%" />
                        </div>
                        <Container>
                            <Media query={{ maxWidth: 480 }}>
                                {matches =>
                                    matches ? (
                                        <>
                                            <div className="profile">
                                                <Img src={[`${acc.user.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']} alt=".." width="100%" />
                                            </div>
                                            <Row>
                                                <Col sm={9} xs={9} className="mt-3">
                                                    <h4>{acc.user.username}</h4>
                                                    <p style={{ color: '#ffb000', fontSize: '14px' }}>{acc.user.skills === "" || acc.user.skills === null ? "No skill show" : acc.user.skills}</p>
                                                </Col>
                                                <Col sm={3} xs={3} className="mt-3">
                                                    <Link onClick={() => history.push('/profile_edit/' + user.current.id)}>
                                                        <img className="float-end" src="../assets/freelancer_pro/setting.png" height="40px" style={{ opacity: '0.8' }} alt=".." />
                                                    </Link>
                                                </Col>
                                                <p>{acc.user.bio === "" || acc.user.bio === null ? "No bio show" : acc.user.bio}</p>
                                            </Row>
                                        </>
                                    ) : (
                                        <Row>
                                            <Col xl={2} lg={3} md={3}>
                                                <div className="profile">
                                                    <Img src={[`${acc.user.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']} alt=".." width="100%" />
                                                </div>
                                            </Col>
                                            <Col xl={8} lg={7} md={7} className="mt-3">
                                                <h4>{acc.user.username}</h4>
                                                <p style={{ color: '#ffb000', fontSize: '14px' }}>{acc.user.skills === "" || acc.user.skills === null ? "No skill show" : acc.user.skills}</p>
                                                <p>{acc.user.bio === "" ? "No bio show" : acc.user.bio}</p>
                                            </Col>
                                            <Col xl={2} lg={2} md={2} className="mt-3">
                                                <Link onClick={() => history.push('/profile_edit/' + user.current.id)}>
                                                    <img className="float-end" src="../assets/freelancer_pro/setting.png" alt=".." style={{ opacity: '0.8' }} />
                                                </Link>
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
                                                    <p><b>{strings.telephone}</b><br />{acc.user.telephone === "" || acc.user.telephone === null ? "No telephone show" : acc.user.telephone}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img className="float-end me-4" src="../assets/freelancer_pro/mail.png" height="35px" alt=".." />
                                                    <p><b>{strings.officailEmail}</b><br />{acc.user.official_email === ""|| acc.user.official_email === null ? "No email show" : acc.user.official_email}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img className="float-end me-4" src="../assets/freelancer_pro/location.png" height="35px" alt=".." />
                                                    <p><b>{strings.address}</b><br />{acc.user.location === "" || acc.user.location === null ? "No address show" : acc.user.location}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img className="float-end me-4" src="../assets/freelancer_pro/nation.png" height="35px" alt=".." />
                                                    <p><b>{strings.nationality}</b><br />{acc.user.nationality === "" || acc.user.nationality === null ? "No nationality show" : acc.user.nationality}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img className="float-end me-4" src="../assets/freelancer_pro/globle.png" height="35px" alt=".." />
                                                    <p><b>{strings.language}</b><br />{ acc.user.nationality === "" || acc.user.languages === null ? "No language show" : acc.user.languages}</p>
                                                </div>
                                                <div className="socail-medai">
                                                    <FacebookOutlined style={{ fontSize: '25px', color: '#3b5998', cursor: 'pointer' }} />
                                                    <SendOutlined style={{ fontSize: '22px', color: '#0088cc', transform: 'rotate(-30deg)', cursor: 'pointer' }} />
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
                                                        {acc.user.work_experience === "" || acc.user.work_experience === null  ? "No experience show" :
                                                            experience?.map((ex) => <li>{ex}</li>)
                                                        }
                                                    </div>
                                                </TabPane>
                                                <TabPane tab={strings.achievement} key="2">
                                                    <div className="achivement">
                                                        {acc.user.achievement === "" || acc.user.achievement === null ? "No achievement show" :
                                                            achivce?.map((ac) => <li>{ac}</li>)
                                                        }
                                                    </div>
                                                </TabPane>
                                            </Tabs>
                                        </Col>
                                    </Row>
                                    {/* -------------Educational Background----------------- */}
                                    <h5 className="mb-3 mt-4">{strings.educationalBackground}</h5>
                                    <div className="education">
                                        {acc.user.educational_background === "" || acc.user.educational_background === null ? "No achievement show" :
                                            edBackround?.map((ed) => <li style={{ listStyle: 'none' }}>{ed}</li>)
                                        }
                                    </div>
                                </Col>
                                <Col xl={9} lg={8} md={12} sm={12} xs={12}>
                                    <h5 className="mb-3 service-card-sec">{strings.serviceCardDashboard}</h5>
                                    <Tabs type="card">
                                        <TabPane tab={strings.serviceCards} key="1">
                                            {state.ownerGetAllServicePost && state.ownerGetAllServicePost.map((value) => {
                                                return (<>
                                                    <p className="mt-3"> {strings.numSer}​​ :{value.metadata && value.metadata.totalCount} {strings.project} </p>
                                                    {
                                                        value.payload && value.payload.map((getNormalPost) => <>
                                                            <Card data={getNormalPost} /><br />
                                                        </>
                                                        )
                                                    }
                                                    <ReactPaginate
                                                        pageCount={value?.metadata.totalCount / value?.metadata.limit}
                                                        onPageChange={onPageChange}
                                                        containerClassName="pagination"
                                                        pageClassName="page-item"
                                                        pageLinkClassName="page-link"
                                                        previousClassName="page-item"
                                                        previousLinkClassName="page-link"
                                                        nextLinkClassName="page-link"
                                                        nextClassName="page-item"
                                                        activeClassName="active"
                                                    />
                                                </>
                                                )
                                            }
                                            )}
                                        </TabPane>
                                        {/* <TabPane tab={strings.pending} key="2">
                                            {state.ownerGetAllServicePostPending.map((value) => {
                                                return (<>
                                                    <p className="mt-3">{strings.numSer}​​ :{value.metadata && value.metadata.totalCount} {strings.project} </p>
                                                    {
                                                        value.payload && value.payload.map((getNormalPost) => <>
                                                            <Card data={getNormalPost} /><br />
                                                        </>
                                                        )
                                                    }
                                                </>
                                                )
                                            }
                                            )}
                                        </TabPane> */}
                                        <TabPane tab={strings.draft} key="3">
                                            {state.ownerGetAllServicePostDraft.map((value) => {
                                                return (<>
                                                    <p className="mt-3">{strings.numSer}​​ :{value.metadata && value.metadata.totalCount} {strings.project} </p>
                                                    {
                                                        value.payload && value.payload.map((getNormalPost) => <>
                                                            <Card data={getNormalPost} /><br />
                                                        </>
                                                        )
                                                    }
                                                </>
                                                )
                                            }
                                            )}
                                        </TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </div >
                )
            })
            : <div className="text-center mt-5">
    <Spin tip="Loading..." style={{ color: '#ffb000', height: '200px', marginTop: '10em' }}></Spin>
</div>
    )
}

export default ProfileDetail
