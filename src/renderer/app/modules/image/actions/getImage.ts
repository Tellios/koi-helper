import { TransactionProvider, ImageService, IImage, Id } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const getImage = async (
  id: Id,
  isThumbnail: boolean
): Promise<IImage> => {
  return await TransactionProvider.provide(async entityManager => {
    const imageService = ServiceLocator.get(ImageService);
    return await imageService.getImage(entityManager, id, isThumbnail);
  });
};
