import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { initAssignmentValues } from "./items";
import { TEXT } from "../../../localization/en";

function ModalDetailAudio({ form, onSubmit, isNew }) {
  const label = TEXT.assignment;
  const required = TEXT.required;

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 24 }}
      style={{
        maxWidth: 600,
      }}
      initialValues={initAssignmentValues}
    >
      <Form.Item
        name="name"
        label={label.name}
        rules={[
          {
            required: true,
            message: required.is_required,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
ModalDetailAudio.propTypes = {
  form: PropTypes.any,
  onSubmit: PropTypes.func,
  isNew: PropTypes.bool,
};

export default ModalDetailAudio;
