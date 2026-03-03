import { t } from '@app/i18n';
import { ImageGallery } from '@app/modules/image';
import { useActions, useAppState } from '@app/state';
import { DeleteButton, formatDate } from '@app/ui';
import { Edit } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { Id, IMeasurement } from '@shared/models';
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
  const theme = useTheme();
  const { measurements } = useAppState();
  const { deleteMeasurement } = useActions();
  const [isEditing, setIsEditing] = React.useState(false);

  const { id, date, length, weight, comment } = measurement;
  const oldMeasurement = getOldMeasurement(id, measurements);

  return (
    <Card
      sx={{
        minHeight: 'min-content',
      }}
    >
      <CardHeader
        slotProps={{
          title: {
            variant: 'h6',
            fontSize: '1.1rem',
          },
          root: {
            sx: {
              p: 1,
              borderBottom: `1px solid ${theme.palette.secondary.light}`,
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
            },
          },
        }}
        title={formatDate(date)}
        action={
          <>
            <IconButton
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
              onClick={() => setIsEditing(true)}
            >
              <Edit />
            </IconButton>
            <DeleteButton
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
              onDelete={() => deleteMeasurement(id)}
            />
          </>
        }
      />
      <CardContent
        sx={{
          p: 0,
          px: 1,
          pt: 2,

          ':last-child': {
            paddingBottom: 1,
          },
        }}
      >
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
