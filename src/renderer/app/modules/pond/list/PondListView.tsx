import * as React from "react";
import { Layout, List } from "antd";
import { IPond } from "../../../repositories";
import { ListItem } from "./ListItem";

const { Header, Content, Footer } = Layout;

export const PondListView: React.FunctionComponent = () => {
  const ponds: IPond[] = [
    {
      Id: 1,
      Name: "Lorem",
      Depth: 8,
      Length: 12,
      Width: 6.7,
      Liters: 8000
    },
    {
      Id: 1,
      Name: "Ipsum",
      Depth: 8,
      Length: 12,
      Width: 6.7,
      Liters: 8000
    },
    {
      Id: 1,
      Name: "Dolor",
      Depth: 8,
      Length: 12,
      Width: 6.7,
      Liters: 8000
    },
    {
      Id: 1,
      Name: "Sit",
      Depth: 8,
      Length: 12,
      Width: 6.7,
      Liters: 8000
    },
    {
      Id: 1,
      Name: "Amet",
      Depth: 8,
      Length: 12,
      Width: 6.7,
      Liters: 8000
    }
  ];
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <List
          size="large"
          itemLayout="vertical"
          dataSource={ponds}
          renderItem={pond => <ListItem pond={pond} />}
        ></List>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
