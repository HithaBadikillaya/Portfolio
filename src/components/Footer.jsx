import Tooltip from './Tooltip';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <Tooltip />
        <FooterText>
          Connect and Reach out for collaborations!
        </FooterText>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  background: linear-gradient(135deg,rgb(124, 151, 136),rgb(136, 151, 116));
  padding: 2rem 0;
  text-align: center;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterText = styled.p`
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 1.125rem;
  color: #fff;
  font-weight: 500;
`;
