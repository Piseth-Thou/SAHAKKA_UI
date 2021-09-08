import React, { useEffect, useState } from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { onFetchPosts } from '../../redux/actions/postAction';
import { Container, Row, Col } from 'react-bootstrap'
import FreeCard from '../../components/BusinessOwner/FreeCard'
import { strings } from '../../localization/localization'
import { Spin } from 'antd';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';
import { header } from '../../utils/header';
import { useParams } from 'react-router-dom';
import { onFetchServicePostsByCategory } from '../../redux/actions/postAction';


function SearchFreelancer() {

    const user = useRef({})
    user.current = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const [page, _] = useState(1)
    const {category} = useParams();

    const { posts, isLoading } = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (category === "all") {
            dispatch(onFetchPosts(page));
        }
        else {
            dispatch(onFetchServicePostsByCategory(category));
        }
    }, [category]);

    const onPageChange = ({ selected }) => {
        dispatch(onFetchPosts(selected + 1))
    }

    console.log("------------------------->", posts)

    return (
        <div className="search-by-category">
            <Container>
                <Row className="my-5 revers">
                    <Col lg={6} md={6}>
                        <h2 className="mt-5 h1-title">{strings.welcome} {user.current.username} ! </h2>
                        <p className="my-4">{strings.desInFeedBusiness}</p>
                    </Col>
                    <Col lg={6} md={6}>
                        <img className="image-tl" src="../assets/business_img/search-cover.png" width="100%" alt="cover" />
                    </Col>
                </Row>
                <Row className="services-available">
                    {!isLoading ?
                        posts?.map((value) =>
                            <>
                                <h5 className="mb-4">{strings.hereAretheResult} : {value?.metadata && value.metadata.totalCount}  {strings.serviceAvailable} </h5>
                                <Row>
                                    {value.payload?.map((data) => {
                                        return (
                                            <Col xl={3} lg={4} md={6}>
                                                <FreeCard post={data} /><br />
                                            </Col>
                                        )
                                    }
                                    )}
                                </Row>
                                <ReactPaginate
                                    pageCount={value.metadata?.totalCount / value.metadata?.limit}
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

export default SearchFreelancer
