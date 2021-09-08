import React, { useState } from "react"
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BulbOutlined } from '@ant-design/icons'
import { Input, Form, Tabs } from 'antd'
import TextArea from "antd/lib/input/TextArea"
import { strings } from "../../../localization/localization"

const { TabPane } = Tabs;

export const ExpertiseAndBackground = ({ formData, setForm, navigation, onSignUpFreelancer, setSkills, setEducation_background, setBio }) => {

    const [ownSkill, setOwnSkill] = useState("");
    const { education_background, skills, bio } = formData;

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
                        <h2 className="mt-5 mb-3">{strings.expertiseAndBackground}</h2>
                        <p>
                            {strings.expertiseAndBackgroundDis}
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%" />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">
                        <Tabs type="card" style={{ marginTop: '8em' }}>
                            <TabPane tab={strings.expertiseDetail} key="1">
                                <Form
                                    initialValues={{ remember: true }}
                                    {...formItemLayout}
                                    layout={formLayout}
                                    style={{ marginTop: '2em' }}
                                >
                                    <Form.Item
                                        label={strings.skill}
                                        name="skill"
                                        required
                                    >
                                        <Input placeholder={strings.skill}
                                            value={skills}
                                            onChange={(e) => {setSkills(e.target.value);setOwnSkill(e.target.value)}}
                                            prefix={<BulbOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Bio"
                                        name="bio"
                                    >
                                        <TextArea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Bio" style={{ height: '150px' }} />
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab={strings.educationalBackground} key="2">
                                <Form
                                    initialValues={{ remember: true }}
                                    {...formItemLayout}
                                    layout={formLayout}
                                    style={{ marginTop: '2em' }}
                                >
                                    <Form.Item
                                        label={strings.educationalBackground}
                                        name="educational"
                                    >
                                        <Form.Item
                                            name="education_background"
                                        >
                                            <TextArea
                                                value={education_background}
                                                onChange={(e) => setEducation_background(e.target.value)}
                                                placeholder={strings.educationalBackground} style={{ height: '150px' }} />
                                        </Form.Item>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                        <div className="btn-next-pre my-5">
                            <Button onClick={navigation.previous} variant="warning">{strings.previous}</Button>
                            <Button onClick={navigation.next} variant="warning" disabled={!ownSkill}>{strings.next}</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
