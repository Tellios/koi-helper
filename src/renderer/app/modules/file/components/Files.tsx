import * as React from "react";
import { Box, Button, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Id, IFileReference } from "app/storage";
import { useAppState } from "app/state";
import { ListHeader } from "app/ui";
import { getFileReferences } from "../operations";
import { FileTable } from "./FileTable";

interface IFileTableProps {
  referenceId: Id;
}

export const Files: React.FC<IFileTableProps> = ({ referenceId }) => {
  const { actions } = useAppState();
  const [references, setReferences] = React.useState<IFileReference[] | null>(
    null
  );

  React.useEffect(() => {
    getFileReferences(referenceId).then(setReferences);
  }, [referenceId]);

  const onUploadFiles = async () => {
    await actions.uploadFiles({ referenceId });
    getFileReferences(referenceId).then(setReferences);
  };

  const onUpdateFile = async (file: IFileReference) => {
    await actions.updateFile({ fileId: file.id });
    getFileReferences(referenceId).then(setReferences);
  };

  const onDeleteFile = async (file: IFileReference) => {
    await actions.deleteFile({ fileId: file.id });

    if (references) {
      const updatedReferences = references.filter(ref => ref.id !== file.id);
      setReferences(updatedReferences);
    }
  };

  return (
    <Box>
      <ListHeader
        title="pew pew files"
        titleVariant="large"
        actionArea={
          <Button onClick={onUploadFiles}>
            <Add />
            {"Add pew pew files"}
          </Button>
        }
      />

      {references === null && <CircularProgress />}
      {references !== null && (
        <FileTable
          references={references}
          onUpdateFile={onUpdateFile}
          onDeleteFile={onDeleteFile}
        />
      )}
    </Box>
  );
};
