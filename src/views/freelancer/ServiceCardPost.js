import React, { useEffect, useState, useCallback } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Input, Select } from "antd";
import Media from "react-media";
import { useParams } from "react-router";
import UploadImg from "../../components/UploadImg";
import { strings } from "../../localization/localization";
// import { insertServicePost, ServicePost, } from "../../services/postService";
import { onFetchCategories } from "../../redux/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, updateServicePostById, insertServicePost } from "../../services/postService"
import { uploadImage } from "../../services/uploadImageService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { useHistory } from "react-router";

const { TextArea } = Input;
const { Option } = Select;

function ServiceCardPost() {

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postStatusAsNormal, setPostStatusAsNormal] = useState("normal");
  const [postStatusAsDraft, setPostStatusAsDraft] = useState("draft");
  const [categories, setCategories] = useState("");
  const [imageUrl, setImageUrl] = useState("/assets/freelancer_pro/defual_img.png");
  const [imageFile, setImageFile] = useState(null);
  const [dCategory, setDCategory] = useState();
  const [defaultCategory, setDefaultCategory] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const allCategories = useSelector((state) => state.categoryReducer.categories);
  const { id } = useParams();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    dispatch(onFetchCategories());

    if (id) {
    } else {
      setDCategory([])
    }

  }, []);

  useEffect(() => {
    dispatch(onFetchCategories());

    if (id) {
      fetchPostById(id).then((e) => {
        if (e) {
          console.log(e.service_post_categories, "fetch");
          setPostTitle(e?.title);
          setPostDescription(e?.post_description);
          setDefaultCategory(e?.service_post_categories)
          setImageUrl(e?.post_image || null);
          setDCategory(e?.service_post_categories)

        }
      }).catch((err) => onResetForm());
    }
  }, [id]);

  useEffect(() => {
    console.log("test", dCategory);
    forceUpdate()
  }, [dCategory])

  const onPostOrUpdate = async (e) => {
    e.preventDefault();
    let servicePost = {
      postTitle,
      postDescription,
      categories,
      postStatus: postStatusAsNormal,
    }

    if (imageFile) {
      let url = await uploadImage(imageFile);
      servicePost.postImage = url;
    } else {
      servicePost.postImage = imageUrl
    }
    if (id) {
      updateServicePostById(id, servicePost).then(() => {
        // if(post_id){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${strings.postUpdated}`,
          showConfirmButton: false,
          timer: 4000
        })
        // }
      });
    } else {
      insertServicePost(servicePost).then((isSuccess) => {
        if (isSuccess) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${strings.postCreated}`,
            showConfirmButton: false,
            timer: 4000
          })
        }
        onResetForm();
      });
    }
  }

  const onResetForm = () => {
    console.log("click,");
    setPostTitle("");
    setPostDescription("");
    setCategories("");
    setImageUrl("/assets/freelancer_pro/defual_img.png")
  }
  const handleChange = (value) => {
    setCategories(value);
  };
  const onDraft = async () => {
    let servicePost = {
      postTitle,
      postDescription,
      categories,
      postStatus: postStatusAsDraft,
      postImage: imageUrl,
    };
    if (imageFile) {
      let url = await uploadImage(imageFile);
      servicePost.postImage = url;
    }
    insertServicePost(servicePost).then((isSuccess) => {
      if (isSuccess) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${strings.saveTodraf}`,
          showConfirmButton: false,
          timer: 4000
        })
      }
    }
    );
    console.log("service post", servicePost);
    onResetForm();
  }

  const onCancel = () => {
    let path = '/freelancer';
    history.push(path);
  }


  return (
    <div className="post-service my-5">
      <Container>
        <Media query={{ maxWidth: 480 }}>
          {(matches) =>
            matches ? (
              <>
                <h3 className="text-center">{strings.ServiceCardPost}</h3>
                <Row>
                  <Col sm={12} xs={12}>
                    <div className="mt-5">
                      <h5>{strings.serviceCardTitle} </h5>
                      <TextArea
                        placeholder={strings.enterYourCardTitle}
                        allowClear
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                    </div>

                    <div className="mt-4">
                      <h5>{strings.categories}</h5>
                      {
                        dCategory ?
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="select category"
                            defaultValue={dCategory ? dCategory : ["no"]}
                            onChange={handleChange}
                            optionLabelProp="label"
                          >
                            {allCategories &&
                              allCategories.map((category) => {
                                return (
                                  category &&
                                  category.map((cate) => {
                                    return (
                                      <Option value={cate}>
                                        <div className="demo-option-label-item">
                                          {cate}
                                        </div>
                                      </Option>
                                    );
                                  })
                                );
                              })}
                          </Select> : <select style={{ width: '100%' }}></select>
                      }
                      <div className="mt-4">
                        <h5>{strings.cardDesc}</h5>
                        <TextArea
                          placeholder={strings.enterYourServiceCardDesc}
                          style={{ height: "200px" }}
                          allowClear
                          value={postDescription}
                          onChange={(e) => setPostDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} xs={12} className="mt-4">
                    <div className="choose-img">
                      <div className="seleted-img">
                        <img src={imageUrl} width="100%" alt="..." />
                      </div>
                      <Form.Group controlId="formFileMultiple">
                        <Form.Label className="mt-4">
                          {strings.chooseImage}
                        </Form.Label>
                        <br />
                        <Form.Control
                          type="file"
                          multiple
                          onChange={(e) => {
                            let url = URL.createObjectURL(e.target.files[0]);
                            setImageFile(e.target.files[0]);
                            setImageUrl(url);
                          }}
                        />
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                <div className="justify-content-between">
                  <Button className="me-4 cancel" variant="warning" onClick={onCancel}>
                    {strings.cancel}
                  </Button>
                  {id ? "" :
                    <Button className="me-4 draft" variant="warning" onClick={onDraft}>
                      {strings.draft}
                    </Button>}
                  <Button variant="warning" onClick={onPostOrUpdate}> {id ? strings.update : strings.post}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3>{strings.serviceCardPost}</h3>
                <Row>
                  <Col lg={7} md={6}>
                    <div className="mt-5">
                      <h5>{strings.serviceCardTitle} </h5>
                      <TextArea
                        placeholder={strings.enterYourCardTitle}
                        allowClear
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <h5>{strings.categories}</h5>
                      {
                        dCategory ?
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="select category"
                            defaultValue={dCategory ? dCategory : ["no"]}
                            onChange={handleChange}
                            optionLabelProp="label"
                          >
                            {allCategories &&
                              allCategories.map((category) => {
                                return (
                                  category &&
                                  category.map((cate) => {
                                    return (
                                      <Option value={cate}>
                                        <div className="demo-option-label-item">
                                          {cate}
                                        </div>
                                      </Option>
                                    );
                                  })
                                );
                              })}
                          </Select> : <select style={{ width: '100%' }}></select>
                      }
                    </div>
                    <div className="mt-4">
                      <h5>{strings.cardDesc}</h5>
                      <TextArea
                        placeholder={strings.enterYourServiceCardDesc}
                        style={{ height: "200px" }}
                        allowClear
                        value={postDescription}
                        onChange={(e) => setPostDescription(e.target.value)}
                      />
                    </div>
                    <Button className="cancel" variant="warning" onClick={onCancel} >
                      {strings.cancel}
                    </Button>
                    <div className="float-end">
                      {id ? "" :
                        <Button className="me-4 draft" variant="warning" onClick={onDraft}>
                          {strings.draft}
                        </Button>}
                      <Button variant="warning" onClick={onPostOrUpdate}> {id ? strings.update : strings.post}
                      </Button>
                    </div>
                  </Col>
                  <Col lg={5} md={6}>
                    <div className="choose-img">
                      <div className="seleted-img">
                        <img src={imageUrl} width="100%" alt="..." />
                      </div>
                      <Form.Group controlId="formFileMultiple">
                        <Form.Label className="mt-4">
                          {strings.chooseImage}
                        </Form.Label>
                        <br />
                        <Form.Control
                          type="file"
                          multiple
                          onChange={(e) => {
                            let url = URL.createObjectURL(e.target.files[0]);
                            setImageFile(e.target.files[0]);
                            setImageUrl(url);
                          }}
                        />
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
              </>
            )
          }
        </Media>
      </Container>
    </div>
  );
}

export default ServiceCardPost;
