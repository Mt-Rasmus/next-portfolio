/** @jsxImportSource @emotion/react */
"use client";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import Socials from "./Socials";

const Section = styled.section`
  position: relative;
  padding: 1rem;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--foreground);
  color: white;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialsContainer = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    display: none;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Section>
      <Image
        src="/name.png"
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
        <Socials />
      </SocialsContainer>
      {isMobile && <MobileMenu links={navLinkData} currentPath={pathname} />}
    </Section>
  );
}
export default Navbar;
