import { IImageReference } from '@app/storage';
import * as React from 'react';
import { ImageContent } from './ImageContent';
import { ImageLazyLoader } from './ImageLazyLoader';

interface IImageDialogBigImage {
  reference: IImageReference;
}

export const ImageDialogBigImage: React.FunctionComponent<IImageDialogBigImage> = ({
  reference,
}) => {
  return (
    <ImageLazyLoader image={reference} isThumbnail={false}>
      {(imageData, ref, isLoading) => {
        return (
          <ImageContent
            imageContainerSx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
            imgSx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            imageContainerRef={ref}
            isLoading={isLoading}
            imageName={reference.name}
            imageData={imageData}
          />
        );
      }}
    </ImageLazyLoader>
  );
};
