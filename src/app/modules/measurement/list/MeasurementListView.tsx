import { useActions, useAppState } from '@app/state';
import { Id } from '@shared/models';
import { Box } from '@mui/material';
import * as React from 'react';
import { MeasurementItem } from './MeasurementItem';

export interface IMeasurementListViewProps {
  fishId: Id;
}

export const MeasurementListView: React.FunctionComponent<IMeasurementListViewProps> = ({
  fishId,
}) => {
  const state = useAppState();
  const actions = useActions();

  React.useEffect(() => {
    actions.getMeasurements(fishId);
  }, [actions, fishId]);

  const listItems = state.measurements.map((measurement) => (
    <MeasurementItem key={measurement.id} measurement={measurement} />
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {listItems}
    </Box>
  );
};
