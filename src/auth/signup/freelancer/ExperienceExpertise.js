import React, { useState } from "react"
import './styles.css'
import {Container, Row , Col ,Button} from 'react-bootstrap'
import {BulbOutlined,GlobalOutlined,MailOutlined} from '@ant-design/icons'
import {Input ,Form,Tabs } from 'antd'
import { NavLink } from "react-router-dom"
import TextArea from "antd/lib/input/TextArea"
import MyEditor from "../../../components/MyEditor"

const { TabPane } = Tabs;

function ExperienceExpertise() {

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
                        <h2 className="mt-5 mb-3">Expertise and Background </h2>
                        <p>
                        Make sure to include your educational background , bio , expertise and your relavant working experiences . These will help you stand out and make your profile professinal.
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%"/>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">  
                        <Tabs type="card" style={{marginTop:'8em'}}>
                            <TabPane tab="Expertise Detail" key="1">
                                <Form
                                    initialValues={{ remember: true }}
                                    {...formItemLayout}
                                    layout={formLayout}
                                    style={{marginTop:'2em'}}
                                >
                                    <Form.Item
                                        label="Skill"
                                        name="skill"
                                    >
                                        <Input placeholder="Skill" prefix={<BulbOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Bio"
                                        name="bio"
                                    >
                                        <TextArea placeholder="Bio" style={{height:'150px'}}/>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab="Background" key="2">
                            <Form
                                    initialValues={{ remember: true }}
                                    {...formItemLayout}
                                    layout={formLayout}
                                    style={{marginTop:'2em'}}
                                >
                                    <Form.Item
                                        label="Educational Background"
                                        name="educational"
                                    >
                                        <MyEditor/>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                        <div className="btn-next-pre my-5">
                            <div>
                                <NavLink to="/signup_fre_contactinfo">
                                    <Button variant="warning">Previous</Button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to="/signup_achievements">
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

export default ExperienceExpertise
