import React, { useState } from "react"
import './styles.css'
import {Container, Row , Col ,Button} from 'react-bootstrap'
import {Input ,Form } from 'antd'
import { NavLink } from "react-router-dom"
import UploadImg from "../../../components/UploadImg"

const { TextArea } = Input;

function CompanyInfo() {

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
                        <h2 className="mt-5 mb-3">Company Information</h2>
                        <p>
                        Company information is really important , since it will be the resources to clarify that the compony is legitly exist. Providing this information will let freelancers have more truth than working with anonymous figure.
                        </p>
                        <img src="./assets/auth_img/signup2.png" alt="cover" width="100%"/>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className="right-side company">     
                        <div style={{marginTop:'7em'}}>
                            <UploadImg />
                        </div>
                        <Form
                            initialValues={{ remember: true }}
                            {...formItemLayout}
                            layout={formLayout}
                            style={{marginTop:'3em'}}
                        >
                            <Form.Item
                                label="Company Information"
                                name="companyInfo"
                            >
                                <TextArea placeholder="Company Information" style={{height:'100px',borderRadius:'10px'}}/>
                            </Form.Item>
                            <div className="btn-next-pre my-5">
                                <div>
                                    <NavLink to="signup_bu_contactinfo">
                                        <Button variant="warning">Previous</Button>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to="/">
                                        <Button variant="warning">SignUp</Button>
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

export default CompanyInfo
