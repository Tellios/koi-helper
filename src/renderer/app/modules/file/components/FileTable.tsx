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

interface IFileTableProps {
  references: IFileReference[];
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
      title: "pew name",
      format: value => value
    },
    {
      id: "extension",
      title: "pew ext",
      format: value => value
    },
    {
      id: "updated",
      title: "pew updated",
      format: value => formatDate(value)
    }
  ];
};

export const FileTable: React.FC<IFileTableProps> = ({
  references,
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
          <TableCell>pew pew actions</TableCell>
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
              <Tooltip title="pew pew save local">
                  <IconButton onClick={() => onSaveFile(reference)}>
                    <Save />
                  </IconButton>
                </Tooltip>
                <Tooltip title="pew pew update file">
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
