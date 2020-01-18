import { Module } from "app/ioc";
import { deleteFile, updateFile, uploadFiles } from "./actions";

export interface IFileActions {
  deleteFile: typeof deleteFile;
  updateFile: typeof updateFile;
  uploadFiles: typeof uploadFiles;
}

@Module({
  name: "File",
  actions: [
    { name: "uploadFiles", action: uploadFiles },
    { name: "deleteFile", action: deleteFile },
    { name: "updateFile", action: updateFile }
  ]
})
export class FileModule {}
