import {
  Avatar,
  Button,
  Col,
  Layout,
  Popconfirm,
  Popover,
  Row,
  Space,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import { TEXT } from "../../localization/en";
import useLogout from "../../hooks/useLogout";
import { getLocalStorage } from "../../utils/storage";
import { privateRouteData } from "../../configs/route.config";
import { ExclamationCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';

const { Header } = Layout;
const { Title } = Typography;

const Nav = styled.nav`
  display: flex;
  width: 40%;
  min-width: 550px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;

const NavButton = styled.a`
  font-family: 'Martel Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  color: white;
  line-height: normal;
  &:hover,
  &:focus{
    outline: none;
    color: white;
  }
  &::after{
    content: '';
    display: block;
    position: absolute;
    bottom: 1.5px;
    left: 50%;
    width: 0;
    height: 3px;
    background-color: white;
    transition: width 0.3s ease-in-out;
    transform: translateX(-50%);
  }
  &:hover::after,
  &:focus::after {
  width: 95%;
}
`;

function AppHeader({ title }) {
  const { logout } = useLogout();
  const user = getLocalStorage("tempUser");

  const userProfileContent = (
    <div>
        <Space className="flex flex-col" style={{maxWidth: "200px", boxSizing: "border-box"}}>
          <Typography className="text-lg">{"Welcome, "}
            <div style={{
                color: "#46cce3",
                textDecoration: "underline",
                fontStyle: "italic",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100px",
                display: "inline-block",
                verticalAlign: "bottom"
            }}>{user?.name}</div>
          </Typography>
          <Popconfirm placement="bottomRight" title={"Logout"} description={TEXT.confirm.confirm_logout} icon={<ExclamationCircleFilled style={{color: "red"}}/>} onConfirm={logout}>
            <Button id="logout-btn" className="bg-primary text-white" block="true" onClick={(e) => e.preventDefault()} style={{
              width: "100%",
            }}>
              {TEXT.button.logout}
            </Button>
          </Popconfirm>
        </Space>
    </div>
  );

  return (
    <Header style={{ 
      backgroundColor: "#0F2F56", 
      "width": "100%",
      "box-sizing": "border-box",
      "height": "max-content",
    }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title className="text-left pt-2 m-0" style={{ color: "#fff" }}>
            VocalWave
          </Title>
        </Col>
        <Col>
          <Nav>
            {privateRouteData.map((item, index) => (
                <NavButton key={index} href={item.path} style={title === item.title ? {color: "#46cce3"} : {color: "white"}}>
                  {item.title.toUpperCase()}
                </NavButton>
            ))}
          </Nav>
        </Col>
        <Col style={{ textAlign: "right", cursor: "pointer" }}>
          <Space size="large" style={{ alignItems: "start" }}>
            <Popover
              placement="bottomRight"
              content={userProfileContent}
              trigger="click"
            >
              <Space size="small">
                <Avatar
                  size={42}
                  style={{
                    color: "#46cce3",
                    backgroundColor: "#fde3cf",
                    marginBottom: "11px",
                    fontWeight: "bold"
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Space>
            </Popover>
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

AppHeader.propTypes = {
  title: PropTypes.string,
};

export default AppHeader;