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
  const [imageData, setImageData] = React.useState<string | null>(null);
  const [ref, inView] = useInView();

  React.useEffect(() => {
    let didCancel = false;

    if (inView && imageData === null) {
      setIsLoading(true);

      setTimeout(() => {
        getImage(image.id, isThumbnail)
          .then(imageWithData => {
            if (!didCancel) setImageData(imageWithData.data);
          })
          .finally(() => {
            if (!didCancel) setIsLoading(false);
          });
      }, 1000);
    } else if (!inView && imageData !== null) {
      setImageData(null);
    }

    return () => {
      didCancel = true;
    };
  }, [inView, setImageData, setIsLoading]);

  return <>{children(imageData, ref, isLoading)}</>;
};
