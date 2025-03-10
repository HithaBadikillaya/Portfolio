import styled from 'styled-components';

const Overview = () => {
  return (
    <OverviewSection id="overview">
      <Container>
        <NameBox>
          <div className="card-body">
            <NameTitle>Hey there! I am Hitha</NameTitle>
          </div>
        </NameBox>
        <OverviewContent>
          <OverviewHeading>Overview</OverviewHeading>
          <Divider />
          <OverviewParagraph>
            Hello! I’m a passionate software developer with a knack for building scalable and
            user-friendly solutions. I enjoy collaborating on innovative projects, constantly
            exploring new technologies, and sharing knowledge with fellow developers. My goal is
            to create digital experiences that make people’s lives easier and more enjoyable,
            all while continuously refining my skills in modern web development.
          </OverviewParagraph>
        </OverviewContent>
      </Container>

      {/* Decorative Wave Divider */}
      <WaveDivider>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#fff" />
        </svg>
      </WaveDivider>
    </OverviewSection>
  );
};

export default Overview;


const OverviewSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a); /* Darker gradient background */
  padding: 80px 0 120px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
`;

const NameBox = styled.div`
  background: linear-gradient(135deg, #2daa9e, #66d2ce);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  margin-bottom: 40px;
`;

const NameTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: #fff;
  font-weight: 700;
`;

const OverviewContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const OverviewHeading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
`;

const Divider = styled.div`
  width: 80px;
  height: 4px;
  background-color: #2daa9e;
  margin: 0 auto 20px auto;
`;

const OverviewParagraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #ccc; 
`;

const WaveDivider = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    display: block;
    width: calc(100% + 1.3px);
    height: 100px;
  }
`;
