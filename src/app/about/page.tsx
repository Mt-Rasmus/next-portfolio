import AboutIntroduction from "@/app/components/AboutIntroduction";
import AboutCard from "@/app/components/AboutCard";
import { type AboutItem } from "@/app/types/about";

const BASE_IMAGE_PATH = "/about";

const aboutData: AboutItem[] = [
  {
    title: "Web Development",
    description:
      "I love the process of building interfaces that are clean, intuitive, and look exactly the way they’re supposed to. For me, there's nothing better than shipping a pixel-perfect site that users actually enjoy navigating.",
    image: `${BASE_IMAGE_PATH}/coding.png`,
    imageOrientation: "landscape",
    direction: "right",
  },
  {
    title: "Animation & Storytelling",
    description:
      "I run my own little 2D animation factory. I handle everything — writing the scripts, drawing the characters, doing the voices, and mixing the sound. It’s a lot of work, but I love the process of bringing a funny idea to life from scratch.",
    image: `${BASE_IMAGE_PATH}/cintiq2.jpg`,
    imageOrientation: "landscape",
    direction: "left",
  },
  {
    title: "Fishing",
    description:
      "My favorite way to unplug. Whether I'm out in the Swedish archipelago or urban fishing in the Amsterdam canals, I just love being by the water. It’s the perfect balance of fresh air and focus (and occasionally catching something).",
    image: `${BASE_IMAGE_PATH}/fishing1.jpeg`,
    imageOrientation: "portrait",
    direction: "right",
  },
  {
    title: "Running",
    description:
      "Whenever I need a break from the screen, I head outside. Running is my go-to for clearing my head and getting some movement in. It’s not about breaking records—just about the freedom of being out on the trails.",
    image: `${BASE_IMAGE_PATH}/running.jpg`,
    imageOrientation: "landscape",
    direction: "left",
  },
];

const AboutPage = () => {
  return (
    <div>
      <AboutIntroduction />
      {aboutData.map((item, index) => (
        <AboutCard
          key={index}
          item={item}
          isLastItem={index === aboutData.length - 1}
        />
      ))}
    </div>
  );
};

export default AboutPage;
