import ModalContainer from "@/components/Modal/containers/ModalContainer";
import PropTypes from "prop-types";

function ModalConFirm({
  open = false,
  onCancel,
  onOk,
  title = "Warning",
  content = "Are you sure want to delete playlist",
}) {
  return (
    <ModalContainer open={open} onCancel={onCancel} title={title} onOk={onOk}>
      {content}
    </ModalContainer>
  );
}

ModalConFirm.propTypes = {
  open: PropTypes.boolean,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default ModalConFirm;
