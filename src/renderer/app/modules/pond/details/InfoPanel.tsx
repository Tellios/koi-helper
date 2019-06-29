import * as React from "react";
import {
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { Save, ExpandMore } from "@material-ui/icons";
import { defaultTo, toNumber, omit } from "lodash";
import { IPond } from "app/storage";
import { useAppState } from "app/state";

interface IInfoPanelProps {
  pond: IPond;
}

type EditedPondProperties = Partial<IPond>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      alignSelf: "center",
      color: theme.palette.text.secondary
    }
  })
);

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({
  pond
}) => {
  const [state, setState] = React.useState<EditedPondProperties>({});
  const { actions } = useAppState();
  const classes = useStyles();

  const handleChange = (property: keyof IPond, value: any) => {
    if (value === pond[property]) {
      return setState(omit(state, [property]));
    }

    setState({
      ...state,
      [property]: value
    });
  };

  const resetForm = () => setState({});

  const isChanged = Object.keys(state).length > 0;

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography variant="h4" className={classes.heading}>
          Info
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.secondaryHeading}
        >
          Expand to view or edit info
        </Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Name"
                value={defaultTo(state.name, pond.name)}
                onChange={e => handleChange("name", e.target.value)}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Volume (liters)"
                type="number"
                value={defaultTo(state.volume, pond.volume)}
                onChange={e => handleChange("volume", toNumber(e.target.value))}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Depth (meters)"
                type="number"
                value={defaultTo(state.depth, pond.depth)}
                onChange={e => handleChange("depth", toNumber(e.target.value))}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Length (meters)"
                type="number"
                value={defaultTo(state.length, pond.length)}
                onChange={e => handleChange("length", toNumber(e.target.value))}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Width (meters)"
                type="number"
                value={defaultTo(state.width, pond.width)}
                onChange={e => handleChange("width", toNumber(e.target.value))}
              />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!isChanged}
                  onClick={() => {
                    actions.updatePond({ ...pond, ...state });
                    resetForm();
                  }}
                >
                  <Save />
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disabled={!isChanged}
                  size="large"
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
