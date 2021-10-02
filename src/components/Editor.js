import React, { useState, useRef, useReducer } from 'react';

import styled from 'styled-components';
import Display from './Display';
import Logo from './Logo';
import EditableContent from './EditableContent';
import DisplayButton from './ui-components/DisplayButton';
import Snackbar from './Snackbar';

import FadeIn from './utility/FadeIn';

import { IconContext } from 'react-icons';
import { HiClipboard } from 'react-icons/hi';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const Controls = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 3vw;

  @media (max-width: 1024px) {
    margin-right: 0;
    margin-bottom: 2em;
  }
`

const CodePanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 2;

  > pre {
    padding: 2% 4%;
    margin-top: 3em;
    padding-bottom: 4em;
    font-size: 0.8em;
    line-height: 1.5;
    font-family: 'Roboto Mono', 'Consolas', monospace;
    color: var(--text-console);
    font-weight: 400;
    overflow: scroll;
    width: 100%;
    height: 100%;
  }
`

const ConsoleBackground = styled.div`
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: #242526;
  box-shadow: inset 0 1px 20px -3px #00000050;
`

const DisplayControls = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  user-select: none;
  width: 100%;
  padding: 0.6em 1em;
  font-size: 0.8em;
  background-color: #00000010;
  color: var(--text-p);
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    cursor: pointer;
    text-decoration: underline;
  }

  &.light {
    color: #e4e5e7dd;
  }
`

const EditorTitle = styled.h2`
  font-size: 1.9em;
  font-weight: 300;
  max-width: 13em;
  margin-top: 0.75em;
  margin-bottom: 1.25em;

  @media (max-width: 600px) {
    font-size: 1.5em;
  }
`

const EditorTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
  position: relative;
`

const Slider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  transform-origin: 0 0;
  transition: var(--transition-slow);
`

const Tab = styled.h3`
  font-size: 1em;
  font-weight: 400;
  cursor: pointer;
  color: var(--text-p);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  padding: 0.5em;
  width: 100%;

  & svg {
    width: 1em;
    margin-left: 0.2em;
  }

  &.active {
    color: var(--color-primary);
    opacity: 1;
  }

  &:first-of-type.active ~ .slider {
    transform: translateX(0) scaleX(0.333);
  }
  &:nth-of-type(2).active ~ .slider {
    transform: translateX(33.333%) scaleX(0.333);
  }
  &:nth-of-type(3).active ~ .slider {
    transform: translateX(calc(33.333% * 2)) scaleX(0.333);
  }
`

export const ACTIONS = {

  TOGGLE_BACKGROUND: 'toggle-background',
  TOGGLE_FONT: 'toggle-font',
  TOGGLE_BORDER: 'toggle-border',
  TOGGLE_SHADOW: 'toggle-shadow',

  EDIT_SIZE: 'padding',
  EDIT_SHAPE: 'border-radius',
  EDIT_BACKGROUND_COLOR: 'background',
  EDIT_FONT_SIZE: 'font',
  EDIT_FONT_WEIGHT: 'font-size',
  EDIT_FONT_COLOR: 'color',
  EDIT_BORDER_STYLE: 'border-style',
  EDIT_BORDER_WIDTH: 'border-width',
  EDIT_BORDER_COLOR: 'border-color',
  EDIT_SHADOW_DISTANCE: 'box-shadow-distance',
  EDIT_SHADOW_BLUR: 'box-shadow-blur',
  EDIT_SHADOW_SPREAD: 'box-shadow-spread',
  EDIT_SHADOW_COLOR: 'box-shadow-color'
}

export let optionStates = {
  toggleBackground: true,
  toggleFont: true,
  toggleBorder: false,
  toggleShadow: false,

  toggleBackgroundHover: true,
  toggleFontHover: false,
  toggleBorderHover: false,
  toggleShadowHover: false,

  toggleBackgroundFocus: false,
  toggleFontFocus: false,
  toggleBorderFocus: false,
  toggleShadowFocus: true,

  size: 'Medium',
  shape: 'Smooth',

  backgroundColor: '#2b64ff',
  backgroundColorHover: '#2659e7',
  backgroundColorFocus: '#2659e7',

  fontSize: '16px',
  fontSizeHover: '16px',
  fontSizeFocus: '16px',

  fontWeight: '500',
  fontWeightHover: '500',
  fontWeightFocus: '500',

  fontColor: '#ffffff',
  fontColorHover: '#ffffff',
  fontColorFocus: '#ffffff',

  borderStyle: 'None',
  borderStyleHover: 'None',
  borderStyleFocus: 'None',

  borderWidth: '1px',
  borderWidthHover: '1px',
  borderWidthFocus: '1px',

  borderColor: '#ffffff',
  borderColorHover: '#ffffff',
  borderColorFocus: '#ffffff',

  boxShadowDistance: 'Medium',
  boxShadowDistanceHover: 'Medium',
  boxShadowDistanceFocus: 'None',

  boxShadowBlur: 'Medium',
  boxShadowBlurHover: 'Medium',
  boxShadowBlurFocus: 'None',

  boxShadowSpread: 'None',
  boxShadowSpreadHover: 'None',
  boxShadowSpreadFocus: 'Small',

  boxShadowColor: '#34353640',
  boxShadowColorHover: '#34353640',
  boxShadowColorFocus: '#57ddff81',
}

function Editor(props) {

  const [tabState, setTabState] = useState(0);
  function tabStateHandler(state) {
    setTabState(state);
  }

  function computeBoxShadow(type, value) {
    switch (type) {

      case 'distance':
        if (value === 'Close') return '0 0.25em'
        else if (value === 'Medium') return '0 0.5em'
        else if (value === 'Far') return '0 1em'
        else return '0'

      case 'blur':
        if (value === 'Small') return '0.5em'
        else if (value === 'Medium') return '1em'
        else if (value === 'Large') return '1.75em'
        else return '0'

      case 'spread':
        if (value === 'Small') return '3px'
        else if (value === 'Medium') return '0.5em'
        else if (value === 'Large') return '1em'
        else return '0'

      default:
        return null
    }
  }

  function combineBoxShadow(distance, blur, spread, color) {
    return computeBoxShadow('distance', distance) + " " + computeBoxShadow('blur', blur) + " " + computeBoxShadow('spread', spread) + " " + color
  }

  // Set initial active states for options.
  const [optionState, dispatch] = useReducer(reducer, optionStates);

  // Reducer function to handle state changes to options.
  function reducer (optionState, action) {

    switch (action.type) {

      // Toggle the Background switch
      case ACTIONS.TOGGLE_BACKGROUND:
        // If the 'default' tab panel is open...
        if (tabState === 0) {
          // If the background switch is currently set to 'off'...
          if (optionState.toggleBackground === false) {
            return {...optionState, toggleBackground: true}
          } else {
            return {...optionState, toggleBackground: false}
          }
        } else if (tabState === 1) {
          if (optionState.toggleBackgroundHover === false) {
            return {...optionState, toggleBackgroundHover: true}
          } else {
            return {...optionState, toggleBackgroundHover: false}
          }
        } else {
          if (optionState.toggleBackgroundFocus === false) {
            return {...optionState, toggleBackgroundFocus: true}
          } else {
            return {...optionState, toggleBackgroundFocus: false}
          }
        }

      // Toggle the Font Switch
      case ACTIONS.TOGGLE_FONT:
        if (tabState === 0) {
          if (optionState.toggleFont === false) {
            return {...optionState, toggleFont: true}
          } else {
            return {...optionState, toggleFont: false}
          }
        } else if (tabState === 1) {
          if (optionState.toggleFontHover === false) {
            return {...optionState, toggleFontHover: true}
          } else {
            return {...optionState, toggleFontHover: false}
          }
        } else {
          if (optionState.toggleFontFocus === false) {
            return {...optionState, toggleFontFocus: true}
          } else {
            return {...optionState, toggleFontFocus: false}
          }
        }

      // Toggle the Border switch
      case ACTIONS.TOGGLE_BORDER:
        if (tabState === 0) {
          if (optionState.toggleBorder === false) {
            return {...optionState, toggleBorder: true}
          } else {
            return {...optionState, toggleBorder: false}
          }
        } else if (tabState === 1) {
          if (optionState.toggleBorderHover === false) {
            return {...optionState, toggleBorderHover: true}
          } else {
            return {...optionState, toggleBorderHover: false}
          }
        } else {
          if (optionState.toggleBorderFocus === false) {
            return {...optionState, toggleBorderFocus: true}
          } else {
            return {...optionState, toggleBorderFocus: false}
          }
        }

      // Toggle the Shadow switch
      case ACTIONS.TOGGLE_SHADOW:
        if (tabState === 0) {
          if (optionState.toggleShadow === false) {
            return {...optionState, toggleShadow: true}
          } else {
            return {...optionState, toggleShadow: false}
          }
        } else if (tabState === 1) {
          if (optionState.toggleShadowHover === false) {
            return {...optionState, toggleShadowHover: true}
          } else {
            return {...optionState, toggleShadowHover: false}
          }
        } else {
          if (optionState.toggleShadowFocus === false) {
            return {...optionState, toggleShadowFocus: true}
          } else {
            return {...optionState, toggleShadowFocus: false}
          }
        }

      case ACTIONS.EDIT_SIZE:
        let size = (action.payload === 'Small' ? '0.75em 1.4em' : action.payload === 'Medium' ? '1.1em 2.2em' : '1.5em 2.9em');
        document.querySelector(':root').style.setProperty('--ui-padding', size);
        return {...optionState, size: action.payload}

      case ACTIONS.EDIT_SHAPE:
        let radius = (action.payload === 'Smooth' ? '6px' : action.payload === 'Circular' ? '999px' : '0px');
        document.querySelector(':root').style.setProperty('--ui-border-radius', radius);
        return {...optionState, shape: action.payload}

      case ACTIONS.EDIT_BACKGROUND_COLOR:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-bg-color', action.payload);
          return {...optionState, backgroundColor: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-bg-color-hover', action.payload);
          return {...optionState, backgroundColorHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-bg-color-focus', action.payload);
          return {...optionState, backgroundColorFocus: action.payload}
        }

      case ACTIONS.EDIT_FONT_SIZE:
        if (tabState === 0) {
          console.log(action.payload)
          document.querySelector(':root').style.setProperty('--ui-font-size', action.payload);
          return {...optionState, fontSize: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-font-size-hover', action.payload);
          return {...optionState, fontSizeHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-font-size-focus', action.payload);
          return {...optionState, fontSizeFocus: action.payload}
        }

      case ACTIONS.EDIT_FONT_WEIGHT:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-font-weight', action.payload);
          return {...optionState, fontWeight: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-font-weight-hover', action.payload);
          return {...optionState, fontWeightHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-font-weight-focus', action.payload);
          return {...optionState, fontWeightFocus: action.payload}
        }

      case ACTIONS.EDIT_FONT_COLOR:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-font-color', action.payload);
          return {...optionState, fontColor: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-font-color-hover', action.payload);
          return {...optionState, fontColorHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-font-color-focus', action.payload);
          return {...optionState, fontColorFocus: action.payload}
        }

      case ACTIONS.EDIT_BORDER_STYLE:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-border-style', action.payload);
          return {...optionState, borderStyle: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-border-style-hover', action.payload);
          return {...optionState, borderStyleHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-border-style-focus', action.payload);
          return {...optionState, borderStyleFocus: action.payload}
        }
      case ACTIONS.EDIT_BORDER_WIDTH:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-border-width', action.payload);
          return {...optionState, borderWidth: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-border-width-hover', action.payload);
          return {...optionState, borderWidthHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-border-width-focus', action.payload);
          return {...optionState, borderWidthFocus: action.payload}
        }
      case ACTIONS.EDIT_BORDER_COLOR:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-border-color', action.payload);
          return {...optionState, borderColor: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-border-color-hover', action.payload);
          return {...optionState, borderColorHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-border-color-focus', action.payload);
          return {...optionState, borderColorFocus: action.payload}
        }

      case ACTIONS.EDIT_SHADOW_DISTANCE:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow', combineBoxShadow(action.payload, optionState.boxShadowBlur, optionState.boxShadowSpread, optionState.boxShadowColor));
          return {...optionState, boxShadowDistance: action.payload}

        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-hover', combineBoxShadow(action.payload, optionState.boxShadowBlurHover, optionState.boxShadowSpreadHover, optionState.boxShadowColorHover));
          return {...optionState, boxShadowDistanceHover: action.payload}

        } else {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-focus', combineBoxShadow(action.payload, optionState.boxShadowBlurFocus, optionState.boxShadowSpreadFocus, optionState.boxShadowColorFocus));
          return {...optionState, boxShadowDistanceFocus: action.payload}
        }

      case ACTIONS.EDIT_SHADOW_BLUR:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow', combineBoxShadow(optionState.boxShadowDistance, action.payload, optionState.boxShadowSpread, optionState.boxShadowColor));
          return {...optionState, boxShadowBlur: action.payload}

        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-hover', combineBoxShadow(optionState.boxShadowDistanceHover, action.payload, optionState.boxShadowSpreadHover, optionState.boxShadowColorHover));
          return {...optionState, boxShadowBlurHover: action.payload}

        } else {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-focus', combineBoxShadow(optionState.boxShadowDistanceFocus, action.payload, optionState.boxShadowSpreadFocus, optionState.boxShadowColorFocus));
          return {...optionState, boxShadowBlurFocus: action.payload}
        }

      case ACTIONS.EDIT_SHADOW_SPREAD:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow', combineBoxShadow(optionState.boxShadowDistance, optionState.boxShadowBlur, action.payload, optionState.boxShadowColor));
          return {...optionState, boxShadowSpread: action.payload}
        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-hover', combineBoxShadow(optionState.boxShadowDistanceHover, optionState.boxShadowBlurHover, action.payload, optionState.boxShadowColorHover));
          return {...optionState, boxShadowSpreadHover: action.payload}
        } else {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-focus', combineBoxShadow(optionState.boxShadowDistanceFocus, optionState.boxShadowBlurFocus, action.payload, optionState.boxShadowColorFocus));
          return {...optionState, boxShadowSpreadFocus: action.payload}
        }


      case ACTIONS.EDIT_SHADOW_COLOR:
        if (tabState === 0) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow', combineBoxShadow(optionState.boxShadowDistance, optionState.boxShadowBlur, optionState.boxShadowSpread, action.payload));
          return {...optionState, boxShadowColor: action.payload}

        } else if (tabState === 1) {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-hover', combineBoxShadow(optionState.boxShadowDistanceHover, optionState.boxShadowBlurHover, optionState.boxShadowSpreadHover, action.payload));
          return {...optionState, boxShadowColorHover: action.payload}

        } else {
          document.querySelector(':root').style.setProperty('--ui-box-shadow-focus', combineBoxShadow(optionState.boxShadowDistanceFocus, optionState.boxShadowBlurFocus, optionState.boxShadowSpreadFocus, action.payload));
          return {...optionState, boxShadowColorFocus: action.payload}
        }

      default:
        return optionState
    }
  }

  // Handles whether to show the 'code console' via state toggle.
  const currentCodeRef = useRef();
  const [codeVisible, setCodeVisible] = useState(false);
  const codeVisibilityHandler = () => {
    setCodeVisible(prevCheck => !prevCheck);
  }

  // Handles whether to show the snackbar when the code text is copied to clipboard.
  const [showSnackbar, setShowSnackbar] = useState(false);
  const snackbarHandler = () => {
    setShowSnackbar(false);
    setTimeout(() => {
      setShowSnackbar(true);
    }, 1);

  }

  // Handles copying the text to clipboard when the clipboard icon is clicked.
  const copyToClipboard = () => {
    snackbarHandler();
    navigator.clipboard.writeText(currentCodeRef.current.innerText);
  }

  return (
    <Wrapper>
      <Controls>
        <FadeIn delay={100}><Logo small /></FadeIn>
        <FadeIn delay={300}><EditorTitle>Create the perfect { props.type } <br/> for your React project</EditorTitle></FadeIn>

        <FadeIn delay={400}><EditorTabs>
          <Tab className={tabState === 0 && 'active'} state="default" onClick={() => tabStateHandler(0)}>Default</Tab>
          <Tab className={tabState === 1 && 'active'} state="hover" onClick={() => tabStateHandler(1)}>Hover</Tab>
          <Tab className={tabState === 2 && 'active'} state="focus" onClick={() => tabStateHandler(2)}>Focus</Tab>
          <Slider className="slider" />
        </EditorTabs>
        </FadeIn>

        { tabState === 0 && <EditableContent type="default" {...{optionState, dispatch}} /> }

        { tabState === 1 && <EditableContent type="hover" {...{optionState, dispatch}} /> }

        { tabState === 2 && <EditableContent type="focus" {...{optionState, dispatch}} /> }

      </Controls>

        <Display>

        { codeVisible &&
        <CodePanel ref={currentCodeRef}>
          <pre>

{`import styled from 'styled-components';

const Element = styled.button\`
  min-width: 11em;
  width: max-content;
  padding: 1.1em 2.2em;
  background-color: ${optionState.backgroundColor};
  color: ${optionState.fontColor};
  font-size: ${optionState.fontSize};
  font-weight: ${optionState.fontWeight};
  border: ${optionState.borderStyle !== 'None' && optionState.toggleBorder ? optionState.borderStyle.toLowerCase() + " " + optionState.borderWidth + " " + optionState.borderColor + ";" : 'none;'}
  border-radius: ${optionState.shape === 'Smooth' ? '5px' : optionState.shape === 'Circular' ? '999px' : '0px'};`}
  {optionState.toggleShadow && combineBoxShadow(optionState.boxShadowDistance, optionState.boxShadowBlur, optionState.boxShadowSpread, optionState.boxShadowColor)}{`
  transition: 0.2s ease;
  cursor: pointer;
  user-select: none;

  &:hover {`}
    {optionState.toggleBackgroundHover && '\n    background-color: ' + optionState.backgroundColorHover + ";"}
    {optionState.toggleFontHover && '\n   color:' + optionState.fontColorHover + ";"}
    {optionState.toggleFontHover && '\n    font-size: ' + optionState.fontSizeHover + ";"}
    {optionState.toggleFontHover && '\n    font-weight: ' + optionState.fontWeightHover + ";"}
    {optionState.borderStyleHover !== 'None' && optionState.toggleBorderHover ? '\n    border: ' + optionState.borderStyleHover.toLowerCase() + " " + optionState.borderWidthHover + " " + optionState.borderColorHover + ';' : null}
    {optionState.toggleShadowHover && combineBoxShadow(optionState.boxShadowDistanceHover, optionState.boxShadowBlurHover, optionState.boxShadowSpreadHover, optionState.boxShadowColorHover)}{`
    transition: 0.2s ease;
  }

  &:focus {`}
    {optionState.toggleBackgroundFocus && '\n   background-color: ' + optionState.backgroundColorFocus + ";"}
    {optionState.toggleFontFocus && '\n   color:' + optionState.fontColorFocus + ";"}
    {optionState.toggleFontFocus && '\n    font-size: ' + optionState.fontSizeFocus + ";"}
    {optionState.toggleFontFocus && '\n    font-weight: ' + optionState.fontWeightFocus + ";"}
    {optionState.borderStyleFocus !== 'None' && optionState.toggleBorderFocus ? '\n    border: ' + optionState.borderStyleFocus.toLowerCase() + " " + optionState.borderWidthFocus + " " + optionState.borderColorFocus + ";" : null}
    {optionState.toggleShadowFocus && '\n    box-shadow: ' + combineBoxShadow(optionState.boxShadowDistanceFocus, optionState.boxShadowBlurFocus, optionState.boxShadowSpreadFocus, optionState.boxShadowColorFocus) + ";"}{`
    transition: 0.2s ease;
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
\`

const Loader = styled.div\`
  margin: 0 auto;
  width: 1.5em;
  height: 1.5em;
  border: 1.5px solid transparent;
  border-color: transparent ${optionState.fontColor + " " + optionState.fontColor + " " + optionState.fontColor};
  border-radius: 50%;
  animation: loading 0.8s linear infinite;

  @keyframes loading {
    100% {
        transform: rotate(360deg)
    }
  }
\`

function Button(props) {
  const [loading, setLoading] = useState(props.loading);

  const handleClick = () => {
    setLoading(true);
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <Wrapper className={\`\${props.primary && "primary"} \${loading && "loading"}\`} onClick={handleClick}>
      {loading ? <Loader /> : props.children}
    </Wrapper>
  );
}

export default Button;`}</pre>
          <ConsoleBackground />
        </CodePanel>
        }

        <DisplayControls className={codeVisible && 'light'}>
          {codeVisible &&<div style={{visibility:'hidden', width:'16px'}}></div>}
          <div style={{margin:'auto'}} onClick={codeVisibilityHandler}>{!codeVisible ? "View Code" : "View Element"}</div>
          {codeVisible && (
          <IconContext.Provider value={{ size: "16px"}}>
            <HiClipboard style={{cursor:'pointer'}} onClick={copyToClipboard} />
          </IconContext.Provider>
          )}
        </DisplayControls>


        <DisplayButton {...{optionState, dispatch}} />
        <DisplayButton {...{optionState, dispatch}} loading />
      </Display>

      {showSnackbar && <Snackbar text="Copied to clipboard." /> }
    </Wrapper>
  );
}

export default Editor;