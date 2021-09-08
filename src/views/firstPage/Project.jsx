import React, { useEffect, useState } from 'react'
import './styles.css'
import { Container, Row, Col } from 'react-bootstrap'
import BsCard from '../../components/freelancer/BsCard'
import { strings } from '../../localization/localization'
import { useDispatch, useSelector } from "react-redux";
import { onFetchProjectPosts , onFetchProjectPostByCategory } from "../../redux/actions/projectPostAction";
import { Spin } from 'antd';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

function Project() {

    const {category} = useParams();
    const dispatch = useDispatch();
    const [page] = useState(1)
    const { projectPosts, isLoading } = useSelector((state) => state.projectPostReducer);

    useEffect(() => {
        if(category === "all"){
            dispatch(onFetchProjectPosts(page));
        }else{
            dispatch(onFetchProjectPostByCategory(category));
        }
    }, [category]);

    const onPageChange = ({ selected }) => {
        dispatch(onFetchProjectPosts(selected + 1))
    }

    // console.log("Project", projectPosts);
    console.log("category", projectPosts);

    return (
        <div className="search-by-category search-project">
            <Container>
                <Row className="my-5 revers">
                    <Col lg={6} md={6}>
                        <h1 className="mt-5 h1-title">{strings.sahakka}</h1>
                        <p>{strings.desInHomepage}</p>
                    </Col>
                    <Col lg={6} md={6}>
                        <img className="image-tl" src="../assets/business_img/search-cover.png" alt="Feed img" width="100%" />
                    </Col>
                </Row>
                <Row className="services-available">
                    {!isLoading ?
                        projectPosts?.map((value) =>
                            <>
                                <h5 className="mb-4">{strings.hereAretheResult} : {value.metadata.totalCount === 0 ? "No data" : value.metadata.totalCount}  {strings.projectAvailable} </h5>
                                <Row>
                                    {value.payload?.map((data) => {
                                        return (
                                            <Col xl={4} lg={6} md={6}>
                                                <BsCard key={data.postId} projectPost={data} /><br />
                                            </Col>
                                        )
                                    }
                                    )}
                                </Row>
                                <ReactPaginate
                                    pageCount={value.metadata.totalCount / value.metadata.limit}
                                    onPageChange={onPageChange}
                                    containerClassName="pagination"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                    nextClassName="page-item"
                                    activeClassName="active"
                                />
                            </>
                        )
                        : <div className="text-center">
                            <Spin tip="Loading..." style={{ color: '#ffb000' }}></Spin>
                        </div>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Project
