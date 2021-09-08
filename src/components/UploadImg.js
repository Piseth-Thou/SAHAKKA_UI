import React from 'react'
import { Form } from 'react-bootstrap'
import {strings} from '../localization/localization'
function UploadImg() {
    return (
        <div>
            <div className="choose-img">
                <div className="seleted-img">
                    <img src="/assets/freelancer_pro/defual_img.png" width="100%" alt="..." />
                </div>
                <Form.Group controlId="formFileMultiple">
                    <Form.Label className="mt-4">{strings.chooseImage}</Form.Label><br />
                    <Form.Control type="file" multiple />
                </Form.Group>
            </div>
        </div>
    )
}

export default UploadImg
