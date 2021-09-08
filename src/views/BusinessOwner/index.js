import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// ----------Component--------------
import NavMenu from "../../components/BusinessOwner/NavMenu";
import NavHome from "../../components/firstPage/NavHome";
import Feed from "./Feed";
import Footer from "../../components/Footer";
import PostProjectDetail from "./PostProjectDetail";
import ProfileDetail from "./ProfileDetail";
import PostProject from "./PostProject";
import EditeProfile from "./EditeProfile";
import SearchFreelancer from "./SearchFreelancer";
import FreeCardDetail from "./FreeCardDetail";
import FreeProfileDetail from "./FreeProfileDetail";
import AboutUs from "../AboutUs";
import ScrollToTop from "../../components/ScrollToTop";
import Home from "../firstPage/Home";
import Sahakkalogin from "../../auth/login/Sahakkalogin";

function BusinessOwner() {
  return (
    <div>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/project_detail/:id">
              <NavMenu />
              <PostProjectDetail />
            </Route>
            <Route path="/profile_detail/:id">
              <NavMenu />
              <ProfileDetail />
            </Route>
            <Route path={["/post_project/:post_id","/post_project"]}>
              <NavMenu />
              <PostProject/>
            </Route>
            <Route path="/profile_edit/:id">
              <NavMenu />
              <EditeProfile />
            </Route>
            <Route path="/freelan_service/:category">
              <NavMenu />
              <SearchFreelancer />
            </Route>
            <Route path="/freelancer_card_detail/:id">
              <NavMenu />
              <FreeCardDetail />
            </Route>
            <Route path="/freelancer_profile_detail/:id">
              <NavMenu />
              <FreeProfileDetail />
            </Route>
            <Route path="/aboutus">
              <NavMenu />
              <AboutUs />
            </Route>
            <Route path="/">
              <NavMenu />
              <Feed />
            </Route>
            <Route path="/login">
              <NavMenu />
              <Sahakkalogin />
            </Route>
          </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </div>
  );
}

export default BusinessOwner;
