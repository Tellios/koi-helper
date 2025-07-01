export * from './components';
export * from './operations';

import { uploadImages } from './actions';

export interface IImageActions {
  uploadImages: typeof uploadImages;
}

export const imageActions: IImageActions = {
  uploadImages,
};
