import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap'
import { StarFilled } from '@ant-design/icons'
import './styles.css'
import { NavLink, useHistory } from 'react-router-dom'
import { strings } from '../../localization/localization'
import { onDeletePostServicePost } from '../../redux/actions/postAction';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from "react-redux";
import { Img } from 'react-image'
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";



export default function Card({ data }) {

    const history = useHistory();
    const [selectedId, setSelectedId] = useState('');
    const dispatch = useDispatch();

    const deleteServicePost = bindActionCreators(onDeletePostServicePost, dispatch)

    const resetForm = () => {
        console.log("clicked")
    }

    const onDelete = (id) => {

        Swal.fire({
            title: `${strings.areYouSure}`,
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `${strings.yes}`,
            cancelButtonText: `${strings.no}`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (deleteServicePost(id)) {
                    Swal.fire(
                        `${strings.deleted}`,
                        `${strings.yourservicehasbeendeleted}`,
                        'success'
                    )
                }
            }
        })
        // }
    };


    return (
        <div className="card-service">
            <Row>
                <Col lg={5} md={5} sm={5} >
                    <div className="cover-post">
                        <a onClick={() => history.push('/detail/' + data.id)}>
                            <Img src={[`${data.post_image}`, ' https://i.stack.imgur.com/y9DpT.jpg']} alt=".." />
                        </a>
                    </div>
                </Col>
                <Col lg={7} md={7} sm={7}>
                    <div className="free-card-title">
                        <a onClick={() => history.push('/detail/' + data.id)}>
                            <b>{data.title === "" ? "No title show" : data.title}</b>
                        </a>
                    </div>
                        {data.category?.map((categories) =>
                                    <><Button variant="warning" className="my-2 card-category">{categories}</Button>{" "}</>
                            )}
                    <p className="free-card-des">
                        <a onClick={() => history.push('/detail/' + data.id)}>
                            {data.post_description === "" ? "No description" : data.post_description}
                        </a>
                    </p>
                    <div>
                        <StarFilled style={{ color: '#fbd98d', fontSize: '15px', position: 'absolute', marginTop: '2px' }} /> <span style={{ marginLeft: '20px' }}>4.7({data.reviews})</span>
                    </div>
                    <div className="mt-3">
                        <Button variant="secondary" className="update" onClick={()=>history.push('/post_service/'+ data.id)}>{strings.update}</Button>
                        <Button variant="secondary" className="delete" onClick={() => onDelete(data.id)}>{strings.delete}</Button>
                        {/* <Button variant="secondary" className="pending">{strings.pending}</Button> */}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
