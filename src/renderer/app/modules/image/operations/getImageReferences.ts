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
    return await imageService.getImageReferences(
      entityManager,
      referenceId
    );
  });
};
