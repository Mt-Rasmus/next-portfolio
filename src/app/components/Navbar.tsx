"use client";
import Link from "next/link";
import styled from "@emotion/styled";

const Section = styled.section`
  background: var(--primary-darker);
  padding: 1rem;
  display: flex;
  justify-content: center;
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
      <Link href="/admin">Admin</Link>
    </Section>
  );
};

export default Navbar;
