import React, { useEffect, useState } from 'react';
import './../../../../App.css';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const MsgModal = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <button onClick={onOpenModal}>Open modal</button>

            <Modal open={open} onClose={onCloseModal}>
                <div className="modal-dialog">
                    <h2>Invalid Employer</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                    </p>
                    <div className="modal-footer">
                        <button type="button" open={open} onClose={onCloseModal} className="btn btn-danger" >Close</button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}
export default MsgModal;


