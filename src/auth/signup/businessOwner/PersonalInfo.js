import React, { useState } from "react"
import './styles.css'
import {Container, Row , Col ,Button} from 'react-bootstrap'
import {PushpinOutlined,UserOutlined,FlagOutlined} from '@ant-design/icons'
import {Input ,Form } from 'antd'
import { NavLink } from "react-router-dom"

const { TextArea } = Input;

function PersonalInfo() {

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
        <div className="sing-up personal">
            <Container>
                <Row>
                    <Col lg={7} md={7} sm={12} xs={12} className="left-side">
                        <h2 className="mt-5 mb-3">Personal Information </h2>
                        <p>
                        Please tell us about yourself. To ensure that you can create a professional profile , the process must be completed. 
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%"/>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">     
                        <Form
                            initialValues={{ remember: true }}
                            {...formItemLayout}
                            layout={formLayout}
                            style={{marginTop:'12em'}}
                        >
                            <Form.Item
                                label="Full Name"
                                name="fullname"
                            >
                                <Input placeholder="Full Name" prefix={<UserOutlined />} />
                            </Form.Item>
                            <div className="d-flex justify-content-between">
                                <Form.Item
                                    label="Nationality "
                                    name="nationality "
                                >
                                    <Input placeholder="Nationality " prefix={<FlagOutlined />}/>
                                </Form.Item>
                                <Form.Item
                                    label="Gender"
                                    name="gender"
                                >
                                    <Input placeholder="Gender" prefix={<UserOutlined />}/>
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Address"
                                name="address"
                            >
                                <Input placeholder="Address" prefix={<PushpinOutlined />} />
                            </Form.Item>
                            <Form.Item
                                label="Bio"
                                name="bio"
                            >
                                <TextArea placeholder="Bio" style={{height:'100px',borderRadius:'10px'}}/>
                            </Form.Item>
                            <div className="btn-next-pre my-5">
                                <div>
                                    <NavLink to="/signup">
                                        <Button variant="warning">Previous</Button>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to="/signup_bu_contactinfo">
                                        <Button variant="warning">Next</Button>
                                    </NavLink>    
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PersonalInfo
