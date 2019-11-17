import { Module } from "app/ioc";
import { uploadImages } from "./actions";

export interface IImageActions {
  uploadImages: typeof uploadImages;
}

@Module({
  name: "image",
  actions: [{ name: "uploadImages", action: uploadImages }]
})
export class ImageModule {}
