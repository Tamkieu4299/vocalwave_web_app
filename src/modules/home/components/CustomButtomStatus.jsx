import { Button } from "antd";
import Typography from "antd/es/typography/Typography";
import PropTypes from "prop-types";

function CustomButtonStatus({ color, label, onChange, ...rest }) {
  return (
    <Button
      {...rest}
      onClick={onChange}
      className="text-center text-white relative hover:!text-white"
      style={{
        backgroundColor: color,
      }}
    >
      <Typography className="!text-white">{label}</Typography>
    </Button>
  );
}
CustomButtonStatus.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
export default CustomButtonStatus;
