import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import useClickOutside from '../useClickOutside';

const Wrapper = styled.div`
  position:relative;
  display: inline-block;
`

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  &.drop-up {
    flex-direction: column-reverse;
    bottom: 100%;
  }

  &.drop-up .arrow {
    transform: rotate(180deg);
  }
`

const Menu = styled.div`
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-dropdown);
  transition: var(--ui-transition);
  border-radius: var(--radius-m);
  cursor: pointer;
  user-select: none;
  min-height: max-content;
  max-height: 15em;
  min-width: 5.5em;
  padding: 4px 0;
  flex-shrink: 0;

  overflow-y: scroll;

  opacity: 0;
  transform: scale(0.85);
  transform-origin: center center;
  animation: dropdown-fadein 0.25s cubic-bezier(.18,1.25,.4,1);
  animation-fill-mode: forwards;

  & ul {
    list-style: none;
  }
`

const PopoverArrow = styled.div`
  width: 21px;
  height: 21px;
  margin: -6.5px;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSI5Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM4ODk4QUEiIGZpbGwtb3BhY2l0eT0iLjEiIGQ9Ik0xIDkuMDkyaDE5bC02LjQwMi02Ljc0Yy0xLjcxNy0xLjgwNi00LjQ4NS0xLjgtNi4xOTYgMEwxIDkuMDkzek0yMC4zNDIgOGwtNi4wMi02LjMzNmMtMi4xMDgtMi4yMi01LjUzOC0yLjIxOC03LjY0NSAwTC42NTggOGgxOS42ODR6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTcuNDAyIDIuMzUzYzEuNzExLTEuODAxIDQuNDgtMS44MDcgNi4xOTYgMEwyMCA5LjA5M0gxbDYuNDAyLTYuNzR6Ii8+PC9nPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-position: 50%;
  z-index: 1000;
  flex-shrink: 0;
`

const Button = styled.div`
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-primary);
  outline: none;
  border-radius: var(--radius-m);
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: 0.7em;
  }

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`

const Item = styled.li`
  display: flex;
  justify-content: center;
  padding: 0.75em;
  color: var(--text-p);
  font-size: 16px;
  font-weight: 500;
  transition: var(--transition-fast);
  text-transform: capitalize;

  &:hover {
    background-color: var(--color-ultrasoft);
    transition: var(--transition-fast);
  }

  &.active {
    color: var(--color-primary);
    background-color: var(--color-primary-light);
  }
`

function DropdownButton(props) {

  const dropdown = useRef(null);
  const wrapper = useRef(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(dropdown, close);

  // Loop through the list items that are passed in as a array through props.listItems and conver them to components.
  let items = [];
  for (var i = 0; i < props.listItems.length; i++) {
    items.push(<Item
      key={i}
      onClick={props.handler}
      className={props.value === props.listItems[i] && 'active'}
      >{props.listItems[i]}</Item>);
  }

  // Checks for state changes to 'isOpen' and executes heightHandler as a callback function.
  // This is done to prevent errors, otherwise the browser will sometimes try to manipulate the ref before it is rendered.
  useEffect(() => {
    if(isOpen === true) {
      heightHandler();
    }
  }, [isOpen]);

  const heightHandler = () => {

    // Gets distance from bottom of dropdown menu to the bottom of the browser window.
    let distance = window.innerHeight - dropdown.current.getBoundingClientRect().bottom;
    // if the distance is less than 10 pixels, cause the menu to drop upwards instead. 
    if (distance < 10) {
      wrapper.current.classList.add('drop-up');
      wrapper.current.style.top = '-' + (dropdown.current.clientHeight+5) + 'px';
    }
  }

  return (
    <Wrapper>
      <Button onClick={() => toggle(true)}>{props.value}</Button>

      { isOpen && (
        <DropdownWrapper ref={wrapper}>
          <PopoverArrow className="arrow" />
          <Menu key={props.value} ref={dropdown} onClick={close}>
            <ul>
              {items}
            </ul>
          </Menu>
        </DropdownWrapper>
      )}

    </Wrapper>
  );
}

export default DropdownButton;