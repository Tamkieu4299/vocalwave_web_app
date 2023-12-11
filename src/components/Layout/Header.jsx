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
import { NavLink } from "react-router-dom";

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
                <NavLink className="nav-btn" key={index} to={item.path} style={title === item.title ? {color: "#46cce3"} : {color: "white"}}>
                  {item.title.toUpperCase()}
                </NavLink>
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
