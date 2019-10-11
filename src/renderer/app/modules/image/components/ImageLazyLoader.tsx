import * as React from "react";
import { IImageReference } from "app/storage";
import { useInView } from "react-intersection-observer";
import { getImage } from "../operations";

interface IImageProps {
  image: IImageReference;
  isThumbnail: boolean;
  children: (
    imageData: string | null,
    ref: React.Ref<any>,
    isLoading: boolean
  ) => React.ReactNode;
}

export const ImageLazyLoader: React.FunctionComponent<IImageProps> = ({
  image,
  isThumbnail,
  children
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadedImageId, setLoadedImageId] = React.useState<string | null>(null);
  const [imageData, setImageData] = React.useState<string | null>(null);
  const [ref, inView] = useInView();

  React.useEffect(() => {
    let didCancel = false;

    if (inView && (loadedImageId !== image.id || imageData === null)) {
      setIsLoading(true);

      getImage(image.id, isThumbnail)
        .then(imageWithData => {
          if (!didCancel) {
            setImageData(imageWithData.data);
            setLoadedImageId(image.id);
          }
        })
        .finally(() => {
          if (!didCancel) setIsLoading(false);
        });
    } else if (!inView && imageData !== null) {
      setImageData(null);
      setLoadedImageId(null);
    }

    return () => {
      didCancel = true;
    };
  }, [
    inView,
    setImageData,
    setIsLoading,
    setLoadedImageId,
    loadedImageId,
    image.id
  ]);

  return <>{children(imageData, ref, isLoading)}</>;
};
