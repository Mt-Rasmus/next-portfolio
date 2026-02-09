/** @jsxImportSource @emotion/react */
"use client";
import Image from "next/image";
import { css, keyframes } from "@emotion/react";
import { montserrat, roboto } from "@/app/fonts";
import { motion } from "framer-motion";

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: start;
  padding: 2rem;
  background-color: #fdf7c3;

  h1 {
    font-family: ${montserrat.style.fontFamily};
    font-weight: 400;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  p {
    font-family: ${roboto.style.fontFamily};
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 600px;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-200px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const imageStyle = css`
  border-radius: 4px;
  max-height: 500px;
  width: auto;
  margin-right: 3rem;
  animation: ${slideIn} 0.8s ease-out forwards;
`;

const fadeInStyle = css`
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.5s;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const name = "Hi, I’m Rasmus";

export default function AboutIntroduction() {
  return (
    <div>
      <div css={containerStyle}>
        <Image
          src="/about/me-small.png"
          alt="Rasmus"
          width={400}
          height={500}
          css={imageStyle}
        />
        <div>
          <h1>
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <p css={fadeInStyle}>
            I’m a web developer based in Amsterdam. <br></br> Scroll down to
            find out some things I like to do in my day.
          </p>
        </div>
      </div>
      {/* <div>Here are some things I like to do in my day</div> */}
    </div>
  );
}
