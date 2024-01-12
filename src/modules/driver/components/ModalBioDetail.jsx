import { Form, Input } from "antd";
import { initialDriverValues } from "./items";
import PropTypes from "prop-types";
import { TEXT } from "../../../localization/en";

function ModalBioDetail({ form, onSubmit }) {
  const label = TEXT.driver;
  const required = TEXT.required;

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      autoComplete="off"
      layout="vertical"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 24 }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item name="bio">
        <Input placeholder="Input your favourite quotes..."/>
      </Form.Item>
    </Form>
  );
}
ModalBioDetail.propTypes = {
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default ModalBioDetail;
