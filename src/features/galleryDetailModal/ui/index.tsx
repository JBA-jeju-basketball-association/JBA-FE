import React from "react";
import CommnModal from "shared/ui/commonModal";
import styles from "./galleryDetail.module.css";
import { CloseIcon, RightIcon, LeftIcon } from "utils/icon";

type GalleryDetailModalProps = {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
};

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "80%",
    height: "80%",
    zIndex: "11",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};

const GalleryDetailModal = ({
  modalOpen,
  setModalOpen,
}: GalleryDetailModalProps) => {
  return (
    <CommnModal
      isopen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
    >
      <div className={styles.container}>
        <h1>[2024]제주특별도민자치도 도민체전</h1>
        <CloseIcon />
        <RightIcon />
        <LeftIcon />
      </div>
    </CommnModal>
  );
};

export default GalleryDetailModal;
