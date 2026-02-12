/** @jsxImportSource @emotion/react */
"use client";
import Link from "next/link";
import styled from "@emotion/styled";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Socials from "./Socials";

const Wrapper = styled.div`
  display: none;
  position: relative;
  height: 1.5rem;
  width: 100%;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  inset: 0;
  background-color: var(--foreground);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1000;
`;

const MenuLink = styled(Link)<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "var(--primary-dark)" : "white")};
  font-size: 1.5rem;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-darker);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SocialsContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 1rem;
`;

interface MobileMenuProps {
  links: Array<{ href: string; label: string }>;
  currentPath: string;
}

export default function MobileMenu({ links, currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <MenuButton onClick={() => setIsOpen(true)} aria-label="Open menu">
        <FaBars />
      </MenuButton>
      <Overlay isOpen={isOpen}>
        <CloseButton onClick={() => setIsOpen(false)} aria-label="Close menu">
          <FaTimes />
        </CloseButton>
        {links.map((link) => (
          <MenuLink
            key={link.href}
            href={link.href}
            isActive={currentPath === link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </MenuLink>
        ))}
        <SocialsContainer>
          <Socials size="large" />
        </SocialsContainer>
      </Overlay>
    </Wrapper>
  );
}
