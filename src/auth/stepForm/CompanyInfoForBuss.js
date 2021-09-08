import React, { useState } from "react"
import './styles.css'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Input } from 'antd'
import { NavLink } from "react-router-dom"
import UploadImg from "../../components/UploadImg"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { strings } from "../../localization/localization"
import { UserOutlined } from "@ant-design/icons"

const { TextArea } = Input;
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CompanyInfoForBuss = ({ formData, navigation, onSignUp, setCompanyDescription, setOpen,setCompanyLogo,setCompanyLogoFile, setCompanyName, open }) => {

    const [companyImage, setCompanyImage] = useState("/assets/freelancer_pro/defual_img.png")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const { company_description,company_name } = formData;
    console.log(onSignUp)

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


    return (
        <div className="sing-up personal">
            <Container>
                <Row>
                    <Col lg={7} md={7} sm={12} xs={12} className="left-side">
                        <h2 className="mt-5 mb-3">{strings.companyInfor}</h2>
                        <p>
                            {strings.companyInforDis}
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%" />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side company">
                        <div style={{ marginTop: '7em' }}>
                            <div className="choose-img">
                                <div className="seleted-img">
                                    <img src={companyImage} width="100%" alt="..." />
                                </div>
                                <Form.Group controlId="formFileMultiple">
                                    <Form.Label className="mt-4">{strings.chooseImage}</Form.Label><br />
                                    <Form.Control type="file" multiple
                                     onChange={(e) => {
                                        let url = URL.createObjectURL(e.target.files[0]);
                                        setCompanyLogoFile(e.target.files[0]);
                                        setCompanyLogo(url);
                                        setCompanyImage(url);
                                      }}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div style={{ marginTop: '2em' }}></div>
                        <h6 className="label">{strings.companyName}</h6>
                        <Input
                            value={company_name}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder={strings.companyName}
                            // prefix={<UserOutlined />}
                        />
                        <h6 className="label">{strings.company_description}</h6>
                        <TextArea placeholder={strings.company_description}
                            value={company_description}
                            onChange={(e) => setCompanyDescription(e.target.value)}
                            style={{ height: '110px', borderRadius: '10px' }} />
                        <div className="btn-next-pre my-5">
                            <div>
                                <Button onClick={navigation.previous} variant="warning">{strings.previous}</Button>
                            </div>
                            <div>
                                <NavLink to="/">
                                    <Button variant="warning" onClick={onSignUp}>{strings.signUp}</Button>
                                </NavLink>
                                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="error">
                                        Plese check your information again!
                                    </Alert>
                                </Snackbar>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
