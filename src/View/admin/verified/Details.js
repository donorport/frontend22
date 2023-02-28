import React from 'react';
import { Modal } from "react-bootstrap"
import { Button } from '@mui/material';
import helper from '../../../Common/Helper';
import noimg from "../../../assets/images/noimg.jpg"
import { unescape } from 'lodash';
import ReactDOM from "react-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'



export default function Details(props) {
    let stateData = props.stateData
 


    // const htmlDecode = (code) => {
    //     let doc = new DOMParser().parseFromString(code, "text/html")
    //     return doc.documentElement.textContent

    // }
    return (
        <>
            <Modal
                size="lg"
                show={props.modal}
                onHide={() => props.setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                animation={false}
                style={{ zIndex: "999999" }}

            >
                <Modal.Header >
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control " disabled name='name' id="name" value={stateData.name}  />

                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control " disabled name='email' id="email" value={stateData.email}  />

                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Tell us why you want to be vefified </label>
                        <div className="col-sm-10">
                            <textarea id="reason" name="reason" rows="8" disabled cols="100">{stateData.reason}</textarea>

                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btnWarning" className='btnDanger' onClick={() => props.setModal(false)}>Close</Button>&nbsp;
                    {/* <Button variant="contained" onClick={() => props.submitCmsForm()}>Save</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )


}