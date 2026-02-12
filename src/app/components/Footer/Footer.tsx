"use client";
import styled from "@emotion/styled";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Section = styled.section`
  position: relative;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--foreground);
  color: white;
  height: 3.25rem;
  margin-top: 2rem;
  gap: 0.75rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  flex: 1;
  justify-content: center;
`;

const Year = styled.span`
  position: absolute;
  right: 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: white;
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

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Section>
      <SocialLinks>
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
      </SocialLinks>
      <Year>© {currentYear}</Year>
    </Section>
  );
};

export default Footer;
