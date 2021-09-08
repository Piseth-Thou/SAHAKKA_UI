import React, { useEffect, useState, useCallback, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from 'react-bootstrap'
import './styles.css'
import { Carousel, Modal } from 'antd'
import { LikeOutlined, CommentOutlined, FileExclamationOutlined } from '@ant-design/icons'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { strings } from '../../localization/localization'
import { reactLikePost } from '../../services/postService';
import { reportPost } from '../../services/postService';
import { onFilterLikesCount } from "../../redux/actions/projectPostAction";
import { Img } from 'react-image'
import TextArea from "antd/lib/input/TextArea";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";




function BsCard({ projectPost }) {

    const user = useRef({})
    const [reason, setReason] = useState();

    const [query, setQuery] = useState("")
    const history = useHistory()

    user.current = JSON.parse(localStorage.getItem("user"));

    const dispatch = useDispatch();

    const onReactLike = async (e) => {
        reactLikePost(projectPost.post_id).then((res) => {
            dispatch(onFilterLikesCount(projectPost.post_id, res?.payload))
            console.log(res)
        })
    }

    const OnReportPost = async (e) => {
        reportPost(projectPost.post_id, reason).then((isSuccess) => {
            if (isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${strings.reportPost}`,
                    showConfirmButton: false,
                    timer: 4000
                })
            }
        });

    }

    const descriptions = projectPost.description.split('\n');

    const [status, setStatus] = useState(null)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        OnReportPost();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="bs-card">
            <Card>
                <Carousel
                    autoplay={true}
                >
                    <div>
                        <div className="card-cover" onClick={() => history.push('/bs_card_detail/' + projectPost.post_id)}>
                            <Img
                                src={[`${projectPost.post_image}`, 'https://i.stack.imgur.com/y9DpT.jpg']}
                                width="100%"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="card-cover" onClick={() => history.push('/bs_card_detail/' + projectPost.post_id)}>
                            <Img
                                src={[`${projectPost.post_image}`, 'https://i.stack.imgur.com/y9DpT.jpg']}
                                width="100%"
                            />
                        </div>
                    </div>
                </Carousel>
                <Card.Body>
                    <Card.Title>
                        <a onClick={() => history.push('/bs_profile/' + projectPost.user.user_id)}>
                            <div className="d-flex mb-2">
                                <div className="profile-thumbnail">
                                    <Img
                                        src={[`${projectPost.user.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']}
                                        width="100%" height="100%" alt=".."
                                    />
                                </div>
                                <h6 className="mt-2 ms-2">{projectPost.user.username === "" ? "No Name show " : projectPost.user.username} <br />
                                    <span style={{ fontSize: '12px', fontWeight: '400', color: '#ffb000' }}>{strings.posted} : {projectPost.created_date === "" ? "No date show" : projectPost.created_date}</span>
                                </h6>
                            </div>
                        </a>
                        <span className="report-section">
                            <FileExclamationOutlined
                                className="float-end"
                                style={{ cursor: 'pointer' }}
                                title="Report here"
                                onClick={showModal}
                            />
                            <Modal
                                title={strings.reasonWhyReportOn}
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okText={strings.okButtonReport}
                                cancelText={strings.canCelButton}
                                placeholder="input your report here"
                            >
                                <TextArea value={reason} onChange={(e) => setReason(e.target.value)} />
                            </Modal>
                        </span>
                        <p className="bs-card-title">
                            <a onClick={() => history.push('/bs_card_detail/' + projectPost.post_id)} >
                                {projectPost.title === "" ? "No title show " : projectPost.title}
                            </a>
                        </p>
                    </Card.Title>
                    {projectPost.categories && projectPost.categories.length === 0 ?
                        "No category show" :
                        projectPost.categories?.map((cat) => <Button variant="warning" className="mb-2 me-2">{cat}</Button>)
                    }

                    <a onClick={() => history.push('/bs_card_detail/' + projectPost.post_id)} >
                        <ul className="bs-card-des">
                            {projectPost.description === "" ? "No description show" :
                                descriptions.map((des) => <li style={{ listStyle: 'none' }}>{des}</li>)
                            }
                        </ul>
                    </a>
                    <div className="mt-4">
                        <span className="like ">
                            <LikeOutlined onClick={onReactLike} className={status === 'like' ? 'liked' : 'unlike'} style={{ verticalAlign: 'initial', fontSize: '25px', marginRight: '10px', cursor: 'pointer' }} />
                            <span>{projectPost.likes === null ? 0 : projectPost.likes} {strings.like}</span>
                        </span>
                        <span className="deadline">{strings.deadLine} <br />
                            <span style={{ color: '#ffb000', marginLeft: '2px' }}>{projectPost.post_deadline} </span>
                        </span>
                        {/* <span className="comment"><CommentOutlined style={{ verticalAlign: 'initial', fontSize: '25px', marginRight: '10px', cursor: 'pointer' }} /> 120 {strings.comments}</span>
                         */}
                        {/* {projectPost.likes === null ? 0 : projectPost.likes} */}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BsCard

