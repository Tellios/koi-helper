import * as React from "react";
import { List, Avatar } from "antd";
import { IPond } from "../../../repositories";
import { Link } from "react-router-dom";

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
        <img
          width={272}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
      }
      actions={[<Link to={`/pond/${pond.Id}`}>Edit</Link>]}
    >
      <List.Item.Meta
        avatar={
          <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        }
        title={pond.Name}
        description={`Liters: ${pond.Liters}, Depth: ${pond.Depth}`}
      />
    </List.Item>
  );
};
