import React, { useState, useContext, useEffect, useRef } from 'react'
import './styles.css'
import { GlobalOutlined } from '@ant-design/icons'
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { NavLink, useHistory, Link } from 'react-router-dom'
import { strings } from '../../localization/localization'
import { LangContext } from '../../utils/langContext'
import Media from 'react-media'
import { Dropdown, Menu } from 'antd'
import { logout } from '../../services/authService'
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
    function onLogOut() {
        logout()
        setTimeout(() => {
            window.location.reload(false);
        }, 200)
    }
    const user = useRef({})
    user.current = JSON.parse(localStorage.getItem("user"));

    const styleMenu = {
        marginTop: '0.5em',
        textDecoration: 'none',
    }

    const menu = (
        <Menu style={styleMenu} >
            <Menu.Item key="1">
                <Link to="/project_post/web_development"
                    style={styleMenu}>
                    Web & Mobile Design
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/project_post/backend_development"
                    style={styleMenu}> BackEnd Developement</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/project_post/game_design"
                    style={styleMenu}>Game Design</Link>
                Game Design
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/project_post/logo_design"
                    style={styleMenu}>Logo Design</Link>
            </Menu.Item>
            <Menu.Item key="5">
                <Link to="/project_post/application_development"
                    style={styleMenu}>Android Application Developement</Link>
            </Menu.Item>
            <Menu.Item key="6">
                <Link to="/project_post/all"
                    style={styleMenu}>{strings.all}</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Media query={{ maxWidth: 1023 }}>
            {matches =>
                matches ? (
                    <div className="header">
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand as={NavLink} to="/freelancer" className="ms-4">
                                <img src="./logo.png" alt="no logo show" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder={strings.searchBu}
                                        className="mr-2"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button variant="outline-success" onClick={() => history.push(`/project_post/${search}`)} >{strings.search}</Button>
                                </Form>
                                <Nav
                                    className="mr-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link as={NavLink} to="/" exact={true}>{strings.myfeeds}</Nav.Link>
                                    <Nav.Link as={NavLink} to="/profile">{strings.dashboard}</Nav.Link>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            {strings.categories}
                                        </Button>
                                    </Dropdown>
                                    <Nav.Link as={NavLink} to="/post_service">{strings.postService}</Nav.Link>
                                    {/* <Nav.Link>{strings.message}</Nav.Link> */}
                                </Nav>
                                <Nav>
                                    <span><GlobalOutlined style={{ fontSize: '17px', position: 'absolute', marginTop: '12px' }} /></span>
                                    <NavDropdown title={strings.title} id="basic-nav-dropdown" style={{ marginLeft: '1.5em' }}>
                                        {
                                            language.map((lang, index) =>
                                                <NavDropdown.Item key={index} onClick={() => change(lang.key)}>
                                                    {lang.title}
                                                </NavDropdown.Item>
                                            )
                                        }
                                    </NavDropdown>
                                    <div className="accout-icoin">
                                        <Img className="me-4" src={[`${user?.current?.profile_image}`, '../assets/freelancer_pro/no-pro.png']} />
                                        <div className="acc-over">
                                            <li><NavLink to={"/profile/" + user?.current?.id}>{strings.viewProfile}</NavLink></li>
                                            <li><NavLink to="/" onClick={() => onLogOut()} >{strings.logOut}</NavLink></li>
                                        </div>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                ) : (
                    <div className="header freelancer">
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand as={NavLink} to="/freelancer" className="ms-4">
                                <img src="./logo.png" alt="no logo show" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" >
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder={strings.searchBu}
                                        className="mr-2"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button variant="outline-success" onClick={() => history.push(`/project_post/${search}`)} >{strings.search}</Button>
                                </Form>
                                <Nav
                                    className="mr-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link as={NavLink} to="/freelancer" exact={true}>{strings.myfeeds}</Nav.Link>
                                    <Nav.Link as={NavLink} to={"/profile/" + user?.current?.id}>{strings.dashboard}</Nav.Link>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            {strings.categories}
                                        </Button>
                                    </Dropdown>
                                    <Nav.Link as={NavLink} to="/post_service">{strings.postService}</Nav.Link>
                                    {/* <Nav.Link>{strings.message}</Nav.Link> */}
                                </Nav>
                            </Navbar.Collapse>
                            <Nav>
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
                                    <Img className="me-4" src={[`${user.current.profile_image}`, '../assets/freelancer_pro/no-pro.png']} />
                                    <div className="acc-over">
                                        <li><NavLink to={"/profile/" + user.current.id}>{strings.viewProfile}</NavLink></li>
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
