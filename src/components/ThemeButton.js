import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import {HiSun, HiMoon} from 'react-icons/hi';

const Button = styled.div`
  padding: 0.6em;
  position: absolute;
  top: 1.5%;
  right: 1%;
  background-color: var(--bg-primary);
  border-radius: 50%;
  box-shadow: 0 2px 5px -1px rgba(33, 35, 39, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    width: 0.9em;
    color: var(--text-h);
  }

  @media (max-width: 600px) {
    padding: 0.7em;
    box-shadow: 0 2px 7px -1px rgba(33, 35, 39, 0.4);
  }
`

const ThemeButton= () => {

  const [mode, toggleMode] = useState(localStorage.getItem('dark-mode') === 'true');

  useEffect(() => {
    localStorage.setItem('dark-mode', mode);

    if (!mode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  }, [mode]);

  return (
    <Button onClick={() => toggleMode(!mode)}>{ mode ? <HiSun /> : <HiMoon /> }</Button>
  );
};

export default ThemeButton;