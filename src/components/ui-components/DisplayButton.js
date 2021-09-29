import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
outline: none;
border: none;
max-width: 100%;
max-height: 100%;
min-width: 11em;
width: max-content;
cursor: pointer;
user-select: none;

padding: var(--ui-padding);
border-radius: var(--ui-border-radius);
transition: var(--ui-transition);

background-color: ${props => props.optionState.toggleBackground ? 'var(--ui-bg-color);' : 'transparent;'}
${props => props.optionState.toggleFont && 'font-size: var(--ui-font-size);'}
${props => props.optionState.toggleFont && 'font-weight: var(--ui-font-weight);'}
color: ${props => props.optionState.toggleFont ? 'var(--ui-font-color);' : 'transparent;'}
${props => props.optionState.toggleBorder && 'border-style: var(--ui-border-style);'}
${props => props.optionState.toggleBorder && 'border-width: var(--ui-border-width);'}
${props => props.optionState.toggleBorder && 'border-color: var(--ui-border-color);'}
${props => props.optionState.toggleShadow && 'box-shadow: var(--ui-box-shadow);'}

&:hover {
  ${props => props.optionState.toggleBackgroundHover && 'background-color: var(--ui-bg-color-hover);'}
  ${props => props.optionState.toggleFontHover && 'font-size: var(--ui-font-size-hover);'}
  ${props => props.optionState.toggleFontHover && 'font-weight: var(--ui-font-weight-hover);'}
  ${props => props.optionState.toggleFontHover && 'color: var(--ui-font-color-hover);'}
  ${props => props.optionState.toggleBorderHover && 'border-style: var(--ui-border-style-hover);'}
  ${props => props.optionState.toggleBorderHover && 'border-width: var(--ui-border-width-hover);'}
  ${props => props.optionState.toggleBorderHover && 'border-color: var(--ui-border-color-hover);'}
  ${props => props.optionState.toggleShadowHover && 'box-shadow: var(--ui-box-shadow-hover);'}
  transition: var(--ui-transition);
}

&:focus {
  ${props => props.optionState.toggleBackgroundFocus && 'background-color: var(--ui-bg-color-focus);'}
  ${props => props.optionState.toggleFontFocus && 'font-size: var(--ui-font-size-focus);'}
  ${props => props.optionState.toggleFontFocus && 'font-weight: var(--ui-font-weight-focus);'}
  ${props => props.optionState.toggleFontFocus && 'color: var(--ui-font-color-focus);'}
  ${props => props.optionState.toggleBorderFocus && 'border-style: var(--ui-border-style-focus);'}
  ${props => props.optionState.toggleBorderFocus && 'border-width: var(--ui-border-width-focus);'}
  ${props => props.optionState.toggleBorderFocus && 'border-color: var(--ui-border-color-focus);'}
  ${props => props.optionState.toggleShadowFocus && 'box-shadow: var(--ui-box-shadow-focus);'}
  transition: var(--ui-transition);
}

& + button {
  margin-top: 2em;
}

&.loading {
  opacity: 0.6;
  pointer-events: none;
}

@media (max-width: 768px) {
  transform: scale(0.8);
}

@media (max-width: 600px) {
  & + button {
    margin-top: 1em;
  }
  margin-top: 1em;
  transform: scale(0.7);
}
`

const Loader = styled.div`
  margin: 0 auto;
  width: 1.5em;
  height: 1.5em;
  border: 1.5px solid transparent;
  border-color: transparent var(--ui-font-color) var(--ui-font-color) var(--ui-font-color);
  border-radius: 50%;
  animation: loading 0.8s linear infinite;

  @keyframes loading {
    100% {
        transform: rotate(360deg)
    }
  }
`

function DisplayButton(props) {

  return (
    <Button optionState={props.optionState} className={props.loading && "loading"}>{props.loading ? <Loader /> : "I'm a button!"}</Button>
  );
}

export default DisplayButton;