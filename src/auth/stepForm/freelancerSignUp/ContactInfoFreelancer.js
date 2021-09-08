import React, { useState } from "react"
import './styles.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { PhoneOutlined, GlobalOutlined, MailOutlined, FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Input, Form, Tabs } from 'antd'
import { strings } from "../../../localization/localization"

const { TabPane } = Tabs;

export const ContactInfoFreelancer = ({ formData, setForm, navigation, onSignUpFreelancer, setTelephone, setEmailAddress, setFacebook, setTelegram,setTwitter,setLinkIn, }) => {

    const [phoneNum, setPhoneNum] = useState("");
    const [officeEmail, setOfficeEmail] = useState("");
    const { telephone, email_address, facebook, telegram, twitter, linkIn } = formData;

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
    const validateBtn = () => {
        if (
            phoneNum !== "" &&
            officeEmail !== ""
        ) {
            return false;
        } else {
            return true;
        }
    };
    return (
        <div className="sing-up personal free">
            <Container>
                <Row>
                    <Col lg={7} md={7} sm={12} xs={12} className="left-side">
                        <h2 className="mt-5 mb-3">{strings.contactInfo}</h2>
                        <p>
                            {strings.contactInfoDis}
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%" />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side">
                        <Tabs type="card" style={{ marginTop: '8em' }}>
                            <TabPane tab={strings.contactInfo} key="1">
                                <Form
                                    initialValues={{ remember: true }}
                                    {...formItemLayout}
                                    layout={formLayout}
                                    style={{ marginTop: '2em' }}
                                >
                                    <Form.Item
                                        label={strings.telephone}
                                        name="telephone"
                                        required
                                    >
                                        <Input placeholder={strings.telephone}
                                            value={telephone}
                                            onChange={(e) => {setTelephone(e.target.value);setPhoneNum(e.target.value)}}
                                            prefix={<PhoneOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label={strings.officailEmail}
                                        name="email"
                                        required
                                    >
                                        <Input placeholder={strings.officailEmail}
                                            value={email_address}
                                            onChange={(e) => {setEmailAddress(e.target.value);setOfficeEmail(e.target.value)}}
                                            prefix={<MailOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label={strings.website}
                                        name="website"
                                    >
                                        <Input placeholder={strings.website}
                                            prefix={<GlobalOutlined />} />
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab={strings.socialMedia} key="2">
                                <div className="social-media mt-5">
                                    <Form.Item label={<FacebookOutlined style={{ fontSize: '25px', color: '#3b5998' }} />} >
                                        <Input
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        placeholder={strings.facebookAccount} />
                                    </Form.Item>
                                    <Form.Item label={<SendOutlined style={{ fontSize: '25px', color: '#0088cc', transform: 'rotate(-20deg)' }} />} >
                                        <Input
                                        value={telegram}
                                        onChange={(e) => setTelegram(e.target.value)}
                                        placeholder={strings.telegramAccount} />
                                    </Form.Item>
                                    <Form.Item label={<TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2' }} />} >
                                        <Input 
                                        value={twitter}
                                        onChange={(e) => setTwitter(e.target.value)}
                                        placeholder={strings.TwitterAccount} />
                                    </Form.Item>
                                    <Form.Item label={<LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5' }} />} >
                                        <Input 
                                        value={linkIn}
                                        onChange={(e) => setLinkIn(e.target.value)}
                                        placeholder={strings.linkInAccount} />
                                    </Form.Item>
                                </div>
                            </TabPane>
                        </Tabs>
                        <div className="btn-next-pre my-5">
                            <Button onClick={navigation.previous} variant="warning">{strings.previous}</Button>
                            <Button onClick={navigation.next} variant="warning" disabled={validateBtn()}>{strings.next}</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
