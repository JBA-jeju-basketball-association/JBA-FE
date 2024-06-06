import React from "react";
import Modal from "react-modal";
import { useEffect } from "react";

type ModalProps = {
  children?: React.ReactNode;
  isopen: boolean;
  onRequestClose: () => void;
  style: ReactModal.Styles;
};

/**
 * `react-modal`을 활용한 재사용 가능한 모달 컴포넌트입니다.
 *
 * @param {React.ReactNode} [props.children] - 모달 내부에 표시될 내용입니다.
 * @param {boolean} props.isopen - 모달의 열림 여부를 결정합니다.
 * @param {() => void} props.onRequestClose - 모달을 닫기 위해 호출되는 함수입니다.
 * @param {ReactModal.Styles} props.style - 모달의 스타일을 지정합니다. 바깥영역과 내부 영역을 모두 지정할 수 있습니다.
 *
 * @example
 * <GalleryDetailModal/> 컴포넌트를 참고해주세요.
 */

const CommnModal = ({
  children,
  isopen,
  onRequestClose,
  style,
}: ModalProps) => {
  //모달창 나왔을 때 body 스크롤 막기
  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isopen]);

  return (
    <Modal
      isOpen={isopen}
      style={style}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default CommnModal;
