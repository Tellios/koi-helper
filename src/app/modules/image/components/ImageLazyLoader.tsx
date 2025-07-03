import { logger } from '@shared/logger';
import { IImageReference } from '@shared/models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getImage } from '../operations';

interface ImageLazyLoaderProps {
  image: IImageReference;
  isThumbnail: boolean;
  children: (
    imageData: string | undefined,
    ref: React.Ref<HTMLElement>,
    isLoading: boolean,
  ) => React.ReactNode;
}

export const ImageLazyLoader = ({ image, isThumbnail, children }: ImageLazyLoaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ imageId: string; imageData: string | undefined } | undefined>(
    undefined,
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    let didCancel = false;

    if (inView && (data?.imageId !== image.id || data.imageData === undefined)) {
      setIsLoading(true);
      setData({
        imageId: image.id,
        imageData: undefined,
      });

      const idFetchingImageFor = image.id;

      getImage(image.id, isThumbnail)
        .then((imageWithData) => {
          if (!didCancel) {
            setData((prev) => {
              if (prev?.imageId !== idFetchingImageFor) {
                return prev;
              }

              return {
                imageId: idFetchingImageFor,
                imageData: imageWithData.data,
              };
            });
          }
        })
        .catch((e) => {
          logger.error(e.toString());
        })
        .finally(() => {
          if (!didCancel) {
            setIsLoading(false);
          }
        });
    } else if (!inView && data?.imageData !== undefined) {
      setData(undefined);
    }

    return () => {
      didCancel = true;
    };
  }, [inView, image.id, data?.imageId, data?.imageData, isThumbnail]);

  return <>{children(data?.imageData, ref, isLoading)}</>;
};
