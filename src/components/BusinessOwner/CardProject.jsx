import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './styles.css';
import Media from 'react-media';
import { strings } from '../../localization/localization'
import { Img } from 'react-image'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../services/postService';
import { bindActionCreators } from 'redux';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { onDeletePost } from '../../redux/actions/postAction';

const CardProject = ({ ownerGetAllPosts }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const deletePost = bindActionCreators(onDeletePost, dispatch)
    
    const onDelete = (post_id) => {
        console.log(ownerGetAllPosts.post_id)
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
                if (deletePost(post_id)) {
                    Swal.fire(
                        `${strings.deleted}`,
                        `${strings.yourprojecthasbeendeleted}`,
                        'success'
                    )
                }
            }
        })
        // }
    };
    const descriptions = ownerGetAllPosts.description.split('\n')
    return (
        <Media query={{ maxWidth: 480 }}>
            {matches =>
                matches ? (
                    <div className="pro-card mt-2">
                        <a onClick={() => history.push('/project_detail/' + ownerGetAllPosts.post_id)}>
                            <Img src={[`${ownerGetAllPosts.post_image}`, " https://i.stack.imgur.com/y9DpT.jpg"]} alt="No card show" width="340px" />
                        </a>
                        <div className="mt-2">
                            <a onClick={() => history.push('/project_detail/' + ownerGetAllPosts.post_id)}>
                                <p className="post-title"><b>{ownerGetAllPosts.title === "" || ownerGetAllPosts.title === null ? 'No title' : ownerGetAllPosts.title}</b></p>
                            </a>
                            {ownerGetAllPosts.categories?.map((category) =>
                                <><Button variant="warning" className="mb-2">{category}</Button>{" "}</>
                            )}
                            <a onClick={() => history.push('/project_detail/' + ownerGetAllPosts.post_id)}>
                                <p className="mt-3 description">
                                    {ownerGetAllPosts.description === "" || ownerGetAllPosts.description === null ? 'No descrition ' :
                                        descriptions.map((des) => <li style={{listStyle:'none !important'}}>{des}</li>)
                                    }
                                </p>
                            </a>
                            <div className="a">
                                <Button size="sm" className="button-action-style update" variant="outline-dark" onClick={() => history.push('/post_project/' + ownerGetAllPosts.post_id)}>
                                    {strings.update}</Button>
                                {/* <Button size="sm" className="button-action-style mx-2 pending" variant="outline-dark">
                                    {strings.pending}</Button> */}
                                <Button size="sm" onClick={() => onDelete(ownerGetAllPosts.post_id)} className="button-action-style delete ms-2" variant="outline-dark">
                                    {strings.delete}</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="pro-card d-flex mt-2">
                        <a onClick={() => history.push('/project_detail/' + ownerGetAllPosts.post_id)}>
                            <Img src={[`${ownerGetAllPosts.post_image}`, " https://i.stack.imgur.com/y9DpT.jpg"]} alt="no card show" width="340px" />
                        </a>
                        <div className="ms-4 pb-3 pt-1">
                            <a onClick={() => history.push('/project_detail/' + ownerGetAllPosts.post_id)} >
                                <p className="post-title"><b>{ownerGetAllPosts.title === "" || ownerGetAllPosts.title === null ? 'No title' : ownerGetAllPosts.title}</b></p>
                            </a>
                            {ownerGetAllPosts.categories?.map((category) =>
                                <><Button variant="warning" className="mb-2">{category}</Button>{" "}</>
                            )}
                            <a onClick={() => history.push('/project_detail/' + ownerGetAllPosts.post_id)}>
                                <p className="mt-3 description">
                                    {ownerGetAllPosts.description === "" || ownerGetAllPosts.description === null ? 'No descrition ' :
                                        descriptions.map((des) => <li>{des}</li>)
                                    }
                                </p>
                            </a>
                            <Button size="sm" className="button-action-style update" onClick={() => history.push('/post_project/' + ownerGetAllPosts.post_id)} variant="outline-dark">
                                {strings.update}</Button>
                            {/* <Button size="sm" className="button-action-style mx-2 pending" variant="outline-dark">
                                {strings.pending}</Button> */}
                            <Button size="sm" className="button-action-style delete ms-2" onClick={() => onDelete(ownerGetAllPosts.post_id)} variant="outline-dark">
                                {strings.delete}</Button>
                        </div>
                    </div>
                )
            }
        </Media>
    );
};

export default CardProject;