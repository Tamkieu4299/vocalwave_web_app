import { Tooltip } from "antd";
import PropTypes from "prop-types";

function IconButton({ title, icon, ...props }) {
  return (
    <span>
        <a {...props}>
          <Tooltip title={title} placement="bottomRight" arrow={{pointAtCenter: "true"}}>{icon}</Tooltip>
        </a>
    </span>
  );
}

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default IconButton;
