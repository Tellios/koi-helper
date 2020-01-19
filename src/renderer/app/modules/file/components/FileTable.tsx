import * as React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { AttachFile, Save } from "@material-ui/icons";
import { IFileReference } from "app/storage";
import { formatDate, DeleteButton } from "app/ui";
import { t } from "app/i18n";

interface IFileTableProps {
  references: IFileReference[];
  onSaveFile: (file: IFileReference) => void;
  onUpdateFile: (file: IFileReference) => void;
  onDeleteFile: (file: IFileReference) => void;
}

type IColumn<T> = {
  [P in keyof T]: {
    id: P;
    title: string;
    format: (value: T[P]) => string;
  };
}[keyof T];

const getColumns = (): IColumn<IFileReference>[] => {
  return [
    {
      id: "name",
      title: t.file.columns.name,
      format: value => value
    },
    {
      id: "extension",
      title: t.file.columns.extension,
      format: value => value
    },
    {
      id: "updated",
      title: t.file.columns.updated,
      format: value => formatDate(value)
    }
  ];
};

export const FileTable: React.FC<IFileTableProps> = ({
  references,
  onSaveFile,
  onUpdateFile,
  onDeleteFile
}) => {
  const columns: IColumn<IFileReference>[] = React.useMemo(getColumns, []);

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.id}>{column.title}</TableCell>
          ))}
          <TableCell>{t.file.columns.actions}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {references.map(reference => {
          return (
            <TableRow key={reference.id}>
              {columns.map(column => {
                const value = reference[column.id];

                return (
                  <TableCell key={column.id}>
                    {column.format(value as any)}
                  </TableCell>
                );
              })}
              <TableCell>
                <Tooltip title={t.file.saveFileToComputerAction}>
                  <IconButton onClick={() => onSaveFile(reference)}>
                    <Save />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t.file.updateFileAction}>
                  <IconButton onClick={() => onUpdateFile(reference)}>
                    <AttachFile />
                  </IconButton>
                </Tooltip>
                <DeleteButton onDelete={() => onDeleteFile(reference)} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
