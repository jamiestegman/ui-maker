import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: var(--text-p);
  color: var(--bg-primary);
  font-size: 0.9em;
  padding: 1em;
  border-radius: var(--radius-m);
  position: fixed;
  bottom: 1.5vw;
  right: 1.5vw;
  animation: snackbar-fade 3s ease;
  animation-fill-mode: forwards;
`

function Snackbar(props) {

  return (
    <Wrapper>
      <div>{props.text}</div>
    </Wrapper>
  );
}

export default Snackbar;