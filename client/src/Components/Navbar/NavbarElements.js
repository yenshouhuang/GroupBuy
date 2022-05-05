import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #0F294A;
height: 50px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen';
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
`;

export const NavLink = styled(Link)`
color: #F05636;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100;
cursor: pointer;
border-radius: 13px;
border: 2px solid #F05636;
margin: 0.5em 1em;
&.active {
 color: #F05636;
}
&:hover {
    color: white; // <Thing> when hovered
  }
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
 display: none;
}
`;
