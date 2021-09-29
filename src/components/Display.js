import styled from 'styled-components';

const Display = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: var(--bg-soft);
  box-shadow: inset 0 2px 20px -3px #00000030;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: var(--transition-slow);

  animation: fadeInUp 0.2s ease-in;
  animation-fill-mode: forwards;

  @media (max-width: 600px) {
    height: 50%;
  }
`

export default Display;