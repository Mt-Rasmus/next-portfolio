/** @jsxImportSource @emotion/react */
"use client";
import StyledButton from "@/app/components/StyledButton";
import Link from "next/link";
import { css } from "@emotion/react";
import AdminProjects from "../admin/AdminProjects";
import { Project } from "../types/project";

const containerStyle = css`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdminPageContent = ({ projects }: { projects: Project[] }) => {
  return (
    <div css={containerStyle}>
      <Link href="/admin/projects/new" passHref>
        <StyledButton>Create New Project</StyledButton>
      </Link>
      <AdminProjects projects={projects} />
    </div>
  );
};

export default AdminPageContent;
