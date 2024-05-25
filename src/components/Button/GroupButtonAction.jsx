import { Row } from "antd";
import { ProfileOutlined, PlayCircleOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import IconButton from "./IconButton";
import PropTypes from "prop-types";

function GroupButtonAction({ onViewSummary, onViewQuestion, onRunEva, canDelete = true }) {
  return (
    <Row className="gap-2" style={{alignItems: "center"}}>
      <IconButton
        onClick={onViewSummary}
        title="Evaluations"
        icon={<ProfileOutlined style={{display: "block"}}/>}
        style={{height: "16px", display: "block"}}
        className="text-base themeColor"
      />
      <IconButton
        onClick={onViewQuestion}
        title="Questions"
        icon={<QuestionCircleOutlined style={{display: "block"}}/>}
        style={{height: "16px", display: "block"}}
        className="text-base themeColor"
      />
      <IconButton
        onClick={(id) => onRunEva(id)}
        title="Evaluate Answer"
        icon={<PlayCircleOutlined style={{display: "block"}}/>}
        style={{height: "16px", display: "block"}}
        className="text-base themeColor"
      />
    </Row>
  );
}

GroupButtonAction.propTypes = {
  onViewSummary: PropTypes.func,
  onViewQuestion: PropTypes.func,
  onRunEva: PropTypes.func,
  canDelete: PropTypes.bool,
};

export default GroupButtonAction;
