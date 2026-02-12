import styled from "@emotion/styled";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const SocialLink = styled.a<{ size?: "normal" | "large" }>`
  color: white;
  font-size: ${({ size }) => (size === "large" ? "2rem" : "1.25rem")};
  margin: 0 0.15rem;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: var(--primary-darker);
  }
`;

const Socials = ({ size }: { size?: "normal" | "large" }) => {
  return (
    <>
      <SocialLink
        href="https://github.com/Mt-Rasmus"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        size={size}
      >
        <FaGithub />
      </SocialLink>
      <SocialLink
        href="https://linkedin.com/in/rasmus-ståhl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        size={size}
      >
        <FaLinkedin />
      </SocialLink>
      <SocialLink
        href="mailto:rasmus.stahl.47@gmail.com"
        aria-label="Email"
        size={size}
      >
        <FaEnvelope />
      </SocialLink>
    </>
  );
};
export default Socials;
