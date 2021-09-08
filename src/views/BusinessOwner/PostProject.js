import React, { useEffect, useState, useCallback } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Input, Select, DatePicker } from "antd";
import Media from "react-media";
import UploadImg from "../../components/UploadImg";
import { strings } from "../../localization/localization";
import MyEditor from "../../components/MyEditor";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { onFetchCategories } from "../../redux/actions/categoryAction";
import { fetchProjectPostByID, insertProjectPost, updateProjectPostById } from "../../services/projectPostService";
import { onInsertProjectPost, onUpdateProjectPost, onFetchProjectPostByID } from "../../redux/actions/projectPostAction";
import { uploadImage } from "../../services/uploadImageService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
const { TextArea } = Input;
const { Option } = Select;

const { RangePicker } = DatePicker;

function PostProject() {

  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [postDeadline, setPostDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("/assets/freelancer_pro/defual_img.png");
  const [imageFile, setImageFile] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [dCategory, setDCategory] = useState()
  const [postStatusAsNormal, setPostStatusAsNormal] = useState("normal");
  const [postStatusAsDraft, setPostStatusAsDraft] = useState("draft");
  const history = useHistory();
  const { post_id } = useParams();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const dispatch = useDispatch();
  const allCategories = useSelector(
    (state) => state.categoryReducer.categories
  );

  console.log("id ----> ", post_id)

  useEffect(() => {
    dispatch(onFetchCategories());

    if (post_id) {
    } else {
      setDCategory([])
    }

  }, []);

  useEffect(() => {

    if (post_id) {
      fetchProjectPostByID(post_id).then((e) => {
        if (e) {
          console.log(e.categories, "fetch");
          setTitle(e?.title);
          setDescription(e?.description);
          setPostDeadline(e?.postDeadline);
          setDefaultCategory(e?.categories)
          setImageUrl(e?.postImage || null);
          setDCategory(e?.categories)

        }
      }).catch((err) => onResetForm());
    }
  }, [post_id])

  useEffect(() => {
    // console.log("test", dCategory);
    forceUpdate()
  }, [dCategory])
  const handleChange = (value) => {
    // console.log("testing value", value)
    setCategories(value);
  };

  const onResetForm = () => {
    console.log("clicked");
    setTitle("");
    setCategories("");
    setDescription("");
    setImageUrl("/assets/freelancer_pro/defual_img.png");
  }

  const onPostOrUpdate = async (e) => {
    e.preventDefault();
    let projectPost = {
      title,
      description,
      postDeadline,
      categories,
      postStatus: postStatusAsNormal
    }

    if (imageFile) {
      let url = await uploadImage(imageFile);
      projectPost.postImage = url;
    } else {
      projectPost.postImage = imageUrl
    }
    if (post_id) {
      updateProjectPostById(post_id, projectPost).then((post_id) => {
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
      insertProjectPost(projectPost).then((isSuccess) => {
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

  function onPostSelect(_, dateString) {
    setPostDeadline(dateString);
    // console.log('Selected Time: ', dateString);
  }

  const onDraft = async () => {
    let projectPost = {
      title,
      description,
      postDeadline,
      categories,
      postStatus: postStatusAsDraft
    }
    if (imageFile) {
      let url = await uploadImage(imageFile);
      projectPost.postImage = url;
    }
    insertProjectPost(projectPost).then((isSuccess) => {
      if (isSuccess) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${strings.postCreated}`,
          showConfirmButton: false,
          timer: 4000
        })
      }
    }
    );

    onResetForm();
  }

  const onCancel = () => {
    let path = '/business';
    history.push(path);
  }

  return (
    <Media query={{ maxWidth: 480 }}>
      {(matches) =>
        matches ? (
          <>
            <div className="post-service my-5">
              <Container>
                <h3>{strings.postProject}</h3>
                <Row>
                  <Col sm={12} xs={12}>
                    <div className="mt-5">
                      <h6>{strings.projectTitle}</h6>
                      <TextArea
                        placeholder={strings.enterYourProjectTitle}
                        allowClear
                      />
                    </div>
                    <div className="mt-4 d-flex w-100 justify-content-between">
                      <div style={{ width: "49%" }}>
                        <h6>{strings.selectCategories}</h6>
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
                            </Select> : <h1></h1>
                        }
                      </div>
                      <div style={{ width: "49%" }}>
                        <h6>{strings.selectDeadline}</h6>
                        <DatePicker
                          showTime
                          onOk={postDeadline}
                          onChange={onPostSelect}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h6>{strings.projectDesc}</h6>
                      <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ height: '200px' }}
                      />
                    </div>
                  </Col>
                  <Col sm={12} xs={12} className="mt-4">
                    <div>
                      <div className="choose-img">
                        <div className="seleted-img">
                          <img src={imageUrl} width="100%" alt="..." />
                        </div>
                        <Form.Group controlId="formFileMultiple">
                          <Form.Label className="mt-4">{strings.chooseImage}</Form.Label><br />
                          <Form.Control
                            type="file"
                            multiple
                            onChange={(e) => {
                              let url = URL.createObjectURL(e.target.files[0]);
                              setImageFile(e.target.files[0]);
                              setImageUrl(url);
                            }} />
                        </Form.Group>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="justify-content-between">
                  <Button className="cancel" variant="warning" onClick={onCancel} >
                    {strings.cancel}
                  </Button>
                  <div className="float-end">
                    <Button className="me-4 draft" variant="warning" onClick={onDraft}>
                      {strings.draft}
                    </Button>
                    <Button variant="warning" onClick={onPostOrUpdate}>{post_id ? strings.update : strings.post}</Button>
                  </div>
                </div>
              </Container>
            </div>
          </>
        ) : (
          <>
            <div className="post-service my-5">
              <Container>
                <h3>{strings.postProject}</h3>
                <Row>
                  <Col lg={7} md={7}>
                    <div className="mt-5">
                      <h6>{strings.projectTitle}</h6>
                      <TextArea
                        placeholder={strings.enterYourProjectTitle}
                        allowClear
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 d-flex w-100 justify-content-between">
                      <div style={{ width: "49%" }}>
                        <h6>{strings.selectCategories}</h6>
                        {
                          dCategory ? <Select
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
                      <div style={{ width: "49%" }}>
                        <h6>{strings.selectDeadline}</h6>
                        <DatePicker
                          showTime
                          onOk={postDeadline}
                          onChange={onPostSelect}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h6>{strings.projectDesc}</h6>
                      <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ height: '200px' }}
                      />
                    </div>
                    <Button className="cancel" variant="warning" onClick={onCancel} >
                      {strings.cancel}
                    </Button>
                    <div className="float-end">
                      {post_id ? "" :
                        <Button className="me-4 draft" variant="warning" onClick={onDraft}>
                          {strings.draft}
                        </Button>}
                      <Button variant="warning" onClick={onPostOrUpdate}>{post_id ? strings.update : strings.post}</Button>
                    </div>
                  </Col>
                  <Col lg={5} md={5}>
                    <div>
                      <div className="choose-img">
                        <div className="seleted-img">
                          <img src={imageUrl} width="100%" alt="..." />
                        </div>
                        <Form.Group controlId="formFileMultiple">
                          <Form.Label className="mt-4">{strings.chooseImage}</Form.Label><br />
                          <Form.Control
                            type="file"
                            multiple
                            onChange={(e) => {
                              let url = URL.createObjectURL(e.target.files[0]);
                              setImageFile(e.target.files[0]);
                              setImageUrl(url);
                            }} />
                        </Form.Group>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        )
      }
    </Media>
  );
}

export default PostProject;
