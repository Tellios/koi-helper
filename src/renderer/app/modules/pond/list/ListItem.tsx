import * as React from "react";
import { List, Button, Popover, Row } from "antd";
import { IPond } from "../../../repositories";
import { Route } from "react-router";
import ButtonGroup from "antd/lib/button/button-group";

export interface IPondListItemProps {
  pond: IPond;
}

export const ListItem: React.FunctionComponent<IPondListItemProps> = ({
  pond
}) => {
  return (
    <List.Item
      key={pond.Id}
      extra={
        <Row>
          <Route
            render={({ history }) => (
              <Button
                type="default"
                onClick={() => history.push(`/pond/${pond.Id}`)}
              >
                Edit
              </Button>
            )}
          />
          <Popover
            content={
              <ButtonGroup>
                <Button type="danger">Yes</Button>
                <Button type="default">Cancel</Button>
              </ButtonGroup>
            }
            title="Are you sure?"
            trigger="click"
          >
            <Button type="danger">Delete</Button>
          </Popover>
        </Row>
      }
    >
      <List.Item.Meta
        avatar={
          <img
            width={160}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
        title={pond.Name}
        description={`Liters: ${pond.Liters}, Depth: ${pond.Depth}`}
      />
    </List.Item>
  );
};
