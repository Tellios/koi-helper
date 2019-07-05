import * as React from "react";
import { IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { useAppState } from "app/state";

export const ShowSettingsButton: React.FunctionComponent = () => {
  const { actions } = useAppState();

  return (
    <IconButton color="inherit" onClick={actions.showSettings}>
      <Settings />
    </IconButton>
  );
};
