import { Module } from "app/ioc";
import {
  deleteFile,
  editFile,
  saveFile,
  updateFile,
  uploadFiles
} from "./actions";

export interface IFileActions {
  deleteFile: typeof deleteFile;
  editFile: typeof editFile;
  saveFile: typeof saveFile;
  updateFile: typeof updateFile;
  uploadFiles: typeof uploadFiles;
}

@Module({
  name: "File",
  actions: [
    { name: "deleteFile", action: deleteFile },
    { name: "editFile", action: editFile },
    { name: "saveFile", action: saveFile },
    { name: "updateFile", action: updateFile },
    { name: "uploadFiles", action: uploadFiles }
  ]
})
export class FileModule {}
