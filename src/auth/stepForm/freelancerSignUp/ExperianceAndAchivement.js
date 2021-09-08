import React, { useState } from "react"
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BulbOutlined, GlobalOutlined, MailOutlined } from '@ant-design/icons'
import { Input, Form, Tabs } from 'antd'
import { NavLink } from "react-router-dom"
import TextArea from "antd/lib/input/TextArea"
import MyEditor from "../../../components/MyEditor"
import { strings } from "../../../localization/localization"

const { TabPane } = Tabs;

export const ExperianceAndAchivement = ({ formData, setForm, navigation, onSignUpFreelancer, setWork_experience, setAchievement }) => {

    const { achievement, work_experience } = formData;
    console.log(onSignUpFreelancer)
    const [formLayout] = useState("vertical");
    const formItemLayout =
        formLayout === "vertical"
            ? {
                labelCol: {
                    span: 8,
                },
                wrapperCol: {
                    span: 30,
                },
            }
            : null;

    const [value, setValue] = React.useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className="sing-up personal free">
            <Container>
                <Row>
                    <Col lg={7} md={7} sm={12} xs={12} className="left-side">
                        <h2 className="mt-5 mb-3">{strings.experienceAndAchievement}</h2>
                        <p>
                            {strings.experienceAndAchievementDis}
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%" />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">
                        <Form
                            initialValues={{ remember: true }}
                            {...formItemLayout}
                            layout={formLayout}
                            style={{ marginTop: '8em' }}
                        >
                            <Form.Item
                                label={strings.workExperience}
                                name="workExperiences"
                            >
                                <Form.Item
                                    name="work_experience"
                                >
                                    <TextArea
                                        value={work_experience}
                                        onChange={(e) => setWork_experience(e.target.value)}
                                        placeholder={strings.workExperience} style={{ height: '150px' }} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                label={strings.achievement}
                                name="Achievements"
                            >
                                <Form.Item
                                    name="achievement"
                                >
                                    <TextArea
                                        value={achievement}
                                        onChange={(e) => setAchievement(e.target.value)}
                                        placeholder={strings.achievement} style={{ height: '150px' }} />
                                </Form.Item>
                            </Form.Item>
                        </Form>
                        <div className="btn-next-pre my-5">
                            <div>
                                <Button onClick={navigation.previous} variant="warning">{strings.previous}</Button>
                            </div>
                            <div>
                                <NavLink to="/">
                                    <Button onClick={onSignUpFreelancer} variant="warning">{strings.signUp}</Button>
                                </NavLink>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
