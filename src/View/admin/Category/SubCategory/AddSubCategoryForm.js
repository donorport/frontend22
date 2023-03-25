import React from 'react';
import { Modal } from "react-bootstrap"
import { Button } from '@mui/material';
import helper from '../../../../Common/Helper';
import noimg from "../../../../assets/images/noimg1.png"
import { unescape } from 'lodash';

export default function AddSubCategoryForm(props) {
    let stateData = props.stateData
    let iconList = props.iconList
    let code = '';


    const htmlDecode = (code) => {
        let doc = new DOMParser().parseFromString(code, "text/html")
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
                        {stateData?.categoryHdnID ? "Update SubCategory" : "Add SubCategory"}
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

                    {/* <div className="form-group row">
                        <label className="col-form-label col-sm-2 ">SubCategory Icon</label>
                        <div className="col-sm-10">
                            <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="icon" name="icon" style={{fontFamily:"fontAwesome"}}>
                                <option selected disabled value="">Select Icon</option>
                                {
                                 
                                    iconList.length >0 &&
                                    iconList.map((icon, i) => {
                                        return (
                                            code = '&'+icon.code+";",
                                            // console.log(icon)
                                            <option value={icon._id} selected={stateData.icon=== icon._id }>{ htmlDecode(code) + " " + icon.class}</option>
                                        )

                                    })

                                }

                            </select>

                            {stateData.error && stateData.error.icon && <p className="error">{stateData.error ? stateData.error.icon ? stateData.error.icon : "" : ""}</p>}
                        </div>
                    </div> */}
                    <div className="form-group row">
                        <label htmlFor="icon" className="col-sm-2 col-form-label">SVG Icon Code</label>
                        <div className="col-sm-10">
                 
                            <textarea name='icon' id="icon" className="form-control" rows="4" cols="50" onChange={(e) => { props.changevalue(e) }}>{stateData.icon}</textarea>

                            {stateData.error && stateData.error.icon && <p className="error">{stateData.error ? stateData.error.icon ? stateData.error.icon : "" : ""}</p>}
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
                    <Button variant="contained" onClick={() => props.submitSubCategoryForm()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}