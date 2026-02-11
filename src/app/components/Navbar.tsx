"use client";
import Link from "next/link";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

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
        <SocialLink aria-label="Twitter">
          <FaTwitter />
        </SocialLink>
      </SocialsContainer>
    </Section>
  );
}
export default Navbar;
