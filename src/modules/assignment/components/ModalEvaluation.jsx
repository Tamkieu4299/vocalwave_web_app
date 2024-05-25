import { Form, Input, Upload, Button, Typography } from "antd";
import PropTypes from "prop-types";
import { initAssignmentValues } from "./items";
import { TEXT } from "../../../localization/en";
import { UploadOutlined } from "@ant-design/icons";
import { checkZipFile } from "../../../utils/util";

function ModalEvaluation({ form, onSubmit, isNew }) {
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
      <Typography className="pt-4 pb-4 text-red-700">Please Upload student answer here to run the process</Typography>
      <Form.Item
          name="file"
          label={label.file}
          rules={[
            {
              required: true,
              message: required.is_required,
            },
          ]}
        >
          <Upload
            name="file"
            customRequest={(options) => {
              options.onSuccess("Ok");
            }}
            multiple={true}
            showUploadList={true}
            beforeUpload={(file) => checkZipFile(file) || Upload.LIST_IGNORE}
            onChange={form.onChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined className="themeColor"/>}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            >Click to Upload</Button>
          </Upload>
        </Form.Item>
    </Form>
  );
}
ModalEvaluation.propTypes = {
  form: PropTypes.any,
  onSubmit: PropTypes.func,
  isNew: PropTypes.bool,
};

export default ModalEvaluation;
