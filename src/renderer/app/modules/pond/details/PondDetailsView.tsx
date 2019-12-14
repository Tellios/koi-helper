import * as React from "react";
import { Box, Divider, Tabs, Tab } from "@material-ui/core";
import { InfoPanel } from "./InfoPanel";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";
import { FishListHeaderView, FishListView } from "app/modules/fish";
import { ImageGallery } from "app/modules/image";
import { t } from "app/i18n";

export const PondDetailsView: React.FunctionComponent<
  RouteComponentProps<{ pondId: string }>
> = ({ match }) => {
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

  const renderInfoTab = () => {
    return (
      <>
        <InfoPanel pond={pond} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <FishListHeaderView pondId={pond.id} />
        <FishListView pondId={pond.id} />
      </>
    );
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        variant="fullWidth"
        onChange={(_event, value) => setSelectedTab(value)}
      >
        <Tab label={t.common.tabs.info} />
        <Tab label={t.common.tabs.images} />
      </Tabs>

      {selectedTab === 0 && renderInfoTab()}
      {selectedTab === 1 && <ImageGallery referenceId={pond.id} />}
    </Box>
  );
};
