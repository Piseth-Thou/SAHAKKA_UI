import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Input, Form, Radio } from 'antd'
import { NavLink } from "react-router-dom"
import { setCurrentFormType } from "../../services/form.service"
import { strings } from "../../localization/localization"

export const BashPersonalInfoStep = ({ formData, setForm, navigation, onSignUp, setEmail, setPassword }) => {

    const { email, passwords } = formData;
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    // console.log(username);
    // console.log(onSignUp)
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

    const [value, setValue] = useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        setCurrentFormType(e.target.value)
    };

    useEffect(() => {
        localStorage.setItem("formType", 1);
    }, [])

    const validateBtn = () => {
        if (
            emailField !== "" &&
            // passwordField !== ""
            passwordField.length > 2 && passwordField.length < 24
        ) {
            return false;
        } else {
            return true;
        }
    };
    console.log("Email", emailField);
    return (
        <div className="sing-up">
            <Container>
                <Row>
                    <Col lg={7} md={7} sm={12} xs={12} className="left-side">
                        <h2 className="mt-5 mb-3">{strings.createAcc}</h2>
                        <p>{strings.createAccDis}</p>
                        <img src="./assets/auth_img/signup.png" alt="cover" width="100%" />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">
                        <Form
                            initialValues={{ remember: true }}
                            {...formItemLayout}
                            layout={formLayout}
                            style={{ marginTop: '12em' }}
                        >
                            <Form.Item
                                label={strings.email}
                                name="email"
                                rules={[
                                {
                                    type: "email",message: `${strings.validEmail}`
                                },
                                {
                                    required: true, message: `${strings.pleaseInPutEM}`
                                },

                                       ]}
                            >
                                <Input placeholder={strings.email}
                                    value={email}
                                    onChange={setForm}
                                    onChange={(e) => { setEmail(e.target.value); setEmailField(e.target.value) }}
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>
                            <Form.Item
                                label={strings.password}
                                name="passwords"
                                rules={[
                                    { 
                                        required: true, message: `${strings.pleaseInPutPassword}`
                                    },
                                    {
                                        min: 3, message: `${strings.minPassword}`,
                                    },
                                    {
                                        max: 25, message: `${strings.maxPassword}`,
                                    }
                                ]}
                            >
                                <Input.Password placeholder={strings.password}
                                    value={passwords}
                                    onChange={(e) => { setPassword(e.target.value); setPasswordField(e.target.value) }}
                                    prefix={<LockOutlined />} />
                            </Form.Item>
                            <NavLink to="/login" className="forgotPassword have-acc">{strings.alreadyHaveAcc}</NavLink>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>Client</Radio>
                                <Radio value={2}>Freelancer</Radio>
                            </Radio.Group>
                            <div className="btn-next my-5">
                                <Button onClick={navigation.next} variant="warning" disabled={validateBtn()}>{strings.next}</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default BashPersonalInfoStep;
