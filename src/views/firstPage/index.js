import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Sahakkalogin from "../../auth/login/Sahakkalogin";
import NavMenu from "../../components/firstPage/NavHome";
import Footer from "../../components/Footer";
import Home from "./Home";
import AboutUs from "../AboutUs";
import LearnMoreFree from "./LearnMoreFree";
import LearnMoreBus from "./LearnMoreBus";
import MultiStepFormRegister from "../../auth/MultiStepFormRegister";
import ScrollToTop from "../../components/ScrollToTop";
import Freelancer from "./Freelancer";
import FreelancerPage from "../freelancer";
import BusinessOwnerPage from "../BusinessOwner"
import FreeCardDetail from "../BusinessOwner/FreeCardDetail";
import FreeProfileDetail from "../BusinessOwner/FreeProfileDetail";
import Project from "./Project";
import BsProfileDetail from "../freelancer/BsProfileDetail";
import BsCardDetail from "../freelancer/BsCardDetail";

function FirstPage() {



  return (
    <div>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/login">
              <NavMenu />
              <Sahakkalogin />
            </Route>
            <Route path="/freelancer">
              <FreelancerPage />
            </Route>
            <Route path="/business">
              <BusinessOwnerPage />
            </Route>
            <Route path="/signup">
              <NavMenu />
              <MultiStepFormRegister />
            </Route>
            <Route path="/aboutus">
              <NavMenu />
              <AboutUs />
              <Footer />
            </Route>
            <Route path="/learnmore_free">
              <NavMenu />
              <LearnMoreFree />
              <Footer />
            </Route>
            <Route path="/freelan_service/:category">
              <NavMenu />
              <Freelancer />
              <Footer />
            </Route>
            <Route path="/freelancer_card_detail/:id">
              <NavMenu />
              <FreeCardDetail />
              <Footer />
            </Route>
            <Route path="/freelancer_profile_detail/:id">
              <NavMenu />
              <FreeProfileDetail />
              <Footer />
            </Route>
            <Route path="/project/:category">
              <NavMenu />
              <Project />
              <Footer />
            </Route>
            <Route path="/bs_profile/:id">
              <NavMenu />
              <BsProfileDetail />
              <Footer />
            </Route>
            <Route path="/bs_card_detail/:id">
              <NavMenu />
              <BsCardDetail />
              <Footer />
            </Route>
            <Route path="/learnmore_bus">
              <NavMenu />
              <LearnMoreBus />
              <Footer />
            </Route>
            <Route exact path={["/firstPage", "/"]}>
              <NavMenu />
              <Home />
              <Footer />
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default FirstPage;
