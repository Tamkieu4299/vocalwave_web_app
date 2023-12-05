import { Layout } from "antd";
import PropTypes from "prop-types";
import AppHeader from "../Layout/Header";

function AppLayout({ children, title }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <AppHeader title={title} />
        <div
          className="p-3 relative"
          style={{ minHeight: `calc(100vh - 64px)` }}
        >
          {children}
        </div>
      </Layout>
    </Layout>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default AppLayout;
