import { Row, Button, Typography } from "antd";
import { EditOutlined, DeleteOutlined, PlayCircleOutlined, ShareAltOutlined  } from "@ant-design/icons";
import IconButton from "./IconButton";
import PropTypes from "prop-types";
import usePermission from "../../hooks/usePermission";
import { useNavigate } from "react-router";

function GroupButtonAction({ onPlay, onEdit, onDelete, canDelete = true, onShare }) {
  const { editPermission, deletePermission, viewPermission } = usePermission();
  const navigate = useNavigate();
  return (
    <Row className="gap-2" style={{alignItems: "center"}}>
      <Button
        type="primary"
        // onClick={() => navigate("/")}
      >
        <Typography className="text-white">
          {"View"}
        </Typography>
      </Button>
      {/* <IconButton
        onClick={onPlay}
        title="Play"
        icon={<PlayCircleOutlined style={{display: "block"}}/>}
        style={{height: "16px", display: "block"}}
        className="text-base themeColor"
      /> */}
      {/* <IconButton
        onClick={onEdit}
        title="Edit"
        icon={<EditOutlined style={{display: "block"}}/>}
        style={{height: "16px", display: "block"}}
        className="text-base themeColor"
      /> */}
      {/* <IconButton
          onClick={onShare}
          title="Share"
          icon={<ShareAltOutlined style={{display: "block"}}/>}
          style={{height: "16px", display: "block"}}
          className="text-base themeColor"
      /> */}
      {/* <IconButton
        onClick={onDelete}
        title="Delete"
        icon={<DeleteOutlined style={{display: "block"}}/>}
        style={{height: "16px", display: "block"}}
        className="text-base themeColor"
      /> */}
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
