import sharp from "sharp";
import * as path from "path";
import { AsyncAction } from "app/state";
import { TransactionProvider, IImageBase, Id, ImageService } from "app/storage";
import { ServiceLocator } from "app/ioc";
import { selectFiles } from "app/utilities";
import { t } from "app/i18n";

export interface IUploadImagesParams {
  referenceId: Id;
  type: "ImageGallery" | "Profile";
}

export const uploadImages: AsyncAction<IUploadImagesParams> = async (
  { state },
  { referenceId, type }
) => {
  const result = await selectFiles({
    mode: type === "ImageGallery" ? "multiSelect" : "singleSelect",
    filters: [
      {
        name: "Images",
        extensions: ["jpg", "jpeg", "png"]
      }
    ]
  });

  if (!result.filePaths || result.filePaths.length === 0) {
    return;
  }

  const imageFiles = result.filePaths;
  state.appProgressOpen = true;
  state.appProgressMessage = t.common.imageGallery.uploadProgressMessage;
  state.appProgressMode = "count";
  state.appProgressTotalCount = result.filePaths.length;
  state.appProgressCurrentCount = 0;

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

        state.appProgressCurrentCount = state.appProgressCurrentCount + 1;

        return addedImage;
      })
    );
  });

  state.appProgressOpen = false;
};
