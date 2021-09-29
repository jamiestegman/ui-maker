import {useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  outline: none;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 10em;
  min-height: 3.3em;
  width: max-content;
  padding: 1em 1em;
  background-image: none;
  color: var(--text-h);
  font-size: 1em;
  font-weight: 500;
  transition: var(--transition-slow);
  border-radius: var(--radius-m);
  cursor: pointer;
  user-select: none;

  &.primary {
    background-image: var(--gradient-primary);
    color: white;
  }

  &.primary > * {
    border-color: transparent #fff #fff #fff;
  }

  &:hover {
    filter: brightness(95%);
    transition: var(--transition-med);
  }

  &:focus {
    box-shadow: var(--focus);
    transition: var(--transition-slow);
  }

  &.loading {
    opacity: 0.6;
    pointer-events: none;
  }

  & > svg {
    margin-left: 0.6em;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 1.2em 1em;
  }
`

const Loader = styled.div`
  margin: 0 auto;
  width: 1.3em;
  height: 1.3em;
  border: 1.5px solid transparent;
  border-color: transparent var(--text-p) var(--text-p) var(--text-p);
  border-radius: 50%;
  animation: loading 0.8s linear infinite;

  @keyframes loading {
    100% {
        transform: rotate(360deg);
    }
  }
`

function Button(props) {

  const [loading, setLoading] = useState(props.loading);

  const handleClick = () => {
    setLoading(true);
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <Wrapper className={`${props.primary && "primary"} ${loading && "loading"}`} onClick={handleClick}>
      {loading ? <Loader /> : props.children}
      </Wrapper>
  );
}

export default Button;