import React, { useState } from "react"
import './styles.css'
import {Container, Row , Col ,Button} from 'react-bootstrap'
import {PhoneOutlined,GlobalOutlined,MailOutlined,FacebookOutlined,SendOutlined ,TwitterOutlined,LinkedinOutlined} from '@ant-design/icons'
import {Input ,Form,Tabs } from 'antd'
import { NavLink } from "react-router-dom"

const { TabPane } = Tabs;

function FreeContactInfo() {

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
                        <h2 className="mt-5 mb-3">Contact Information</h2>
                        <p>
                        Your contact information will provide your clients other convinient way of contacting you. 
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%"/>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">  
                        <Tabs type="card" style={{marginTop:'8em'}}>
                            <TabPane tab="Contact" key="1">
                            <Form
                                initialValues={{ remember: true }}
                                {...formItemLayout}
                                layout={formLayout}
                                style={{marginTop:'2em'}}
                            >
                                <Form.Item
                                    label="Telephone"
                                    name="telephone"
                                >
                                    <Input placeholder="Telephone" prefix={<PhoneOutlined />} />
                                </Form.Item>
                                <Form.Item
                                    label="Official Email"
                                    name="email"
                                >
                                    <Input placeholder="Email" prefix={<MailOutlined />} />
                                </Form.Item>
                                <Form.Item
                                    label="Website"
                                    name="website"
                                >
                                    <Input placeholder="Website" prefix={<GlobalOutlined />} />
                                </Form.Item>
                            </Form>
                            </TabPane>
                            <TabPane tab="Social Media" key="2">
                                <div className="social-media mt-5">
                                <Form.Item label={<FacebookOutlined style={{fontSize:'25px',color:'#3b5998'}} />} >
                                        <Input placeholder="Facebook Account"/>
                                    </Form.Item>
                                    <Form.Item label={<SendOutlined style={{fontSize:'25px',color:'#0088cc',transform: 'rotate(-20deg)'}}/>} >
                                        <Input placeholder="Telegram Account"/>
                                    </Form.Item>
                                    <Form.Item label={<TwitterOutlined style={{fontSize:'25px',color:'#1DA1F2'}}/>} >
                                        <Input placeholder="Twitter Account"/>
                                    </Form.Item>
                                    <Form.Item label={<LinkedinOutlined style={{fontSize:'25px',color:'#0077b5'}}/>} >
                                        <Input placeholder="LinkIn Account"/>
                                    </Form.Item>
                                </div>
                            </TabPane>
                        </Tabs>
                        <div className="btn-next-pre my-5">
                            <div>
                                <NavLink to="/signup_fre_personalinfo">
                                    <Button variant="warning">Previous</Button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to="/signup_experience">
                                    <Button variant="warning">Next</Button>
                                </NavLink>    
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FreeContactInfo
