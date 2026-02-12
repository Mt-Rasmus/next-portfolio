import Image from "next/image";
import React from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

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
        priority
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
