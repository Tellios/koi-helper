import * as React from "react";
import { Layout, Row, Col, Statistic, Icon, Card, PageHeader } from "antd";
import { Route } from "react-router";

import { IPond } from "../../../repositories";

export const PondDetailsView: React.FunctionComponent = () => {
  const pond: IPond = {
    Id: 1,
    Name: "This is my pond",
    Depth: 3.5,
    Length: 12,
    Width: 7.6,
    Liters: 8000
  };

  return (
    <Layout>
      {/* <Layout.Header>{pond.Name}</Layout.Header> */}
      <Route
        render={({ history }) => (
          <PageHeader title={pond.Name} onBack={() => history.goBack()} />
        )}
      />
      <Layout.Content>
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              {/* <Statistic
              title="Status"
              valueRender={() => (
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              )}
            /> */}
              <Statistic title="Depth" value={pond.Depth} />
            </Col>
            <Col span={12}>
              <Statistic title="Liters" value={pond.Liters} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Length" value={pond.Length} />
            </Col>
            <Col span={12}>
              <Statistic title="Width" value={pond.Width} />
            </Col>
          </Row>
        </Card>
      </Layout.Content>
    </Layout>
  );
};
