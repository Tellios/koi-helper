import { TransactionProvider, ImageService } from "app/storage";
import { ServiceLocator } from "app/ioc";

export const deleteImagesForReference = async (referenceId: string) => {
  await TransactionProvider.provide(async entityManager => {
    const imageService = ServiceLocator.get(ImageService);
    return await imageService.deleteImagesForReference(
      entityManager,
      referenceId
    );
  });
};
