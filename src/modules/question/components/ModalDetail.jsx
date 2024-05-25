import { Button, Form, Input, Upload } from "antd";
import PropTypes from "prop-types";
import { initQuestionValues } from "./items";
import { TEXT } from "../../../localization/en";
import { checkTxtFile } from "../../../utils/util";
import { UploadOutlined } from "@ant-design/icons";

function ModalDetailQuestion({ form, onSubmit}) {
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
      initialValues={initQuestionValues}
    >
      <Form.Item
        name="question_title"
        label={"Question Title"}
        rules={[
          {
            required: true,
            message: required.is_required,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="instruction"
        label={"Instruction file"}
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
          beforeUpload={(file) => checkTxtFile(file) || Upload.LIST_IGNORE}
          onChange={form.onChange}
          maxCount={1}
        >
          <Button
            icon={<UploadOutlined className="themeColor" />}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="criteria"
        label={"Marking criteria file"}
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
          beforeUpload={(file) => checkTxtFile(file) || Upload.LIST_IGNORE}
          onChange={form.onChange}
          maxCount={1}
        >
          <Button
            icon={<UploadOutlined className="themeColor" />}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}
ModalDetailQuestion.propTypes = {
  form: PropTypes.any,
  onSubmit: PropTypes.func,
  isNew: PropTypes.bool,
};

export default ModalDetailQuestion;
