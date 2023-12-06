import { Button, Card, Form, Input } from "antd";
import PropTypes from "prop-types";
import { AUTH_TEXT, MESSAGE } from "@/localization/en";
import logo from "@/assets/voiAds_logo.png";

const labelStyle = {
  display: 'block',
  marginTop: '10px',
  fontSize: '16px',
  fontWeight: '500',
};

const inputStyle = {
  display: 'block',
  height: '50px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '3px',
  padding: '0 10px',
  marginTop: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: "white"
};

const inputPasswordStyle = {
  height: '50px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '3px',
  padding: '0',
  marginTop: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: 'white'
};

const buttonStyle = {
  marginTop: '15px',
  width: '100%',
  height: 'max-content',
  backgroundColor: '#ffffff',
  color: '#080710',
  padding: '15px 0',
  fontSize: '18px',
  fontWeight: '600',
  borderRadius: '5px',
  cursor: 'pointer',
};

function RegisterForm({ onSubmit, isLoading = false }) {
  return (
    <div style={{
      width: '300px',
      margin: 'auto',
      minHeight: '100vh',
      display: 'flex',
      placeItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: "url(https://images.unsplash.com/photo-1468814213359-09c0e70107f8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        minWidth: "100vw",
        minHeight: "100vh",
        position: "absolute"
      }}></div>
      <Card style={
        {
          height: 'max-content',
          width: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          borderRadius: '10px',
          backdropFilter: 'blur(15px)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 40px rgba(8, 7, 16, 0.6)',
          padding: '20px 0',
        }
      }>
        <Form name="validate_other" layout="vertical" onFinish={onSubmit}>
          <img src={logo} alt="void-ads-logo" className="w-20 h-20 m-auto" />
          <Form.Item
            name="name"
            label={<span style={labelStyle}>{AUTH_TEXT.name}</span>}
            rules={[
              {
                required: true,
                message: MESSAGE.isRequired,
              },
            ]}
          >
            <Input style={inputStyle}/>
          </Form.Item>
          <Form.Item
            name="phone"
            label={<span style={labelStyle}>{AUTH_TEXT.phoneNumber}</span>}
            rules={[
              {
                required: true,
                message: MESSAGE.isRequired,
              },
            ]}
          >
            <Input style={inputStyle}/>
          </Form.Item>
          <Form.Item
            name="password"
            label={<span style={labelStyle}>{AUTH_TEXT.passWord}</span>}
            rules={[
              {
                required: true,
                message: MESSAGE.isRequired,
              },
            ]}
          >
            <Input.Password className="inputPassword" style={inputPasswordStyle}/>
          </Form.Item>
          <Button type="submit" style={buttonStyle} htmlType="submit" loading={isLoading}>Sign Up</Button>
          <div style={{marginTop: "20px", textAlign: "center"}}>{"Already have an account?"} <a style={{textDecoration: "underline", fontWeight: "bold"}} href="/auth/login">Login</a></div>
        </Form>
      </Card>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default RegisterForm;
