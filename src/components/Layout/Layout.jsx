import { Layout } from "antd";
import PropTypes from "prop-types";
import AppHeader from "../Layout/Header";
import Dialog from "../Button/Dialog";

function AppLayout({ children, title }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <AppHeader title={title} />
        <div
          className="p-3 relative"
          style={{ minHeight: `calc(100vh - 64px)`, padding: "100px 0" }}
        >
          {children}
        </div>
        {/* <Dialog title={title}/> */}
      </Layout>
    </Layout>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default AppLayout;
