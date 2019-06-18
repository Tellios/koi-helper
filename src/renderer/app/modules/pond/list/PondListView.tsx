import * as React from "react";
import { Layout, List, PageHeader, Button } from "antd";
import { ListItem } from "./ListItem";
import { useState } from "../../../state";

export const PondListView: React.FunctionComponent = () => {
  // const ponds: IPond[] = [
  //   {
  //     Id: 1,
  //     Name: "Lorem",
  //     Depth: 8,
  //     Length: 12,
  //     Width: 6.7,
  //     Liters: 8000
  //   },
  //   {
  //     Id: 2,
  //     Name: "Ipsum",
  //     Depth: 8,
  //     Length: 12,
  //     Width: 6.7,
  //     Liters: 8000
  //   },
  //   {
  //     Id: 3,
  //     Name: "Dolor",
  //     Depth: 8,
  //     Length: 12,
  //     Width: 6.7,
  //     Liters: 8000
  //   },
  //   {
  //     Id: 4,
  //     Name: "Sit",
  //     Depth: 8,
  //     Length: 12,
  //     Width: 6.7,
  //     Liters: 8000
  //   },
  //   {
  //     Id: 5,
  //     Name: "Amet",
  //     Depth: 8,
  //     Length: 12,
  //     Width: 6.7,
  //     Liters: 8000
  //   }
  // ];

  const { state, actions } = useState();

  return (
    <Layout>
      <PageHeader
        title="My ponds"
        extra={
          <Button
            onClick={() =>
              actions.addPond({
                Name: "Yo yo",
                Depth: 3,
                Length: 2000,
                Liters: 1200,
                Width: 145
              })
            }
          >
            Add pond
          </Button>
        }
      />
      <Layout.Content>
        <List
          size="small"
          bordered
          itemLayout="vertical"
          dataSource={state.ponds}
          renderItem={pond => <ListItem pond={pond} />}
        ></List>
      </Layout.Content>
    </Layout>
  );
};
