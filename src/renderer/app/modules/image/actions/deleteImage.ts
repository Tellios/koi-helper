import { TransactionProvider, ImageService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const deleteImage = async (imageId: string) => {
  await TransactionProvider.provide(async entityManager => {
    const imageService = ServiceLocator.get(ImageService);
    return await imageService.delete(entityManager, imageId);
  });
};
