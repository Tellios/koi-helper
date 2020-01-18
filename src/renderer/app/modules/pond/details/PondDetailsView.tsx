import * as React from "react";
import { Tabs, Tab, Grid, Paper } from "@material-ui/core";
import { InfoPanel } from "./InfoPanel";
import { useAppState } from "app/state";
import { ContentCard } from "app/ui";
import { RouteComponentProps } from "react-router";
import { FishListView } from "app/modules/fish";
import { ImageGallery } from "app/modules/image";
import { t } from "app/i18n";

export const PondDetailsView: React.FunctionComponent<RouteComponentProps<{
  pondId: string;
}>> = ({ match }) => {
  const { state, actions } = useAppState();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const pond = state.ponds.filter(pond => pond.id === match.params.pondId)[0];

  React.useEffect(() => {
    actions.setMainBar({
      title: pond.name,
      showBackButton: true,
      actions: []
    });
  });

  return (
    <Grid container direction="column" wrap="nowrap">
      <Grid item>
        <Paper square>
          <Tabs
            value={selectedTab}
            variant="fullWidth"
            onChange={(_event, value) => setSelectedTab(value)}
          >
            <Tab label={t.common.tabs.info} />
            <Tab label={t.common.tabs.fishes} />
            <Tab label={t.common.tabs.images} />
          </Tabs>
        </Paper>
      </Grid>

      <Grid item>
        {selectedTab === 0 && (
          <ContentCard disableScroll>
            <InfoPanel pond={pond} />
          </ContentCard>
        )}
        {selectedTab === 1 && <FishListView pondId={pond.id} />}
        {selectedTab === 2 && (
          <ContentCard disableScroll>
            <ImageGallery referenceId={pond.id} titleVariant="none" />
          </ContentCard>
        )}
      </Grid>
    </Grid>
  );
};
