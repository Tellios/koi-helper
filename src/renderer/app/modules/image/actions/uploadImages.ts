import sharp from "sharp";
import * as path from "path";
import { remote } from "electron";
import { AsyncAction } from "app/state";
import { TransactionProvider, IImageBase, Id, ImageService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const uploadImages: AsyncAction<Id> = async (
  { state },
  referenceId: Id
) => {
  const result = await remote.dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "images", extensions: ["jpg", "jpeg", "png"] }]
  });

  if (!result.filePaths || result.filePaths.length === 0) {
    return;
  }

  const imageFiles = result.filePaths;
  state.isUploadingImages = true;
  state.imagesUploaded = 0;
  state.totalImagesToUpload = imageFiles.length;

  await TransactionProvider.provide(async entityManager => {
    const imageService = ServiceLocator.get(ImageService);

    return await Promise.all(
      imageFiles.map(async filename => {
        const name = path.parse(filename).name;

        const thumbnailBuffer = await sharp(filename)
          .resize(null, 160)
          .toFormat(sharp.format.png)
          .toBuffer();

        const thumbnail: IImageBase = {
          name,
          isThumbnail: true,
          reference: referenceId,
          data: thumbnailBuffer.toString("base64")
        };

        const imageBuffer = await sharp(filename)
          .toFormat(sharp.format.png)
          .toBuffer();

        const image: IImageBase = {
          name,
          isThumbnail: false,
          reference: referenceId,
          data: imageBuffer.toString("base64")
        };

        const addedImage = await imageService.add(
          entityManager,
          image,
          thumbnail
        );

        state.imagesUploaded = state.imagesUploaded + 1;

        return addedImage;
      })
    );
  });

  state.isUploadingImages = false;
};
