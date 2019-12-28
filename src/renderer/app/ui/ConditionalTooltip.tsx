import * as React from "react";
import { Tooltip } from "@material-ui/core";

interface IConditionalTooltipProps {
  when: boolean;
  title: string;
  children: JSX.Element;
}

export const ConditionalTooltip: React.FC<IConditionalTooltipProps> = ({
  when,
  title,
  children
}) => {
  if (when === false) {
    return children;
  }

  return <Tooltip title={title}>{children}</Tooltip>;
};
