import { t } from '@app/i18n';
import { ImageGallery } from '@app/modules/image';
import { useActions, useAppState } from '@app/state';
import { Id, IMeasurement } from '@app/storage';
import { DeleteButton, formatDate } from '@app/ui';
import { Edit } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { EditDialog } from '../editDialog';
import { MeasureDiff } from './MeasureDiff';

export interface IMeasurementItemProps {
  measurement: IMeasurement;
}

const getOldMeasurement = (
  currentId: Id,
  measurements: IMeasurement[],
): IMeasurement | undefined => {
  const indexOfCurrentMeasurement = measurements.findIndex((m) => m.id === currentId);
  return measurements[indexOfCurrentMeasurement + 1];
};

export const MeasurementItem: React.FunctionComponent<IMeasurementItemProps> = ({
  measurement,
}) => {
  const { measurements } = useAppState();
  const { deleteMeasurement } = useActions();
  const [isEditing, setIsEditing] = React.useState(false);

  const { id, date, length, weight, comment } = measurement;
  const oldMeasurement = getOldMeasurement(id, measurements);

  return (
    <Card>
      <CardHeader
        title={formatDate(date)}
        action={
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <DeleteButton onDelete={() => deleteMeasurement(id)} />
          </>
        }
      />
      <CardContent>
        <Box display="flex" justifyContent="space-around">
          <Box display="flex">
            <Typography color="textSecondary" sx={{ mr: 1 }}>
              {t.measurement.lengthLabel}
            </Typography>
            <Typography sx={{ mr: 1 }}>{length}</Typography>

            <MeasureDiff newValue={length} oldValue={oldMeasurement?.length} />
          </Box>

          <Box display="flex">
            <Typography color="textSecondary" sx={{ mr: 1 }}>
              {t.measurement.weightLabel}
            </Typography>
            <Typography sx={{ mr: 1 }}>{weight}</Typography>

            <MeasureDiff newValue={weight} oldValue={oldMeasurement?.weight} />
          </Box>
        </Box>

        {comment && (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              marginTop: 1,
              marginBottom: 1,
              whiteSpace: 'pre',
            }}
          >
            {comment}
          </Typography>
        )}
        <ImageGallery referenceId={id} titleVariant="small" />
      </CardContent>

      <EditDialog open={isEditing} measurement={measurement} onClose={() => setIsEditing(false)} />
    </Card>
  );
};
