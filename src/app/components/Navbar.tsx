/** @jsxImportSource @emotion/react */
"use client";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const Section = styled.section`
  position: relative;
  padding: 1rem;
  display: flex;
  justify-content: center;
  background-color: var(--foreground);
  color: white;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex: 1;
`;

const SocialsContainer = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.25rem;
  margin: 0 0.15rem;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: var(--primary-darker);
  }
`;

const imageStyle = css`
  position: absolute;
  left: 1.375rem;
  bottom: 0.55rem;
  height: auto;
`;

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "var(--primary-dark)" : "white")};
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-darker);
  }
`;

const navLinkData = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/admin", label: "Admin" },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <Section>
      <Image
        src={"/name.png"}
        alt="Rasmus Ståhl"
        width={135}
        height={100}
        css={imageStyle}
      />
      <NavContainer>
        {navLinkData.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            isActive={pathname === link.href}
          >
            {link.label}
          </NavLink>
        ))}
      </NavContainer>
      <SocialsContainer>
        <SocialLink
          href="https://github.com/Mt-Rasmus"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </SocialLink>
        <SocialLink
          href="https://linkedin.com/in/rasmus-ståhl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </SocialLink>
        <SocialLink href="mailto:rasmus.stahl.47@gmail.com" aria-label="Email">
          <FaEnvelope />
        </SocialLink>
      </SocialsContainer>
    </Section>
  );
}
export default Navbar;
