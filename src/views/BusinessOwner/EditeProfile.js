import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Tabs, Input } from 'antd';
import {
    FacebookOutlined, SendOutlined, TwitterOutlined, LinkedinOutlined
} from '@ant-design/icons'
import UploadImg from '../../components/UploadImg';
import { strings } from '../../localization/localization'
import { onFetchBusinessOwnerById } from '../../redux/actions/accountAction';
import { fetchBusinessOwnerById, updateProfileBussiness, deactivateAccount, resetPassword } from '../../services/accoutService';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { logout } from '../../services/authService'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router";
import { uploadImage } from '../../services/uploadImageService';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const { TabPane } = Tabs;
const { TextArea } = Input;

function EditeProfile() {

    const [social_media, setSocialMedia] = useState([]);
    const [facebook, setFacebook] = useState('');
    const [telegram, setTelegram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkIn, setLinkIn] = useState('');

    const [username, setUsername] = useState("")
    const [address, setAddress] = useState("");
    const [company_contact, setCompanyContact] = useState('');
    const [company_des, setCompanyDescription] = useState('');
    // const [business_description, setBusinessDescription] = useState('');
    const [company_location, setCompanyLocation] = useState('');
    const [company_logo, setCompanyLogo] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [nationality, setNationality] = useState('');
    const [profile_image, setProfileImage] = useState('');
    const [telephone, setTelephone] = useState('');
    const [gender, setGender] = useState('');
    const [officailEmail, setOfficialEmail] = useState('');
    const [skills, setSkills] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("/assets/freelancer_pro/defual_img.png");
    const [imageFileCompany, setImageFileCompany] = useState(null);
    const [imageUrlCompany, setImageUrlCompany] = useState("/assets/freelancer_pro/defual_img.png");

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();
    const { accounts } = useSelector((state) => state.accoutReducer)
    const [passwordField, setPasswordField] = useState("");
    const [passwordFieldOld, setPasswordFieldOld] = useState("");
    const [passwordFieldNew, setPasswordFieldNew] = useState("");
    const [passwordFieldCon, setPasswordFieldCon] = useState("");
    const history = useHistory()

    useEffect(() => {
        dispatch(onFetchBusinessOwnerById(id));

        if (id) {
            fetchBusinessOwnerById(id).then((e) => {
                if (e) {
                    setUsername(e?.user.username);
                    setNationality(e?.user.nationality);
                    setAddress(e?.user.address);
                    setBio(e?.user.bio);
                    setTelephone(e?.user.telephone);
                    setSocialMedia(e?.user.social_media);
                    setCompanyContact(e?.user.company_contact);
                    setCompanyName(e?.user.company_name);
                    setNationality(e?.user.nationality);
                    setOfficialEmail(e?.user.official_email)
                    setImageUrl(e?.user.profile_image);
                    setImageUrlCompany(e?.user.company_logo);
                    setSkills(e?.user.skills);
                    setFacebook(e?.user.social_media[0])
                    setTelegram(e?.user.social_media[1])
                    setLinkIn(e?.user.social_media[2])
                    setTwitter(e?.user.social_media[3])
                }
            })
        }
    }, []);
    const updateProfileBS = async (e) => {
        e.preventDefault();
        console.log("test socieal media ",
            facebook,
            telegram,
            twitter,
            linkIn)
        let profileData = {
            bio,
            business_description : company_des,
            company_contact,
            company_location,
            company_name,
            address,
            nationality,
            officailEmail,
            profile_image: imageUrl,
            company_logo:imageUrlCompany,
            skills,
            username,
            telephone,
            social_media: [
                facebook,
                telegram,
                linkIn,
                twitter
            ],
        }
        if (imageFile) {
            let url = await uploadImage(imageFile);
            profileData.profile_image = url;
        } else {
            profileData.profile_image = imageUrl
        }
        if (imageFileCompany) {
            let url = await uploadImage(imageFileCompany);
            profileData.company_logo = url;
        } else {
            profileData.company_logo = imageUrlCompany
        }

        updateProfileBussiness(profileData).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${strings.proFileUpdated}`,
                showConfirmButton: false,
                timer: 4000
            })
        })
    }

    const onDeactiveAccount = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        deactivateAccount(password).then(
            success => {
                if (success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${strings.disAcc}`,
                        showConfirmButton: false,
                        timer: 3500
                    })
                    history.push('/login')
                    // logout()
                    // setTimeout(() => {
                    //     window.location.reload(false);
                    // }, 200)
                } else {
                    setOpen(true)
                }
            }

        )
    };

    const onResetPassword = async (e) => {
        e.preventDefault();
        let ResetForm = {
            newPassword,
            oldPassword,
            confirmPassword,
        }

        resetPassword(ResetForm).then(
            (isSuccess) => {
                if (isSuccess) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្ដូរ',
                        showConfirmButton: false,
                        timer: 4000
                    })
                } else {
                    setOpen(true)
                }
            });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onResetPass = () => {
        if (passwordFieldOld !== "" && passwordFieldNew !== "" && passwordFieldCon !== "") {
            return false;
        } else { return true }
    }
    console.log("Account", accounts);
    return (
        <div className="edit-pro mt-5">
            <Container>
                <Tabs type="card">
                    <TabPane tab={strings.personalInfo} key="1">
                        <Row className="mt-4">
                            <Col lg={5} md={5} className="mb-3">
                                <div className="choose-img">
                                    <div className="seleted-img">
                                        <img src={imageUrl} width="100%" alt="..." />
                                    </div>
                                    <Form.Group controlId="formFileMultiple">
                                        <Form.Label className="mt-4">{strings.chooseImage}</Form.Label><br />
                                        <Form.Control
                                            type="file" multiple
                                            onChange={(e) => {
                                                let url = URL.createObjectURL(e.target.files[0]);
                                                setImageFile(e.target.files[0]);
                                                setImageUrl(url);
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col lg={7} md={7}>
                                <h5 className="mb-4">{strings.personalInfo}</h5>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12">{strings.fullName}</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.fullName}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12">{strings.nationality}</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.nationality}
                                            value={nationality}
                                            onChange={(e) => setNationality(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12">{strings.address}</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.address}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12">Bio</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder="Bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <div className="my-5">
                                    <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                    <Button variant="warning" onClick={updateProfileBS} className="float-end">{strings.update}</Button>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={strings.contactInfo} key="2">
                        <Row className="mt-4">
                            <Col lg={5} md={5} className="mb-3">
                                <img src="../assets/freelancer_pro/cover-edit.png" width="100%" alt=".." />
                            </Col>
                            <Col lg={7} md={7}>
                                <h5 className="mb-4">{strings.contactInfo}</h5>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12">{strings.telephone}</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.telephone}
                                            value={telephone}
                                            onChange={(e) => setTelephone(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12">{strings.officailEmail}</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.officailEmail}
                                            value={officailEmail}
                                            onChange={(e) => setOfficialEmail(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12"><FacebookOutlined style={{ fontSize: '25px', color: '#3b5998' }} /></Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.facebookAccount}
                                            value={facebook}
                                            onChange={(e) => setFacebook(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12"><SendOutlined style={{ fontSize: '25px', color: '#0088cc', transform: 'rotate(-20deg)' }} /></Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.telegramAccount}
                                            value={telegram}
                                            onChange={(e) => setTelegram(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12"><TwitterOutlined style={{ fontSize: '25px', color: '#1DA1F2' }} /></Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.TwitterAccount}
                                            value={twitter}
                                            onChange={(e) => setTwitter(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12"><LinkedinOutlined style={{ fontSize: '25px', color: '#0077b5' }} /></Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.linkInAccount}
                                            value={linkIn}
                                            onChange={(e) => setLinkIn(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <div className="my-5">
                                    <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                    <Button variant="warning" onClick={updateProfileBS} className="float-end">{strings.update}</Button>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={strings.companyInfor} key="3">
                        <Row className="mt-4 company-info">
                            <Col lg={5} md={5} className="mb-3">
                                <div className="choose-img">
                                    <div className="seleted-img">
                                        <img src={imageUrlCompany} width="100%" alt="..." />
                                    </div>
                                    <Form.Group controlId="formFileMultiple">
                                        <Form.Label className="mt-4">{strings.chooseImage}</Form.Label><br />
                                        <Form.Control type="file" multiple
                                            onChange={(e) => {
                                                let url = URL.createObjectURL(e.target.files[0]);
                                                setImageFileCompany(e.target.files[0]);
                                                setImageUrlCompany(url);
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col lg={7} md={7}>
                                <div className="mb-4"></div>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="12" md="12">{strings.companyName}</Form.Label>
                                    <Col xl="12" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.companyName}
                                            value={company_name}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <p>{strings.companyInfor}</p>
                                <TextArea
                                    value={company_name}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder={strings.companyInfo} style={{ height: '12em' }}
                                />
                                <div className="my-5">
                                    <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                    <Button variant="warning" className="float-end" onClick={updateProfileBS}>{strings.update}</Button>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={strings.accountSetting} key="4">
                        <Row className="mt-4">
                            <Col lg={5} md={5} className="mb-3">
                                <img src="../assets/freelancer_pro/cover-edit.png" width="100%" alt=".." />
                            </Col>
                            <Col lg={7} md={7}>
                                <Tabs type="card">
                                    <TabPane tab={strings.deactivateAccount} key="4.1">
                                        <h5 className="my-4">{strings.deactivateAccount}</h5>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column xl="2" md="12"><span style={{ color: '#ff4d4f' }}>*</span>{strings.password}</Form.Label>
                                            <Col xl="10" md="12">
                                                <Form.Control
                                                    type="password"
                                                    placeholder={strings.password}
                                                    value={password}
                                                    onChange={(e) => { setPassword(e.target.value); setPasswordField(e.target.value) }}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <div className="float-end">
                                            <a className="login-form-forgot" href=" ">
                                                {strings.forgotPassword}
                                            </a>
                                        </div><br />
                                        <div className="my-4 ps-4">
                                            <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                            <Button variant="danger" className="float-end" onClick={onDeactiveAccount} disabled={!passwordField}>{strings.deactivate}</Button>
                                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="error">
                                                    ពាក្យសម្ងាត់របស់លោកអ្នកមិនត្រឹមត្រូវទេ សូមព្យាយាមម្ដងទៀត!
                                                </Alert>
                                            </Snackbar>
                                        </div>
                                    </TabPane>
                                    <TabPane tab={strings.resetPassword} key="4.2" className="reset-ps">
                                        <h5 className="my-4">{strings.resetPassword}</h5>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column xl="2" md="12"><span style={{ color: '#ff4d4f' }}>*</span>{strings.oldPassword}</Form.Label>
                                            <Col xl="10" md="12">
                                                <Form.Control
                                                    type="password"
                                                    placeholder={strings.oldPassword}
                                                    value={oldPassword}
                                                    onChange={(e) => { setOldPassword(e.target.value); setPasswordFieldOld(e.target.value) }}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column xl="2" md="12"><span style={{ color: '#ff4d4f' }}>*</span>{strings.newPassword}</Form.Label>
                                            <Col xl="10" md="12">
                                                <Form.Control
                                                    type="password"
                                                    placeholder={strings.newPassword}
                                                    value={newPassword}
                                                    onChange={(e) => { setNewPassword(e.target.value); setPasswordFieldNew(e.target.value) }}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column xl="2" md="12"><span style={{ color: '#ff4d4f' }}>*</span>{strings.confirmPassword}</Form.Label>
                                            <Col xl="10" md="12">
                                                <Form.Control
                                                    type="password"
                                                    placeholder={strings.confirmPassword}
                                                    value={confirmPassword}
                                                    onChange={(e) => { setConfirmPassword(e.target.value); setPasswordFieldCon(e.target.value) }}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <div className="my-5 ps-1">
                                            <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                            <Button variant="warning" className="float-end" onClick={onResetPassword} disabled={onResetPass()}>{strings.update}</Button>
                                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="error">
                                                    ពាក្យសម្ងាត់រចាស់បស់លោកអ្នកមិនត្រឹមត្រូវទេ សូមព្យាយាមម្ដងទៀត!
                                                </Alert>
                                            </Snackbar>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Container>
        </div>
    )
}

export default EditeProfile
