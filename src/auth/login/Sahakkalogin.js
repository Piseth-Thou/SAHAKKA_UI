import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./styles.css";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import LoginWithFacebook from "./LoginWithFacebook";
import LoginWithGoogle from './LoginWithGoogle'
import { handleLogin } from "../../services/authService";
import { useHistory } from "react-router";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { strings } from "../../localization/localization"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Sahakkalogin = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()


  const onLogin = (e) => {
    console.log(setOpen)
    setIsLoading(true)
    e.preventDefault()
    handleLogin(email, password).then(
      success => {
        if (success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${strings.successfullyLogin}`,
            showConfirmButton: false,
            timer: 3500
          })
          // history.push('/')
          let checkRole = JSON.parse(localStorage.getItem('role'))

          console.log('Check', checkRole);
          if (checkRole === 'Freelancer') {
            history.push('/freelancer')
          } else {
            history.push('/business')
          }
        }
        setOpen(true)

      }

    )
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



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
    const validateBtn = () => {
        if (
          email !== "" &&
          // password !== ""
          password.length > 2 && password.length < 24
          
        ) {
          return false;
        } else {
          return true;
        }
    };

  return (
    <div>
      <Container>
        <Row className="log-in">
          <Col lg={7} md={7} sm={12} xs={12} className="left-side">
            <h2 className="mb-4">{strings.login}</h2>
            <p>
              {strings.welcome} !<br /> {strings.loginDis}
            </p>
            <img src="./assets/auth_img/login.png" className="log-pic"></img>
          </Col>
          <Col lg={5} md={5} sm={12} xs={12} className="right-side">
            <Form
              initialValues={{ remember: true }}
              {...formItemLayout}
              layout={formLayout}
            >
              <Form.Item
                label={strings.email}
                name="email"
                rules={[
                  {
                    type: "email", message: `${strings.validEmail}`
                  },
                  {
                    required: true, message: `${strings.pleaseInPutEM}`
                  },
                ]}
              >
                <Input type="email"
                  placeholder={strings.email}
                  prefix={<MailOutlined />}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}

                />
              </Form.Item>
              <Form.Item
                label={strings.password}
                name="password"
                rules={[
                  {
                    required: true, message: `${strings.pleaseInPutPassword}`
                  },
                  {
                    min: 3, message: `${strings.minPassword}`,
                  },
                  {
                    max: 25, message: `${strings.maxPassword}`,
                  }
                ]}
              >
                <Input.Password
                  placeholder={strings.password}
                  prefix={<LockOutlined />}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Item><br/>
              <a href="#" className="forgotPassword">{strings.forgotPassword}</a>
              <Form.Item>
                <a href="#">
                  <Button type="default" onClick={onLogin} disabled={validateBtn()} shape="round" htmlType="submit">
                    {strings.login}
                  </Button>
                  <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                      Incorrect username or password
                    </Alert>
                  </Snackbar>
                </a>
              </Form.Item>

              {/* --------fb, google login-------- */}
              <br />
              <LoginWithFacebook /><br />
              <div className="google-log">
                <LoginWithGoogle />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sahakkalogin;