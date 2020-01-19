import { Module } from "app/ioc";
import { deleteFile, saveFile, updateFile, uploadFiles } from "./actions";

export interface IFileActions {
  deleteFile: typeof deleteFile;
  saveFile: typeof saveFile;
  updateFile: typeof updateFile;
  uploadFiles: typeof uploadFiles;
}

@Module({
  name: "File",
  actions: [
    { name: "deleteFile", action: deleteFile },
    { name: "saveFile", action: saveFile },
    { name: "updateFile", action: updateFile },
    { name: "uploadFiles", action: uploadFiles }
  ]
})
export class FileModule {}
