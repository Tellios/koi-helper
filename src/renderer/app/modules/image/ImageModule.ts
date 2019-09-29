import { Module } from "app/ioc";
import { uploadImages } from "./actions";

export interface IImageActions {
  uploadImages: typeof uploadImages;
}

@Module({
  actions: [uploadImages]
})
export class ImageModule {}
