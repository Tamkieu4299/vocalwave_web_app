import { Row } from "antd";
import { EditOutlined, DeleteOutlined, PlayCircleOutlined  } from "@ant-design/icons";
import IconButton from "./IconButton";
import PropTypes from "prop-types";
import usePermission from "../../hooks/usePermission";

function GroupButtonAction({ onPlay, onEdit, onDelete, canDelete = true }) {
  const { editPermission, deletePermission, viewPermission } = usePermission();

  return (
    <Row className="justify-center gap-2">
      <IconButton
        onClick={onPlay}
        title="Play"
        icon={<PlayCircleOutlined />}
        className="text-base text-green-500"
      />
      {editPermission && <IconButton
        onClick={onEdit}
        title="Edit"
        icon={<EditOutlined />}
        className="text-base text-sky-500"
      />}
      {deletePermission && canDelete && (
        <IconButton
          onClick={onDelete}
          title="Delete"
          icon={<DeleteOutlined />}
          className="text-base text-red-500"
        />
      )}
    </Row>
  );
}

GroupButtonAction.propTypes = {
  onPlay: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  canDelete: PropTypes.bool,
};

export default GroupButtonAction;
