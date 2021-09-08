import React, { useState } from "react"
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BulbOutlined, GlobalOutlined, MailOutlined } from '@ant-design/icons'
import { Input, Form, Tabs } from 'antd'
import { NavLink } from "react-router-dom"
import TextArea from "antd/lib/input/TextArea"
import MyEditor from "../../../components/MyEditor"

const { TabPane } = Tabs;

function FreeAchievement() {

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
                        <h2 className="mt-5 mb-3">Experiences & Achievements </h2>
                        <p>
                            Make sure to include your educational background , bio , expertise and your relavant working experiences . These will help you stand out and make your profile professinal.
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
                                label="Work Experiences"
                                name="workExperiences"
                            >
                                <MyEditor />
                            </Form.Item>
                            <Form.Item
                                label="Achievements"
                                name="Achievements"
                            >
                                <MyEditor/>
                            </Form.Item>
                        </Form>
                        <div className="btn-next-pre my-5">
                            <div>
                                <NavLink to="/signup_experience">
                                    <Button variant="warning">Previous</Button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to="/">
                                    <Button variant="warning">Sign up</Button>
                                </NavLink>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FreeAchievement
