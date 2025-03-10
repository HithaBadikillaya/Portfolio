import Navbar from "./Navbar";
import Overview from "./Overview";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import Projects from "./Projects";
import Contacts from "./Contact";
import Footer from "./Footer"; 
import FadeInWrapper from "./FadeInWrapper";
import "../components/Styles.css";

const HomePage = () => {
  return (
    <div className="home-container">
        <Navbar />

      <FadeInWrapper direction="up" delay={0.2}>
        <Overview />
      </FadeInWrapper>

      <FadeInWrapper direction="up" delay={0.3}>
        <Skills />
      </FadeInWrapper>

      <FadeInWrapper direction="up" delay={0.4}>
        <WorkExperience />
      </FadeInWrapper>

      <FadeInWrapper direction="up" delay={0.5}>
        <Projects />
      </FadeInWrapper>

      <FadeInWrapper direction="up" delay={0.6}>
        <Contacts />
      </FadeInWrapper>

        <Footer />
    </div>
  );
};

export default HomePage;
