import React, { useCallback, useRef, useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "../useClickOutside";
import styled from 'styled-components';

const Picker = styled.div`
  position: relative;

  & input {
    background-color: #ffffff;
    border: 0;
    border-radius: var(--radius-m);
    padding: 0.5em;
    opacity: 1;
    width: 100%;
    text-align: center;
    margin-top: 0.5em;
  }

  & input:focus {
    outline: none;
    box-shadow: 0 0 1px 2px #0044ff20;
    transition: var(--transition-med);
  }
`

const Swatch = styled.div`
  width: 2.2em;
  height: 2.2em;
  border-radius: 8px;
  border: 3px solid var(--bg-primary);
  box-shadow: 0 0 0 1px var(--swatch-border), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: var(--transition-med);
`

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  right: -1px;
  border-radius: 9px;
  z-index: 1000;

  opacity: 0;
  transform: scale(0.85);
  transform-origin: center;
  animation: dropdown-fadein 0.25s cubic-bezier(.18,1.25,.4,1);
  animation-fill-mode: forwards;

  & > * {
    box-shadow: 0 7px 25px -8px rgba(0, 0, 0, 0.3);
  }

  &.drop-up {
    top: -250px;
    bottom: calc(100% + 3px);
  }
`

export const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  // Checks for state changes to 'isOpen' and executes heightHandler as a callback function.
  // This is done to prevent errors, otherwise the browser will sometimes try to manipulate the ref before it is rendered.
  useEffect(() => {
    if(isOpen === true) {
      heightHandler();
    }
  }, [isOpen]);

  const heightHandler = () => {
    // Gets distance from bottom of dropdown menu to the bottom of the browser window.
    let distance = window.innerHeight - popover.current.getBoundingClientRect().bottom;
    // if the distance is less than 10 pixels, cause the menu to drop upwards instead. 
    if (distance < 10) {
      popover.current.classList.add('drop-up');
    }
  }

  return (
    <Picker>
      <Swatch
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <Popover
        className="popover"
        ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
          <HexColorInput color={color} onChange={onChange} alpha prefixed />
        </Popover>
      )}
    </Picker>
  );
};