import * as React from "react";
import "antd/dist/antd.css";
import { Layout, Row, Col } from "antd";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { PondListView } from "./modules/pond";
import { PondDetailsView } from "./modules/pond/details/PondDetailsView";

const { Content } = Layout;

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Layout>
        <Content>
          <Route path="/" exact component={PondListView} />
          <Route path="/pond" component={PondDetailsView} />
        </Content>
      </Layout>
    </Router>
  );
};
