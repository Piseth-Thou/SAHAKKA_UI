import React, { useContext, useState, useEffect } from 'react'
import Media from 'react-media'
// import './freelancer/styles.css'
import { GlobalOutlined } from '@ant-design/icons'
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { strings } from '../../localization/localization';
import { LangContext } from '../../utils/langContext';
import { Dropdown, Menu } from 'antd'
import { Img } from 'react-image'


function NavMenu() {

    const [search, setSearch] = useState("");
    const history = useHistory();

    const [language, _] = useState([
        {
            title: "Khmer",
            key: "km"
        },
        {
            title: "English",
            key: "en"
        }
    ])

    // useEffect(() => {
    //     strings.setLanguage(localStorage.getItem("km"))
    //     context.setLang(localStorage.getItem("km"))
    // }, [])

    const context = useContext(LangContext)
    const change = (km) => {
        strings.setLanguage(km)
        context.setLang(km)
        localStorage.setItem('km', km)
    }

    const styleMenu = {
        marginTop: '0.5em',
        textDecoration: 'none',
    }

    const menuProject = (
        <Menu style={styleMenu} >
            <Menu.Item key="1">
                <Link to="/project/web_development"
                    style={styleMenu}>
                    Web & Mobile Design
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/project/backend_development"
                    style={styleMenu}> BackEnd Developement</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/project/game_design"
                    style={styleMenu}>Game Design</Link>
                Game Design
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/project/logo_design"
                    style={styleMenu}>Logo Design</Link>
            </Menu.Item>
            <Menu.Item key="5">
                <Link to="/project/application_development"
                    style={styleMenu}>Android Application Developement</Link>
            </Menu.Item>
            <Menu.Item key="6">
                <Link to="/project/all"
                    style={styleMenu}>{strings.all}</Link>
            </Menu.Item>
        </Menu>
    );

    const menuFreelancer = (
        <Menu style={styleMenu} >
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
                            <Navbar.Brand as={NavLink} to="/" className="me-4">
                                <Img src={["./logo.png", "../logo.png"]} />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" >
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder={strings.searchFree}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="mr-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success" onClick={() => history.push(`/freelan_service/${search}`)}>{strings.search}</Button>
                                </Form>
                                <Nav
                                    className="mr-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link as={NavLink} to="/" exact={true}>{strings.overview}</Nav.Link>
                                    <Dropdown overlay={menuProject}>
                                        <Button>
                                            {strings.project}
                                        </Button>
                                    </Dropdown>
                                    <Dropdown overlay={menuFreelancer}>
                                        <Button>
                                            Freelancer
                                        </Button>
                                    </Dropdown>
                                    <Nav.Link as={NavLink} to="/aboutus">{strings.aboutUs}</Nav.Link>
                                </Nav>
                                <span><GlobalOutlined /></span>
                                <NavDropdown title={strings.title} id="basic-nav-dropdown" style={{ margin: '0 0 10px 15px' }}>
                                    {
                                        language.map((lang, index) =>
                                            <NavDropdown.Item key={index} onClick={() => change(lang.key)}>
                                                {lang.title}
                                            </NavDropdown.Item>
                                        )
                                    }
                                </NavDropdown>
                                <div className="mt-1" className="me-4">
                                    <NavLink to="/login">
                                        <Button variant="outline-success" className="login">{strings.login}</Button>
                                    </NavLink>
                                    <NavLink to="/signup">
                                        <Button variant="outline-success" className="register">{strings.register}</Button>
                                    </NavLink>
                                </div>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                ) : (
                    <div className="header">
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand as={NavLink} to="/" className="ms-4">
                                <Img src={["./logo.png", "../logo.png"]} />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" >
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder={strings.searchFree}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="mr-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success" onClick={() => history.push(`/freelan_service/${search}`)}>{strings.search}</Button>
                                </Form>
                                <Nav
                                    className="mr-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link as={NavLink} to="/" exact={true}>{strings.overview}</Nav.Link>
                                    <Dropdown
                                        overlay={menuProject}
                                    >
                                        <Button>
                                            {strings.project}
                                        </Button>
                                    </Dropdown>
                                    <Dropdown overlay={menuFreelancer}>
                                        <Button>
                                            Freelancer
                                        </Button>
                                    </Dropdown>
                                    <Nav.Link as={NavLink} to="/aboutus">{strings.aboutUs}</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            <Nav>
                                <span><GlobalOutlined style={{ fontSize: '17px', position: 'absolute', marginLeft: '0px', marginTop: '10.5px' }} /></span>
                                <NavDropdown title={strings.title} id="basic-nav-dropdown">
                                    {
                                        language.map((lang, index) =>
                                            <NavDropdown.Item key={index} onClick={() => change(lang.key)}>
                                                {lang.title}
                                            </NavDropdown.Item>
                                        )
                                    }
                                </NavDropdown>
                                <div className="mt-1 me-4 ">
                                    <NavLink to="/login">
                                        <Button variant="outline-success" className="login">{strings.login}</Button>
                                    </NavLink>
                                    <NavLink to="/signup">
                                        <Button variant="outline-success" className="register">{strings.register}</Button>
                                    </NavLink>
                                </div>
                            </Nav>
                        </Navbar>
                    </div>
                )
            }
        </Media>
    )
}

export default NavMenu
