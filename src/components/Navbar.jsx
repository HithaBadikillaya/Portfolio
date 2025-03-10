import { Link } from "react-scroll";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Nav>
      <NavMenu>
        <NavItem>
          <StyledLink
            activeClass="active"
            to="overview"
            spy={true}
            smooth={true}
            duration={300}
            offset={-60}
          >
            Overview
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            activeClass="active"
            to="skills"
            spy={true}
            smooth={true}
            duration={300}
            offset={-60}
          >
            Skills
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            activeClass="active"
            to="work"
            spy={true}
            smooth={true}
            duration={300}
            offset={-60}
          >
            Work Experience
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            activeClass="active"
            to="projects"
            spy={true}
            smooth={true}
            duration={300}
            offset={-60}
          >
            Projects
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            activeClass="active"
            to="contacts"
            spy={true}
            smooth={true}
            duration={300}
            offset={-60}
          >
            Contact
          </StyledLink>
        </NavItem>
        <NavTagline>
          <em>Crafting Code, Creating Experiences</em>
        </NavTagline>
      </NavMenu>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0 20px;
`;

const NavItem = styled.li`
  margin: 0 20px;
  position: relative;
  font-size: 1.1rem;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  position: relative;
  transition: color 0.3s;
  
  &:hover {
    color: #2daa9e;
  }
  
  &.active {
    color: #2daa9e;
  }
  
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0%;
    height: 3px;
    background: #2daa9e;
    border-radius: 2px;
    transition: width 0.3s;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NavTagline = styled.li`
  margin-left: auto;
  font-size: 1rem;
  color: #666;
  font-style: italic;
`;
