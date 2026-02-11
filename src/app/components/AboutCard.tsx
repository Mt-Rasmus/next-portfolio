/** @jsxImportSource @emotion/react */
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { AboutItem } from "@/app/types/about";
import { roboto } from "@/app/fonts";

export default function AboutCard({
  item: { title, description, image, direction, imageOrientation },
  lighterBackground,
}: {
  item: AboutItem;
  lighterBackground: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerStyle = css`
    display: flex;
    flex-direction: ${isMobile
      ? "column"
      : direction === "right"
        ? "row"
        : "row-reverse"};
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    gap: 1rem;
    background-color: ${lighterBackground && "var(--primary-light)"};
  `;

  const imageStyle = css`
    ${
      imageOrientation === "portrait"
        ? `
        height: 400px; 
        width: auto;
      `
        : `
        width: 400px; 
        height: auto;
      `
    }

    transform: ${
      !isMobile
        ? isVisible
          ? "translateX(0)"
          : direction === "right"
            ? "translateX(200px)"
            : "translateX(-200px)"
        : "none"
    };
    opacity: ${isVisible ? 1 : 0};
    transition:
      transform 0.6s ease-out,
      opacity 0.6s ease-out;
    border-radius: 4px;
    margin: 0 1rem 0 1rem;
    flex-shrink: 0;
      @media (max-width: 768px) {
        margin-top: 1rem;
      }
    }
  `;

  const textStyle = css`
    max-width: 370px;
    text-align: left;
    h2 {
      font-weight: 500;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    p {
      font-family: ${roboto.style.fontFamily};
      font-weight: 300;
      font-size: 1rem;
      line-height: 1.5;
    }
  `;

  const dividerStyle = css`
    height: 4px;
    background-color: rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  `;

  return (
    <div>
      <div css={dividerStyle} />
      <div ref={ref} css={containerStyle}>
        <div css={textStyle}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          css={imageStyle}
        />
      </div>
    </div>
  );
}
