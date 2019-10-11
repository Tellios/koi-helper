import * as React from "react";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";
import { InfoPanel } from "./InfoPanel";
import { ImageGallery } from "app/modules/image";
import { Box, makeStyles, Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  tabBar: {
    marginBottom: theme.spacing(1)
  }
}));

export const FishDetailsView: React.FunctionComponent<
  RouteComponentProps<{ fishId: string }>
> = ({ match }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const { state } = useAppState();
  const fish = state.fishes.filter(fish => fish.id === match.params.fishId)[0];

  return (
    <Box>
      <Tabs
        value={selectedTab}
        variant="fullWidth"
        className={classes.tabBar}
        onChange={(_event, value) => setSelectedTab(value)}
      >
        <Tab label={"Info"} />
        <Tab label={"Images"} />
      </Tabs>

      {selectedTab === 0 && <InfoPanel fish={fish} />}
      {selectedTab === 1 && <ImageGallery referenceId={fish.id} />}
    </Box>
  );
};
