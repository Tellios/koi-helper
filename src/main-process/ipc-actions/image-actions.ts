import { ServiceLocator } from '@main-process/ioc';
import { ImageService, TransactionProvider } from '@main-process/storage';
import { Id, IImageBase, IImageReference } from '@shared/models';
import sharp from 'sharp';
import { ipcActionFactory } from './ipc-action-factory';

ipcActionFactory(
  'image:add',
  async (params: { thumbnail: IImageBase; image: IImageBase }): Promise<IImageReference> => {
    return await TransactionProvider.provide(async (entityManager) => {
      const imageService = ServiceLocator.get(ImageService);
      return await imageService.add(entityManager, params.image, params.thumbnail);
    });
  },
);

ipcActionFactory('image:delete', async (imageId: Id): Promise<void> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const imageService = ServiceLocator.get(ImageService);
    await imageService.delete(entityManager, imageId);
  });
});

ipcActionFactory('image:deleteForReference', async (referenceId: Id): Promise<void> => {
  return await TransactionProvider.provide(async (entityManager) => {
    const imageService = ServiceLocator.get(ImageService);
    await imageService.deleteImagesForReference(entityManager, referenceId);
  });
});

ipcActionFactory(
  'image:get',
  async (params: { id: Id; isThumbnail: boolean }): Promise<IImageReference> => {
    return TransactionProvider.provide(async (entityManager) => {
      const imageService = ServiceLocator.get(ImageService);
      return await imageService.getImage(entityManager, params.id, params.isThumbnail);
    });
  },
);

ipcActionFactory('image:getReferences', async (referenceId: Id): Promise<IImageReference[]> => {
  return TransactionProvider.provide(async (entityManager) => {
    const imageService = ServiceLocator.get(ImageService);
    return await imageService.getImageReferences(entityManager, referenceId);
  });
});

ipcActionFactory('image:generateThumbnail', async (encodedImage: string): Promise<string> => {
  const thumbnailBuffer = await sharp(Buffer.from(encodedImage, 'base64'))
    .resize(null, 160)
    .toFormat(sharp.format.png)
    .toBuffer();

  return thumbnailBuffer.toString('base64');
});

ipcActionFactory('image:convertToPng', async (encodedImage: string): Promise<string> => {
  const imageBuffer = await sharp(Buffer.from(encodedImage, 'base64'))
    .toFormat(sharp.format.png)
    .toBuffer();

  return imageBuffer.toString('base64');
});
