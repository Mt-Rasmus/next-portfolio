import { type Project } from "@/app/types/project";

const ProjectCard = ({ project }: { project: Project }) => {
  return <div>{project.title}</div>;
};

export default ProjectCard;
