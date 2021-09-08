import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { Tabs, Input } from 'antd';
import {
    UserOutlined, CalendarOutlined, FlagOutlined, GlobalOutlined, PushpinOutlined
    , PhoneOutlined, MailOutlined, LockOutlined, TwitterOutlined, FacebookOutlined, LinkedinOutlined, SendOutlined
} from '@ant-design/icons'
import { strings } from '../../localization/localization';
import MyEditor from '../../components/MyEditor';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { onFetchFreelancerById } from '../../redux/actions/accountAction';
import { fetchFreelancerById, updateProfileFreelancer, deactivateAccount, resetPassword } from '../../services/accoutService';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { logout } from '../../services/authService'
import { useHistory } from "react-router";
import { uploadImage } from '../../services/uploadImageService';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const { TabPane } = Tabs;
const { TextArea } = Input;

function EditePro() {

    const [username, setUsername] = useState("")
    const [nationality, setNationality] = useState("")
    const [gender, setGender] = useState("")
    const [languages, setLanguages] = useState("")
    const [location, setLocation] = useState("");
    const [telephone, setTelephone] = useState("")
    const [officialEmail, setOfficialEmail] = useState("")
    const [skills, setSkills] = useState("")
    const [bio, setBio] = useState("")
    const [education_background, setEducationalBackground] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [achievement, setAchievement] = useState("");
    const [imageUrl, setImageUrl] = useState("/assets/freelancer_pro/defual_img.png");
    const [profile_image, setProfileImage] = useState("")
    const [imageFile, setImageFile] = useState(null);
    const [social_media, setSocialMedia] = useState([]);
    const [facebook, setFacebook] = useState('');
    const [telegram, setTelegram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkIn, setLinkIn] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()

    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordField, setPasswordField] = useState("");
    const [passwordFieldOld, setPasswordFieldOld] = useState("");
    const [passwordFieldNew, setPasswordFieldNew] = useState("");
    const [passwordFieldCon, setPasswordFieldCon] = useState("");


    const param = useParams();
    const dispatch = useDispatch();
    const { accounts } = useSelector((state) => state.accoutReducer)

    console.log("test account", setAccount);

    useEffect(() => {
        dispatch(onFetchFreelancerById(param.id));
        if (param.id) {
            fetchFreelancerById(param.id).then((e) => {
                if (e) {
                    console.log(e.user.social_media);
                    setUsername(e?.user.username);
                    setNationality(e?.user.nationality);
                    setLanguages(e?.user.languages);
                    setLocation(e?.user.location);
                    setTelephone(e?.user.telephone);
                    setOfficialEmail(e?.user.official_email);
                    setSkills(e?.user.skills);
                    setBio(e?.user.bio);
                    setLocation(e?.user.location);
                    setEducationalBackground(e?.user.educational_background);
                    setWorkExperience(e?.user.work_experience);
                    setImageUrl(e?.user.profile_image);
                    setSocialMedia(e?.user.social_media)
                    setFacebook(e?.user.social_media[0])
                    setTelegram(e?.user.social_media[1])
                    setTwitter(e?.user.social_media[2])
                    setLinkIn(e?.user.social_media[3])
                    setAchievement(e?.user.achievement);
                }
            })
        }
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        let profileData = {
            username,
            nationality,
            gender,
            languages,
            address: location,
            telephone,
            official_email : officialEmail,
            skills,
            bio,
            profile_image: imageUrl,
            achievement,
            education_background,
            work_experience : workExperience,
            social_media: [
                facebook,
                telegram,
                twitter,
                linkIn
            ],
        }
        if (imageFile) {
            let url = await uploadImage(imageFile);
            profileData.profile_image = url;
        } else {
            profileData.profile_image = imageUrl
        }

        updateProfileFreelancer(profileData).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${strings.updateAccSuccess}`,
                showConfirmButton: false,
                timer: 4000
            })
        })
    }

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


    const onDeactiveAccount = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        deactivateAccount(password).then(
            success => {
                if (success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${strings.deleteAccSuccess}`,
                        showConfirmButton: false,
                        timer: 3500
                    })
                    // logout()
                    history.push('/login')
                    // setTimeout(() => {
                    //     window.location.reload(false);
                    // }, 200)
                } else {
                    setOpen(true)
                }
            }

        )
    };
    const onResetPass = () => {
        if (passwordFieldOld !== "" && passwordFieldNew !== "" && passwordFieldCon !== "") {
            return false;
        } else { return true }
    }

    console.log("acc : ", accounts);
    return (
        <div className="edit-pro mt-5">
            <Container>
                <Tabs type="card">
                    <TabPane tab={strings.personalInfo} key="1">
                        <Row className="mt-4">
                            <Col lg={5} md={5}>
                                <div className="edit-cover-img">
                                    <div className="choose-img">
                                        <div className="seleted-img">
                                            <img src={imageUrl} width="100%" alt="..." />
                                        </div>
                                        <Form.Group controlId="formFileMultiple">
                                            <Form.Label className="mt-4">{strings.chooseProfile}</Form.Label><br />
                                            <Form.Control type="file" multiple
                                                onChange={(e) => {
                                                    let url = URL.createObjectURL(e.target.files[0]);
                                                    setImageFile(e.target.files[0]);
                                                    setImageUrl(url);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
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
                                    <Form.Label column xl="2" md="12">{strings.language}</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.language}
                                            value={languages}
                                            onChange={(e) => setLanguages(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column xl="2" md="12">{strings.address}</Form.Label>
                                    <Col xl="10" md="12">
                                        <Form.Control
                                            type="text"
                                            placeholder={strings.address}
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <div className="my-5">
                                    <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                    <Button variant="warning" onClick={updateProfile} className="float-end">{strings.update}</Button>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={strings.contactInfo} key="2">
                        <Row className="mt-4">
                            <Col lg={5} md={5}>
                                <div className="edit-cover-img">
                                    <img src="../assets/freelancer_pro/cover-edit.png" width="100%" alt=".." />
                                </div>
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
                                            value={officialEmail}
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
                                    <Button variant="warning" onClick={updateProfile} className="float-end">{strings.update}</Button>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={strings.expertiseAndBackground} key="3">
                        <Row className="mt-4">
                            <Col lg={5} md={5}>
                                <div className="edit-cover-img">
                                    <img src="../assets/freelancer_pro/cover-edit.png" width="100%" alt=".." />
                                </div>
                            </Col>
                            <Col lg={7} md={7}>
                                <h5 className="mb-4">{strings.expertiseAndBackground}</h5>
                                <div className="mb-4">
                                    <p className="title">{strings.skill}</p>
                                    <TextArea placeholder={strings.enterYourSkill} allowClear
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <p className="title">Bio</p>
                                    <TextArea placeholder={strings.enterYourBio} allowClear style={{ height: '120px' }}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <p className="title">{strings.educationalBackground}</p>
                                    <TextArea placeholder={strings.enterYourEducationalBackground} allowClear style={{ height: '120px' }}
                                        value={education_background}
                                        onChange={(e) => setEducationalBackground(e.target.value)}
                                    />
                                </div>
                                <div className="my-5">
                                    <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                    <Button variant="warning" className="float-end" onClick={updateProfile}>{strings.update}</Button>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={strings.experienceAndAchievement} key="4">
                        <Row className="mt-4">
                            <Col lg={5} md={5}>
                                <div className="edit-cover-img">
                                    <img src="../assets/freelancer_pro/cover-edit.png" width="100%" alt=".." />
                                </div>
                            </Col>
                            <Col lg={7} md={7}>
                                <h5 className="mb-4">{strings.experienceAndAchievement}</h5>
                                <div className="mb-4">
                                    <p className="title">{strings.workExperience}</p>
                                    <TextArea placeholder={strings.WorkExperience} allowClear style={{ height: '120px' }}
                                        value={workExperience}
                                        onChange={(e) => setWorkExperience(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <p className="title">{strings.achievement}</p>
                                    <TextArea placeholder={strings.achievement} allowClear style={{ height: '120px' }}
                                        value={achievement}
                                        onChange={(e) => setAchievement(e.target.value)}
                                    />
                                </div>
                                <div className="my-5">
                                    <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                    <Button variant="warning" onClick={updateProfile} className="float-end">{strings.update}</Button>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={strings.accountSetting} key="5">
                        <Row className="mt-4">
                            <Col lg={6} md={6}>
                                <div className="edit-cover-img">
                                    <img src="../assets/freelancer_pro/cover-edit.png" width="100%" alt=".." />
                                </div>
                            </Col>
                            <Col lg={6} md={6}>
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
                                            <Button variant="danger" onClick={onDeactiveAccount} className="float-end" disabled={!passwordField}>{strings.deactivate}</Button>
                                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="error">
                                                    {strings.wrongPw}
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
                                                    placeholder={strings.newPassword}
                                                    value={confirmPassword}
                                                    onChange={(e) => { setConfirmPassword(e.target.value); setPasswordFieldCon(e.target.value) }}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <div className="my-5 ps-1">
                                            <Button className="cancel" variant="warning">{strings.cancel}</Button>
                                            <Button variant="warning" onClick={onResetPassword} disabled={onResetPass()} className="float-end">{strings.update}</Button>
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
        </div >
    )
}

export default EditePro
