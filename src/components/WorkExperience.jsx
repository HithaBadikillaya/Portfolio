import styled from 'styled-components';
import React from 'react';

const workExperiences = [
  {
    company: "Codelab Systems",
    role: "Full Stack Development Intern",
    duration: "Jan 2024 - April 2024",
    description:
      "Worked in a team with the mentorship of developers and led the development of innovative software solutions that improved overall efficiency.",
  },
  {
    company: "Zidio Development",
    role: "Web Development Intern",
    duration: "Feb 2025 - Present",
    description:
      "Oversaw project development and successfully implemented several key features that increased customer satisfaction.",
  },
];

const WorkExperience = () => {
  return (
    <ExperienceSection id="work">
      <WaveTop>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M0,50 C150,150 350,0 500,50 L500,0 L0,0 Z" />
        </svg>
      </WaveTop>

      <div className="container">
        <h1
          className="text-center mb-5"
          style={{
            fontWeight: 700,
            fontSize: "2rem",
            color: "#fff",
          }}
        >
          Work Experience
        </h1>
        <Divider />

        <div className="row justify-content-center">
          <div className="col-md-8">
            {workExperiences.map((exp, index) => (
              <React.Fragment key={index}>
                <ExperienceCard>
                  <h3 className="card-title mb-2">{exp.company}</h3>
                  <h5 className="card-subtitle mb-3 text-muted">
                    {exp.role} | {exp.duration}
                  </h5>
                  <p className="card-text">{exp.description}</p>
                </ExperienceCard>
                {index !== workExperiences.length - 1 && <CardDivider />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <WaveBottom>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M0,50 C150,0 350,150 500,50 L500,150 L0,150 Z" />
        </svg>
      </WaveBottom>
    </ExperienceSection>
  );
};

export default WorkExperience;


const ExperienceSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, rgb(82, 110, 111), rgb(138, 140, 175));
  padding: 80px 0;
  overflow: hidden;
`;

const WaveTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-98%);
  svg {
    width: 100%;
    height: 150px;
    fill: #3B0B0B;
  }
`;

const WaveBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(98%);
  svg {
    width: 100%;
    height: 150px;
    fill: #3B0B0B;
  }
`;

const Divider = styled.hr`
  width: 60px;
  height: 3px;
  background-color: #fff;
  border: none;
  margin: 0 auto 40px auto;
`;

const CardDivider = styled.hr`
  width: 80%;
  height: 1px;
  background-color: #ccc;
  border: none;
  margin: 20px auto;
`;

const ExperienceCard = styled.div`
  background-color: #fff;
  border-left: 5px solid #ffd3b4;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .card-title {
    margin-bottom: 8px;
    font-weight: 700;
    color: #444;
  }

  .card-subtitle {
    margin-bottom: 12px;
    font-weight: 500;
    color: #666;
  }

  .card-text {
    line-height: 1.6;
    color: #555;
  }
`;
