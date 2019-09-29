import {
  TransactionProvider,
  ImageService,
  IImageReference
} from "app/storage";
import { ServiceLocator } from "app/ioc";

export const getImageReferences = async (
  referenceId: string
): Promise<IImageReference[]> => {
  return await TransactionProvider.provide(async entityManager => {
    const imageService = ServiceLocator.get(ImageService);
    const references = await imageService.getImageReferences(
      entityManager,
      referenceId
    );

    return references.sort((a, b) => {
      const aTime = a.created.getTime();
      const bTime = b.created.getTime();

      if (aTime > bTime) {
        return 1;
      } else if (aTime < bTime) {
        return -1;
      } else {
        return 0;
      }
    });
  });
};
