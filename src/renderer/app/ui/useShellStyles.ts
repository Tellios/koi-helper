import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useShellStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    content: {
      overflow: "hidden",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toast: {
      marginTop: 70
    },
    toolbar: theme.mixins.toolbar,
    firstColumn: {
      borderRight: `1px solid ${theme.palette.divider}`,
      overflowY: "auto",
      padding: theme.spacing(2),
      minWidth: "555px",
      maxWidth: "555px",
      height: "100%"
    },
    secondColumn: {
      overflowY: "auto",
      padding: theme.spacing(2),
      width: "100%",
      height: "100%"
    }
  })
);
