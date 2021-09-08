import React, { useState } from 'react'
import './styles.css'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import moment from 'moment'
import { SendOutlined } from '@ant-design/icons'
import { strings } from '../localization/localization'
import { useRef } from 'react'


const { TextArea } = Input;


const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <div className="d-flex justify-content-between">
            <Form.Item style={{ width: '100%' }}>
                <TextArea rows={1} onChange={onChange} value={value} placeholder={strings.addComment} style={{ width: '100%', border: 'none', borderBottom: 'solid 1px #d9d9d9' }} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    <SendOutlined style={{ fontSize: '20px' }} />
                </Button>
            </Form.Item>
        </div>
    </>
);

export default function CopComment() {

    const user = useRef({})
    user.current = JSON.parse(localStorage.getItem("user"));
    const [state, setState] = useState(
        {
            comments: [],
            submitting: false,
            value: '',
        }
    );
    const handleSubmit = () => {
        if (!state.value) {
            return;
        }
        setState({
            submitting: true,
        });

        setTimeout(() => {
            setState({
                submitting: false,
                value: '',
                comments: [
                    state.comments,
                    {
                        author: `${user.current.username}`,
                        avatar: './assets/freelancer_pro/mengHong.png',
                        content: <p>{state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                ],
            });
        }, 1000);
    };

    const handleChange = e => {
        setState({
            value: e.target.value,
        });
    };
    const { comments, submitting, value } = state;
    return (
        <>
            <Comment
                avatar={
                    <Avatar
                        src="../assets/freelancer_pro/mengHong.png"
                        alt={user.current.username}
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
            {comments?.length > 0 && <CommentList comments={comments} />}
        </>
    );
}
