import React from 'react';
import { Modal } from "react-bootstrap"
import { Button } from '@mui/material';
import helper from '../../../Common/Helper';
import noimg from "../../../assets/images/noimg.jpg"
import { unescape } from 'lodash';
import ReactDOM from "react-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'



export default function AddCmsForm(props) {
    let stateData = props.stateData
    let iconList = props.iconList
    let code  = '';


    const htmlDecode = (code) =>{
        let doc = new DOMParser().parseFromString(code,"text/html")
        return doc.documentElement.textContent

    }
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
                        {stateData?.id ? "Update Cms Page" : "Add Cms Page"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control " name='name' id="name" value={stateData.name} onChange={(e) => { props.changevalue(e) }} />

                            {stateData.error && stateData.error.name && <p className="error">{stateData.error ? stateData.error.name ? stateData.error.name : "" : ""}</p>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Slug</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control " disabled={stateData?.id ? true : false} name='slug' id="slug" value={stateData.slug} onChange={(e) => { props.changevalue(e) }} />

                            {stateData.error && stateData.error.slug && <p className="error">{stateData.error ? stateData.error.slug ? stateData.error.slug : "" : ""}</p>}
                        </div>
                    </div>

                    
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2" htmlFor="inputstock">Description</label>
                        <div className="col-sm-10">
                            <ReactQuill
                                theme='snow'
                                value={stateData.description}
                                onChange={(e) => props.handleOnDiscriptionChangeValue(e,'description')}
                                style={{ height: '240px', marginBottom: "50px" }}
                                name="description"
                            />
                            <p className='error'>{stateData.error ? stateData.error.description ? stateData.error.description : "" : ""}</p>

                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2" htmlFor="inputstock">Body</label>
                        <div className="col-sm-10">
                            <ReactQuill
                                theme='snow'
                                value={stateData.body}
                                onChange={(e) => props.handleOnDiscriptionChangeValue(e,'body')}
                                style={{ height: '240px', marginBottom: "50px" }}
                                name="body"
                            />
                            <p className='error'>{stateData.error ? stateData.error.body ? stateData.error.body : "" : ""}</p>

                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-form-label col-sm-2 ">Status</label>
                        <div className="col-sm-10">
                            <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="status" name="status">
                                <option selected={stateData ? stateData.status === 1 ? "selected" : "" : ""} value="1">Active</option>
                                <option selected={stateData ? stateData.status === 0 ? "selected" : "" : ""} value="0">Inactive</option>
                            </select>

                            {stateData.error && stateData.error.status && <p className="error">{stateData.error ? stateData.error.status ? stateData.error.status : "" : ""}</p>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btnWarning" className='btnDanger' onClick={() => props.setModal(false)}>Close</Button>&nbsp;
                    <Button variant="contained" onClick={() => props.submitCmsForm()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}