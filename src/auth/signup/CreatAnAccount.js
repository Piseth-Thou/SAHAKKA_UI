import React, { useState } from "react"
import './styles.css'
import {Container, Row , Col ,Button} from 'react-bootstrap'
import {MailOutlined,LockOutlined,UserOutlined} from '@ant-design/icons'
import {Input ,Form ,Radio } from 'antd'
import { NavLink } from "react-router-dom"


function CreatAnAccount() {
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
        };
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const validateBtn = () => {
            if (
              email !== "" &&
              password !== ""
            ) {
              return false;
            } else {
              return true;
            }
          };
    return (
        <div className="sing-up">
            <Container>
                <Row>
                    <Col lg={7} md={7} sm={12} xs={12} className="left-side">
                        <h2 className="mt-5 mb-3">Create an account</h2>
                        <p>
                            Sign up to be able to get the freelancers that are qualified for your projects or explore the projects  to be able to earn lorem you want to be able be able
                        </p>
                        <img src="./assets/auth_img/signup.png" alt="cover" width="100%" />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">     
                        <Form
                            initialValues={{ remember: true }}
                            {...formItemLayout}
                            layout={formLayout}
                            style={{marginTop:'12em'}}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your Email!" },
                                  ]}
                            >
                                <Input placeholder="Email" prefix={<MailOutlined />} 
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                      }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Please input your password!" },
                                  ]}
                            >
                                <Input.Password placeholder="Password" prefix={<LockOutlined />}
                                value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                      }}
                                />
                            </Form.Item>
                            <NavLink to="/login">
                                <a className="forgotPassword have-acc">already has an account?</a>
                            </NavLink>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>Client</Radio>
                                <Radio value={2}>Freelancer</Radio>
                            </Radio.Group>
                            <div className="btn-next my-5">   
                                <NavLink to={value === 1 ? "/signup_bu_personalinfo":"/signup_fre_personalinfo"}>
                                    <Button variant="warning" disabled={validateBtn()}>Next</Button>
                                </NavLink>              
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreatAnAccount
