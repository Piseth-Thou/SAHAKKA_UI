import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import ProfileDetail from "./ProfileDetail";
import ServiceCardDetial from "./ServiceCardDetial";
import NavFree from "../../components/freelancer/NavBar";
import ServiceCardPost from "./ServiceCardPost";
import EditeProfile from "./EditeProfile";
import Feed from "./Feed";
import BsCardDetail from "./BsCardDetail";
import BsProfileDetail from "./BsProfileDetail";
import Footer from "../../components/Footer";
import AboutUs from "../AboutUs";
import ScrollToTop from "../../components/ScrollToTop";
import NavMenu from "../../components/firstPage/NavHome";
import Home from "../firstPage/Home";
import Sahakkalogin from "../../auth/login/Sahakkalogin";
import ProjectBu from '../firstPage/Project';


function Freelancer() {
  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/bs_profile/:id">
              <NavFree />
              <BsProfileDetail />
            </Route>
            <Route path="/bs_card_detail/:id">
              <NavFree />
              <BsCardDetail />
            </Route>
            <Route path="/profile/:id">
              <NavFree />
              <ProfileDetail />
            </Route>
            <Route path="/detail/:id">
              <NavFree />
              <ServiceCardDetial />
            </Route>
            <Route path={["/post_service/:id","/post_service"]}>
              <NavFree />
              <ServiceCardPost />
            </Route>
            <Route path="/profile_edit/:id">
              <NavFree />
              <EditeProfile />
            </Route>
            <Route path="/aboutus">
              <NavFree />
              <AboutUs />
            </Route>
            <Route path="/project_post/:category">
              <NavFree />
              <ProjectBu />
            </Route>
            <Route path={["/","/search_project/:category"]}>
              <NavFree />
              <Feed />
            </Route>
            <Route path="/login">
              <NavMenu />
              <Sahakkalogin />
            </Route>
            <Route path="/firstpage">
              <NavMenu />
              <Home />
            </Route>
          </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </>
  );
}

export default Freelancer;
