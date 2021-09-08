import React, { useState } from "react"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { PushpinOutlined, UserOutlined, FlagOutlined } from '@ant-design/icons'
import { Input, Radio, Select } from 'antd'
import { strings } from "../../localization/localization";

const { TextArea } = Input;
const { Option } = Select;

export const PersonalInfoStep = ({ formData, navigation, setGender, setAddress, setUsername, setNationality, setBio, setImageUrl, setImageFile }) => {

    const [fullName, setFullName] = useState("");
    const [profileImage, setProfileImage] = useState("/assets/freelancer_pro/defual_img.png")
    const { username, gender, address, nationality, bio, imageUrl } = formData;
    function handleChange(e) {
        setGender(e.target.value);
    };
    // console.log("gender", setGender)

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
                    <Col lg={7} md={7} sm={12} xs={12} >
                        <h2 className="mt-5 mb-3">{strings.personalInfo}</h2>
                        <p>{strings.personalInfoDis}</p>
                        <h6 className="label"><span style={{ color: '#ff4d4f' }}>*</span>{strings.fullName}</h6>
                        <Input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setFullName(e.target.value) }}
                            placeholder={strings.fullName}
                            prefix={<UserOutlined />}
                        />
                        <h6 className="label">{strings.nationality}</h6>
                        <Input
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            placeholder={strings.nationality}
                            prefix={<FlagOutlined />}
                        />
                        <h6 className="label">{strings.gender}</h6>
                        <select
                            value={gender}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        >
                            <option value="" disabled selected hidden>{strings.gender}</option>
                            <option value="Male">{strings.male}</option>
                            <option value="Female">{strings.Famale}</option>
                        </select>
                        <h6 className="label">{strings.address}</h6>
                        <Input
                            Input placeholder={strings.address}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            prefix={<PushpinOutlined />}
                        />
                        <h6 className="label">Bio</h6>
                        <TextArea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Bio"
                            style={{ height: '100px', borderRadius: '10px' }}
                        />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12}>
                        <div className="choose-img">
                            <div className="seleted-img">
                                <img src={profileImage} width="100%" alt="..." />
                            </div>
                            <Form.Group controlId="formFileMultiple">
                                <Form.Label className="mt-4">{strings.chooseImage}</Form.Label><br />
                                <Form.Control type="file" multiple
                                    onChange={(e) => {
                                        let url = URL.createObjectURL(e.target.files[0]);
                                        setImageFile(e.target.files[0]);
                                        setImageUrl(url);
                                        setProfileImage(url);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className="btn-next-pre my-5">
                            <div>
                                <Button onClick={navigation.previous} variant="warning">{strings.previous}</Button>
                            </div>
                            <div>
                                <Button onClick={navigation.next} variant="warning" disabled={!fullName}>{strings.next}</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PersonalInfoStep;