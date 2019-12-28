import * as React from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { IMeasurement, Id } from "app/storage";
import { DeleteButton, formatDate } from "app/ui";
import { useAppState } from "app/state";
import { ImageGallery } from "app/modules/image";
import { t } from "app/i18n";
import { EditDialog } from "../editDialog";
import { MeasureDiff } from "./MeasureDiff";

const useStyles = makeStyles(theme => ({
  actions: {
    marginLeft: "auto"
  },
  dataPoint: {
    marginRight: theme.spacing(1)
  },
  comment: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    whiteSpace: "pre"
  }
}));

export interface IMeasurementItemProps {
  measurement: IMeasurement;
}

const getOldMeasurement = (currentId: Id, measurements: IMeasurement[]): IMeasurement | undefined => {
  const indexOfCurrentMeasurement = measurements.findIndex(m => m.id === currentId);
  return measurements[indexOfCurrentMeasurement + 1];
}

export const MeasurementItem: React.FunctionComponent<
  IMeasurementItemProps
> = ({ measurement }) => {
  const classes = useStyles();
  const {
    state: { measurements },
    actions: { deleteMeasurement }
  } = useAppState();
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
            <Typography color="textSecondary" className={classes.dataPoint}>
              {t.measurement.lengthLabel}
            </Typography>
            <Typography className={classes.dataPoint}>{length}</Typography>

            <MeasureDiff newValue={length} oldValue={oldMeasurement?.length} />
          </Box>

          <Box display="flex">
            <Typography color="textSecondary" className={classes.dataPoint}>
              {t.measurement.weightLabel}
            </Typography>
            <Typography className={classes.dataPoint}>{weight}</Typography>

            <MeasureDiff newValue={weight} oldValue={oldMeasurement?.weight} />
          </Box>
        </Box>

        {comment && (
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.comment}
          >
            {comment}
          </Typography>
        )}
        <ImageGallery referenceId={id} titleVariant="small" />
      </CardContent>

      <EditDialog
        open={isEditing}
        measurement={measurement}
        onClose={() => setIsEditing(false)}
      />
    </Card>
  );
};
