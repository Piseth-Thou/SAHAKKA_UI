import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Media from "react-media";
import { strings } from "../../localization/localization";
import { header } from "../../utils/header";
import { Img } from 'react-image'
import BsCard from '../../components/freelancer/BsCard'
import { useDispatch, useSelector } from "react-redux";
import { onFetchProjectPosts, onFetchProjectPostByCategory } from "../../redux/actions/projectPostAction";
import { Spin } from 'antd'
// import { useParams , useLocation} from 'react-router-dom'

function Feed() {

  let query = useQuery();
  let cate = query.get("category");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectPosts, isLoading } = useSelector((state) => state.projectPostReducer);
  /*--------Here is where we can get current user login----------*/
  const user = useRef({});
  user.current = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(onFetchProjectPostByCategory(category));
  }, [category]);

  useEffect(() => {
    setCategory(cate);
  }, [cate]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <div className="free-feed">
      <Container className="pt-5">
        <Row className="mb-5">
          <Col lg={6} md={6} sm={12} xs={12}>
            <h1 className="welcome-title">
              {strings.welcome} {user.current.username} !
            </h1>
            <p>{strings.freelancerFeedDesc}</p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <img
              className="image-tl"
              src="../assets/freelancer_pro/feed_cover.png"
              alt="Feed img"
              width="100%"
            />
          </Col>
        </Row>
        <Media query={{ maxWidth: 769 }}>
          {(matches) =>
            matches ? (
              <Row>
                <Col md={6} sm={12} xs={12}>
                  <Row className="sticky revers">
                    <Col md={12}>
                      <h5 className="mb-4 title-cat">{strings.myCategories}</h5>
                      <div className="categories">
                        <Button variant="warning">
                          <Link to="/search_project?category=web_development">Web & Mobile Design</Link>
                        </Button>
                        <Button variant="warning">
                          <Link to="/search_project?category=backend_development">BackEnd Developement</Link>
                        </Button>
                        <Button variant="warning">
                          <Link to="/search_project?category=game_design">Game Design</Link>
                        </Button>
                        <Button variant="warning">
                          <Link to="/search_project?category=logo_design">Logo Design</Link>
                        </Button>
                        <Button variant="warning">
                          <Link to="/search_project?category=app_development">Android Application Developement</Link>
                        </Button>
                        <Link to="/search_project?category">
                          <Button variant="secondary" className="btn-edit">{strings.all}</Button>
                        </Link>
                      </div>
                    </Col>
                    <Col md={12}>
                      <h5 className="my-4">{strings.myProfile}</h5>
                      <div className="my-profile">
                        <div className="d-flex mb-2">
                          <div className="profile-thumbnail">
                            <Img
                              className="me-4"
                              src={[`${user.current.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']}
                              alt=".."
                            />
                          </div>
                          <h6 className="mt-2">
                            {user.current.username}
                            <br />
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#ffb000",
                              }}
                            >
                              {user.current.skills}
                            </span>
                          </h6>
                        </div>
                        <p style={{ padding: "8px" }}>
                          {user.current.bio}
                        </p>
                        <Button onClick={() => history.push('/profile/' + user.current.id)} variant="warning">
                          {strings.viewProfile}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <h5 className="mb-4 my-feed-titile">{strings.myfeeds}</h5>
                  <div className="my-feed">
                    {!isLoading ?
                      projectPosts.map((projectPost) =>
                        projectPost.payload.map((value) =>
                          <>
                            <BsCard key={value.postId} projectPost={value} /><br />
                          </>
                        )
                      )
                      : <div className="text-center">
                        <Spin tip="Loading..." style={{ color: '#ffb000' }}></Spin>
                      </div>
                    }
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col lg={4} md={6}>
                  <div className="sticky pb-2">
                    <h5 className="mb-4 title">{strings.myCategories}</h5>
                    <div className="categories">
                      <Button variant="warning">
                        <Link to="/search_project?category=web_development">Web & Mobile Design</Link>
                      </Button>
                      <Button variant="warning">
                        <Link to="/search_project?category=backend_development">BackEnd Developement</Link>
                      </Button>
                      <Button variant="warning">
                        <Link to="/search_project?category=game_design">Game Design</Link>
                      </Button>
                      <Button variant="warning">
                        <Link to="/search_project?category=logo_design">Logo Design</Link>
                      </Button>
                      <Button variant="warning">
                        <Link to="/search_project?category=app_development">Android Application Developement</Link>
                      </Button>
                      <Link to="/search_project?category">
                        <Button variant="secondary" className="btn-edit">{strings.all}</Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col lg={5} md={6}>
                  <h5 className="mb-4">{strings.myfeeds}</h5>
                  <div className="my-feed">
                    {!isLoading ?
                      projectPosts.map((projectPost) =>
                        projectPost.payload.map((value) =>
                          <>
                            <BsCard key={value.postId} projectPost={value} /><br />
                          </>
                        )
                      )
                      : <div className="text-center">
                        <Spin tip="Loading..." style={{ color: '#ffb000' }}></Spin>
                      </div>
                    }
                  </div>
                </Col>
                <Col lg={3} md={6}>
                  <div className="sticky">
                    <h5 className="mb-4">{strings.myProfile}</h5>
                    <div className="my-profile">
                      <div className="d-flex mb-2">
                        <div className="profile-thumbnail">
                          <Img
                            className="me-4"
                            src={[`${user.current.profile_image}`, 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg']}
                            alt=".."
                          />
                        </div>
                        <h6 className="mt-2">
                          {user.current.username === "" ? "No name show" : user.current.username}
                          <br />
                          <span className="text-skill">{user.current.skills === "" ? "No skill show" : user.current.skills}</span>
                        </h6>
                      </div>
                      <p style={{ padding: "8px" }}>{user.current.bio === "" ? "No bio show" : user.current.bio}</p>
                      <Button onClick={() => history.push('/profile/' + user.current.id)} variant="warning">
                        {strings.viewProfile}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            )
          }
        </Media>
      </Container>
    </div>
  );
}

export default Feed;
