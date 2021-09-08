import React, { useState, useEffect, useContext } from 'react'
import './styles.css'
import { GlobalOutlined } from '@ant-design/icons'
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { strings } from '../../localization/localization';
import { LangContext } from '../../utils/langContext'
import Media from 'react-media'
import { Dropdown, Menu } from 'antd'
import { logout } from '../../services/authService'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Img } from 'react-image'


function NavBar() {
    const [search, setSearch] = useState("");
    const history = useHistory();

    const [language, setLanguage] = useState([
        {
            title: `${strings.khmer}`,
            key: "km"
        },
        {
            title: `${strings.english}`,
            key: "en"
        }
    ])
    const context = useContext(LangContext)
    useEffect(() => {
        strings.setLanguage(localStorage.getItem("km"))
        context.setLang(localStorage.getItem("km"))
    }, [])
    const change = (km) => {
        strings.setLanguage(km)
        context.setLang(km)
        localStorage.setItem('km', km)
    }

    const user = useRef({})
    user.current = JSON.parse(localStorage.getItem("user"));

    function onLogOut() {
        logout()
        setTimeout(() => {
            window.location.reload(false);
        }, 200)
    }
    const styleMenu = {
        marginTop: '0.5em',
        textDecoration: 'none',
    }
    const menu = (
        <Menu style={{ marginTop: '0.5em' }} >
            <Menu.Item key="1">
                <Link to="/freelan_service/web_development"
                    style={styleMenu}>
                    Web & Mobile Design
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/freelan_service/backend_development"
                    style={styleMenu}> BackEnd Developement</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/freelan_service/game_design"
                    style={styleMenu}>Game Design</Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/freelan_service/logo_design"
                    style={styleMenu}>Logo Design</Link>
            </Menu.Item>
            <Menu.Item key="5">
                <Link to="/freelan_service/application_development"
                    style={styleMenu}>Android Application Developement</Link>
            </Menu.Item>
            <Menu.Item key="6">
                <Link to="/freelan_service/all"
                    style={styleMenu}> {strings.all}</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Media query={{ maxWidth: 1023 }}>
            {matches =>
                matches ? (
                    <div className="header">
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand as={NavLink} to="/business" className="ms-4">
                                <img src="./logo.png" alt="no logo show" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" >
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder={strings.searchFree}
                                        className="mr-2"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button variant="outline-success" onClick={() => history.push(`/freelan_service/${search}`)}>{strings.search}</Button>
                                </Form>
                                <Nav
                                    className="mr-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link as={NavLink} to="/business" exact={true}>{strings.dashboard}</Nav.Link>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            {strings.categories}
                                        </Button>
                                    </Dropdown>
                                    <Nav.Link as={NavLink} to="/post_project">{strings.postProject}</Nav.Link>
                                    {/* <Nav.Link>{strings.message}</Nav.Link> */}
                                </Nav>
                                <span><GlobalOutlined style={{ fontSize: '17px', position: 'absolute', marginLeft: '0px', marginTop: '10px' }} /></span>
                                <NavDropdown title={strings.title} id="basic-nav-dropdown" style={{ marginLeft: '10px' }}>
                                    {
                                        language.map((lang, index) =>
                                            <NavDropdown.Item key={index} onClick={() => change(lang.key)}>
                                                {lang.title}
                                            </NavDropdown.Item>
                                        )
                                    }
                                </NavDropdown>
                                <div className="accout-icoin">
                                    <img className="me-2" src={user.current.profile_image ? user.current.profile_image : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt=".." />
                                    <div className="acc-over">
                                        <li><NavLink to={"/profile_detail/" + user.current.id}>{strings.viewProfile}</NavLink></li>
                                        <li><NavLink to="/" onClick={() => onLogOut()} >{strings.logOut}</NavLink></li>
                                    </div>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>

                ) : (
                    <div className="header">
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand as={NavLink} to="/business" className="ms-4">
                                <img src="./logo.png" alt="no logo show" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" >
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder={strings.searchFree}
                                        className="mr-2"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button variant="outline-success" onClick={() => history.push(`/freelan_service/${search}`)}>{strings.search}</Button>
                                </Form>
                                <Nav
                                    className="mr-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link as={NavLink} to="/business" exact={true}>{strings.dashboard}</Nav.Link>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            {strings.categories}
                                        </Button>
                                    </Dropdown>
                                    <Nav.Link as={NavLink} to="/post_project">{strings.postProject}</Nav.Link>
                                    {/* <Nav.Link>{strings.message}</Nav.Link> */}
                                </Nav>
                            </Navbar.Collapse>
                            <Nav className="me-4">
                                <span><GlobalOutlined style={{ fontSize: '17px', position: 'absolute', marginLeft: '0px', marginTop: '13px' }} /></span>
                                <NavDropdown className="mt-1" title={strings.title} id="basic-nav-dropdown">
                                    {
                                        language.map((lang, index) =>
                                            <NavDropdown.Item key={index} onClick={() => change(lang.key)}>
                                                {lang.title}
                                            </NavDropdown.Item>
                                        )
                                    }
                                </NavDropdown>
                                <div className="accout-icoin">
                                <Img className="me-4" src={[`${user?.current.profile_image} `, '../assets/freelancer_pro/no-pro.png']} />
                                    <div className="acc-over">
                                        <li><NavLink to={"/profile_detail/" + user.current.id}>{strings.viewProfile}</NavLink></li>
                                        <li><NavLink to="/" onClick={() => onLogOut()} >{strings.logOut}</NavLink></li>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar>
                    </div>
                )
            }
        </Media>
    )
}

export default NavBar
