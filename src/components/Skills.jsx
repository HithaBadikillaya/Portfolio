import styled from 'styled-components';

const Skills = () => {
  const skills = [
    { name: "Java", logo: "/assets/java.png" },
    { name: "JavaScript", logo: "/assets/javascript.png" },
    { name: "HTML5", logo: "/assets/html.png" },
    { name: "Python", logo: "/assets/python.png" },
    { name: "Express.js", logo: "/assets/express.png" },
    { name: "JWT", logo: "/assets/jwt.png" },
    { name: "NodeJS", logo: "/assets/node.png" },
    { name: "React", logo: "/assets/react.png" },
    { name: "Git/Github", logo: "/assets/github.png" },
    { name: "TailwindCSS", logo: "/assets/tailwind.png" },
    { name: "WordPress", logo: "/assets/wordpress.png" },
    { name: "MongoDB", logo: "/assets/mongodb.png" },
    { name: "MySQL", logo: "/assets/sql.png" },
    { name: "Figma", logo: "/assets/figma.png" },
    { name: "Postman", logo: "/assets/postman.png" },
    { name: "Jira", logo: "/assets/jira.png" },
  ];

  return (
    <SkillsSection id="skills">
      <SkillsContainer>
        <SectionTitle>Skills</SectionTitle>
        <Divider />
        <SkillGrid>
          {skills.map((skill) => (
            <SkillItem key={skill.name}>
              <SkillLogo src={skill.logo} alt={`${skill.name} logo`} />
              <SkillName>{skill.name}</SkillName>
            </SkillItem>
          ))}
        </SkillGrid>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;


const SkillsSection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #1f1f1f, #333333);
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #f5f5f5;
`;

const Divider = styled.div`
  width: 80px;
  height: 4px;
  background-color: #2daa9e;
  margin: 0 auto 40px auto;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
  justify-items: center;

  @media (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, auto);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, auto);
  }
`;

const SkillItem = styled.div`
  background-color: #444;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  }
`;

const SkillLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const SkillName = styled.span`
  margin-top: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #f5f5f5;
`;
