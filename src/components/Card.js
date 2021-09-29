import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--bg-primary);
  border-radius: 30px;
  height: 100%;
  width: 100%;
  padding: 40px;
  box-shadow: 0 7px 35px -8px #00000020;
  transition: var(--transition-slow);

  &.fade-out > * {
    animation: fadeOut 0.4s ease;
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`

export default Card;