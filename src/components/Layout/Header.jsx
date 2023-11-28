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
import styled, { createGlobalStyle } from 'styled-components';

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
      <Popconfirm placement="bottom" title={TEXT.confirm.confirm_logout}>
        <Space className="flex flex-col">
          <Typography className="text-lg">{user?.name}</Typography>
          <Button className="bg-primary text-white" onClick={logout}>
            {TEXT.button.logout}
          </Button>
        </Space>
      </Popconfirm>
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
              placement="left"
              content={userProfileContent}
              trigger="click"
            >
              <Space size="small">
                <Avatar
                  size={42}
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    marginBottom: "11px",
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
