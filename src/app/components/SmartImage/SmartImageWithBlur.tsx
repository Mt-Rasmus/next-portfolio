import { getImage } from "@/helpers/getImage";
import SmartImage from "./SmartImage";

type SmartImageWithBlurProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default async function SmartImageWithBlur({
  src,
  alt,
  className,
  priority = false,
}: SmartImageWithBlurProps) {
  let blurDataURL: string | undefined;
  let imageWidth = 800;
  let imageHeight = 600;

  try {
    const imageData = await getImage(src);
    blurDataURL = imageData.base64;
    imageWidth = imageData.img.width;
    imageHeight = imageData.img.height;
  } catch (error) {
    console.error("Failed to generate blur placeholder for:", src, error);
  }

  return (
    <SmartImage
      src={src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={className}
      priority={priority}
      blurDataURL={blurDataURL}
    />
  );
}
