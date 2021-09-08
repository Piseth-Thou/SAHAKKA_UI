import React, { useState } from 'react'
import { Card, Modal } from 'antd'
import { StarFilled, FileExclamationOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { Img } from 'react-image'
import TextArea from "antd/lib/input/TextArea";
import { reportServicePost } from '../../services/postService';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { strings } from '../../localization/localization'




function FreeCard({ post }) {

    const history = useHistory();
    const [reason, setReason] = useState();

    console.log("--------------------->", post.payload);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [report, setReport] = useState("");

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        OnReportServicePost();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const OnReportServicePost = async (e) => {
        reportServicePost(post.id, reason).then((isSuccess) => {
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

    return (
        <div className="free-card">
            <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                    <div
                        onClick={() => history.push('/freelancer_card_detail/' + post.id)}
                    >
                        <Img alt="cover" src={[`${post.post_image}`, "https://i.stack.imgur.com/y9DpT.jpg"]} width="100%" />
                    </div>
                }
            >
                <div className="d-flex">
                    <div className="profile-thumbnail">
                        <div onClick={() => history.push('/freelancer_profile_detail/' + post.user.user_id)}>
                            <Img alt="freelancer cover" src={[`${post.user.profile_image}`, "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"]} />
                        </div>
                    </div>
                    <div>
                        <div onClick={() => history.push('/freelancer_profile_detail/' + post.user.user_id)}>
                            <h6 className="mt-2">{post.user.username === "" ? "No Name Show" : post.user.username}</h6>
                        </div>
                        <p className="text-skill">{post.user.skills === "" ? "No skill show" : post.user.skills}</p>
                    </div>
                </div>
                <div onClick={() => history.push('/freelancer_card_detail/' + post.id)}>
                    <p>{post.title}</p>
                </div>
                <p>
                    <StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '8px' }} />
                    <span style={{ marginLeft: '20px' }}>4.5(120)</span>
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
                </p>
            </Card>
        </div>
    )
}

export default FreeCard
