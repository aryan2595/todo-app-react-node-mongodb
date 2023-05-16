import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = ({ children, title, onHide, ...rest }) => {
  return (
    <>
      <Modal
        {...rest}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
