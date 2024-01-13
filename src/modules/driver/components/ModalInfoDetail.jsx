import { Form, Input, Upload, Button } from "antd";
import { initialDriverValues } from "./items";
import PropTypes from "prop-types";
import { TEXT } from "../../../localization/en";
import { checkImageFile } from "../../../utils/util";
import { UploadOutlined } from "@ant-design/icons";

function ModalInfoDetail({ form, onSubmit }) {
  const label = TEXT.driver;

  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={initialDriverValues}
    >
      <Form.Item name="name" label={label.name}>
        <Input />
      </Form.Item>
      {/* <Form.Item name="user" label={label.user}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label={label.phone}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label={label.email}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label={label.gender}>
        <Input />
      </Form.Item>
      <Form.Item name="DOB" label={label.DOB}>
        <Input />
      </Form.Item>
      <Form.Item name="city" label={label.city}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label={label.password}>
        <Input />
      </Form.Item>
      <Form.Item name="confirmPassword" label={label.confirmPassword}>
        <Input />
      </Form.Item>
      <Form.Item name="profile" label={label.profile}>
        <Upload
            name="file"
            customRequest={(options) => {
              options.onSuccess("Ok");
            }}
            multiple={true}
            showUploadList={true}
            beforeUpload={(file) => checkImageFile(file) || Upload.LIST_IGNORE}
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
      <Form.Item name="cover" label={label.cover}>
        <Upload
          name="file"
          customRequest={(options) => {
            options.onSuccess("Ok");
          }}
          multiple={true}
          showUploadList={true}
          beforeUpload={(file) => checkImageFile(file) || Upload.LIST_IGNORE}
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
      </Form.Item> */}
    </Form>
  );
}
ModalInfoDetail.propTypes = {
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default ModalInfoDetail;
