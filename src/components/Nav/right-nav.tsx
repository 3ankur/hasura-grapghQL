import React from 'react';
import { Link } from 'react-router-dom';
import styled, { StyledComponentBase } from 'styled-components';

const Ul  : StyledComponentBase<"ul", any, any, never>  = styled.ul<{open:boolean}>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;
interface RightNavProps{
    open:Boolean
}

const RightNav = ({open}: RightNavProps) => {
  return (
    <Ul open={open}>
      <li role="tab">  <Link to="/">Home</Link>  </li>
      <li role="tab"><Link to="/orders">MyOrder</Link>  </li>
      <li role="tab"> <Link to="/cart">Cart</Link></li>
    </Ul>
  )
}

export default RightNav;