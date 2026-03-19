import { Stack } from '@mui/material';
import { Id } from '@shared/models';
import * as React from 'react';
import { useMeasurementStore } from '../measurement-store';
import { MeasurementItem } from './MeasurementItem';

export interface IMeasurementListViewProps {
  fishId: Id;
}

export const MeasurementListView: React.FunctionComponent<IMeasurementListViewProps> = ({
  fishId,
}) => {
  const { getMeasurements, measurements } = useMeasurementStore();

  React.useEffect(() => {
    getMeasurements(fishId);
  }, [getMeasurements, fishId]);

  const listItems = measurements.map((measurement) => (
    <MeasurementItem key={measurement.id} measurement={measurement} />
  ));

  return (
    <Stack spacing={1} sx={{ flex: 1, overflowY: 'auto' }}>
      {listItems}
    </Stack>
  );
};
