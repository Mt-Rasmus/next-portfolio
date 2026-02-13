/** @jsxImportSource @emotion/react */
import Image from "next/image";
import React from "react";
import { css } from "@emotion/react";

type SmartImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  blurDataURL?: string;
};

const imageStyle = css`
  width: 100%;
  height: auto;
  display: block;
  overflow: hidden;
  border-radius: inherit;
`;

const isTrustedImageSource = (src: string) => {
  try {
    const url = new URL(src);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
};

const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  blurDataURL,
}) => {
  const isTrusted = isTrustedImageSource(src);
  if (isTrusted) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        css={imageStyle}
        priority={priority}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  );
};

export default SmartImage;
