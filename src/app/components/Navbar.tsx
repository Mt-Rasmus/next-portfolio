"use client";
import Link from "next/link";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

const Section = styled.section`
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "var(--primary-darker)" : "black")};
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
      {navLinkData.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          isActive={pathname === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </Section>
  );
}
export default Navbar;
