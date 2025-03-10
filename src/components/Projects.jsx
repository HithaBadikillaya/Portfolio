import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const projects = [
  {
    title: "Weather Explorer",
    description: "An immersive weather app using React and Three.js for real-time weather data.",
    image: "/assets/weather.png",
    codeLink: "https://github.com/HithaBadikillaya/Weather-App",
  },
  {
    title: "AI Resume Parser",
    description: "Streamlines the recruitment process by automating resume parsing with candidate details.",
    image: "/assets/resume.png",
    codeLink: "https://github.com/HithaBadikillaya/Resume-Parser",
  },
  {
    title: "To Do List",
    description: "A simple to-do list where users can add, edit, or delete tasks.",
    image: "/assets/todolist.png",
    codeLink: "https://github.com/HithaBadikillaya/To-Do-List",
  },
  {
    title: "Mean It",
    description: "A Chrome extension that provides instant word meanings on any webpage.",
    image: "/assets/meanit.png",
    codeLink: "https://github.com/HithaBadikillaya/MeanIt_chrome-ext",
  },
  {
    title: "Belle Allure",
    description: "An E-Commerce website for beauty products using the MERN stack.",
    image: "/assets/belleallure.png",
    codeLink: "https://github.com/HithaBadikillaya/Belle-Allure_Web",
  },
];

const Projects = () => {
  return (
    <ProjectsSection id="projects">
      <WaveTop>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M0,50 C150,150 350,0 500,50 L500,0 L0,0 Z" />
        </svg>
      </WaveTop>

      <div className="container">
        <h1
          className="text-center mb-3"
          style={{ fontWeight: 700, fontSize: "2rem", color: "#fff" }}
        >
          Projects
        </h1>
        <Divider />
        <div className="row g-4 align-items-stretch">
          {projects.map((project, index) => (
            <div key={index} className="col-md-6 d-flex justify-content-center">
              <StyledCard>
                <div className="card-inner">
                  <div className="card-front">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-img"
                    />
                  </div>

                  <div className="card-back">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-description">{project.description}</p>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
              </StyledCard>
            </div>
          ))}
        </div>
      </div>

      <WaveBottom>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M0,50 C150,0 350,150 500,50 L500,150 L0,150 Z" />
        </svg>
      </WaveBottom>
    </ProjectsSection>
  );
};

export default Projects;


const ProjectsSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, #c1b7b3, #a99a97);
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
    fill: #a99a97;
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
    fill: #a99a97;
  }
`;

const Divider = styled.div`
  width: 60px;
  height: 4px;
  background-color: #fff;
  margin: 20px auto;
`;

const StyledCard = styled.div`
  width: 400px;
  height: 300px;
  perspective: 1000px;
  margin-bottom: 20px;

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  &:hover .card-inner {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  /* FRONT: Dark gradient for the front */
  .card-front {
    background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* BACK: Dark card with light text */
  .card-back {
    background: #1a1a1a;
    color: #fff;
    transform: rotateY(180deg);
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  }

  .card-title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }

  .card-description {
    font-size: 16px;
    margin: 10px 0 20px;
    color: #eee;
    line-height: 1.5;
  }

  .btn-primary {
    background-color: #343a40;
    border-color: #343a40;
    transition: background-color 0.3s, transform 0.3s;
    font-size: 16px;
    padding: 8px 16px;
    color: #fff;
  }

  .btn-primary:hover {
    background-color: #23272b;
    transform: scale(1.05);
  }
`;
