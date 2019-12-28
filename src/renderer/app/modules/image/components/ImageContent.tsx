import * as React from "react";
import { CircularProgress } from "@material-ui/core";

interface IImageContentProps {
  imageContainerRef: React.Ref<any>;
  imageContainerClassName: string;
  imgClassName: string;
  imageData: string | null;
  imageName: string;
  isLoading: boolean;
  children?: React.ReactNode | React.ReactNodeArray;
}

export const ImageContent: React.FC<IImageContentProps> = ({
  imageContainerRef,
  imageContainerClassName,
  imgClassName,
  imageData,
  imageName,
  isLoading,
  children
}) => {
  return (
    <div ref={imageContainerRef} className={imageContainerClassName}>
      {isLoading && <CircularProgress />}
      {imageData !== null && (
        <img
          alt={imageName}
          src={`data:image/png;base64, ${imageData}`}
          className={imgClassName}
        />
      )}

      {children}
    </div>
  );
};
