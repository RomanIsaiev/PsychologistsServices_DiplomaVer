import { Nav, NavList, StyledNavLink } from './Navigation.styled';

export const Navigation = ({ currentUser }) => {
  return (
    <Nav>
      <NavList>
        <li>
          <StyledNavLink to="/" activeclassname="active">
            Головна
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/psychologists" activeclassname="active">
            Психологи
          </StyledNavLink>
        </li>
        {currentUser && (
          <li>
            <StyledNavLink to="/favorites" activeclassname="active">
              Обране
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </Nav>
  );
};
