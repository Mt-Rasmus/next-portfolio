"use client";
import Link from "next/link";
import styled from "@emotion/styled";

const Section = styled.section`
  background: #1ed4d4;
  color: #fff;
  display: flex;
  gap: 1rem;
`;

const Navbar = () => {
  return (
    <Section>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
    </Section>
  );
};

export default Navbar;
