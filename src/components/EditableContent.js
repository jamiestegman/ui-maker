import React from 'react';

import styled from 'styled-components';
import { PopoverPicker } from './PopoverPicker';
import DropdownButton from './DropdownButton';

import { ACTIONS } from './Editor';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  opacity: 0;
  animation: fadeInUp 0.5s ease;
  animation-fill-mode: forwards;
`

const OptionSwitch = styled.input`
  height: 20px;
  width: 31px;
  min-width: 31px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  margin-right: 1em;
  background: var(--switch-bg);
  transition: var(--transition-med);
  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 2px 5px rgba(44,44,44,.3);
    transition: all .2s cubic-bezier(.2,.1,.75,1.35);
  }
  &:checked {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
    &:after {
      transform: translateX(11px);
    }
  }

  @media (max-width: 600px) {
    margin-right: 0.5em;
  }
`

const Option = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-bottom: solid 1px var(--color-border);
  transition: var(--transition-slow);

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`

const OptionTitle = styled.p`
  font-size: 0.9em;
  font-weight: 500;
  color: var(--text-p);
  text-transform: capitalize;

  @media(max-width: 768px) {
    font-size: 0.7em;
  }
`

const OptionSubtitle = styled.span`
  font-size: 0.6em;
  font-weight: 400;
  color: var(--text-soft);
  text-transform: uppercase;
  align-self: center;
`

const PropertyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div + div {
    margin-left: 3em;
  }

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 3em;
  }

  @media (max-width: 1024px) {

    & > div {
      min-width: 2em;
    }

    & > div + div {
      margin-left: 1em;
    }
  }

  @media (max-width: 600px) {

    & > div {
      min-width: 0;
    }

    & > div + div {
      margin-left: 0.7em;
    }
  }
`

function EditableContent(props) {

  return (
    <Wrapper type={props.type}>

        <Option type="appearance">
          <div>
          <OptionTitle>Appearance</OptionTitle>
          <PropertyWrapper>
              <div>
                <OptionSubtitle>Size</OptionSubtitle>
                <DropdownButton
                  listItems={['Small', 'Medium', 'Large']}
                  value={props.optionState.size }
                  handler={ (e) => props.dispatch({type: ACTIONS.EDIT_SIZE, payload: e.target.innerText}) }
                  />
              </div>
              <div>
                <OptionSubtitle>Shape</OptionSubtitle>
                <DropdownButton
                  listItems={['Sharp', 'Smooth', 'Circular']}
                  value={props.optionState.shape}
                  handler={ (e) => props.dispatch({type: ACTIONS.EDIT_SHAPE, payload: e.target.innerText}) }
                  />
              </div>
            </PropertyWrapper>
          </div>
        </Option>

        <Option type="background" style={{animationDelay: '0.05s'}}>

          {/* Compares the current active tab ('default', 'hover', 'focus') with the respective state for this option,
          e.g. If hover tab is true and toggleBackgroundHover is true, set the switch to checked. Otherwise, unchecked. */}
          <OptionSwitch type="checkbox" onChange={() => props.dispatch({type: ACTIONS.TOGGLE_BACKGROUND})}
            checked={props.type === 'default' && props.optionState.toggleBackground ? true :
            props.type === 'hover' && props.optionState.toggleBackgroundHover ? true :
            props.type === 'focus' && props.optionState.toggleBackgroundFocus ? true : false}   
          />

          {/* Same conditions as above, but for adding the 'disabled' class to the option. */}
          <div className={ props.type === 'default' && props.optionState.toggleBackground === false ? 'disabled' :
          props.type === 'hover' && props.optionState.toggleBackgroundHover === false ? 'disabled' :
          props.type === 'focus' && props.optionState.toggleBackgroundFocus === false ? 'disabled' : null }>
            <OptionTitle>Background</OptionTitle>
            <PropertyWrapper>
            <div>
            <PopoverPicker
            color={props.type === 'default' ? props.optionState.backgroundColor : props.type === 'hover' ? props.optionState.backgroundColorHover : props.type === 'focus' ? props.optionState.backgroundColorFocus : null }
            onChange={(color) => props.dispatch({type: ACTIONS.EDIT_BACKGROUND_COLOR, payload: color})} />
            </div>
            </PropertyWrapper>
          </div>
        </Option>

        <Option type="font" style={{animationDelay: '0.1s'}}>

        <OptionSwitch type="checkbox" onChange={() => props.dispatch({type: ACTIONS.TOGGLE_FONT})}
            checked={ props.type === 'default' && props.optionState.toggleFont ? true :
            props.type === 'hover' && props.optionState.toggleFontHover ? true :
            props.type === 'focus' && props.optionState.toggleFontFocus ? true : false }
          />

          <div className={ props.type === 'default' && props.optionState.toggleFont === false ? 'disabled' :
          props.type === 'hover' && props.optionState.toggleFontHover === false ? 'disabled' :
          props.type === 'focus' && props.optionState.toggleFontFocus === false ? 'disabled' : null }>
            <OptionTitle>Font</OptionTitle>
            <PropertyWrapper>
            <div>
              <OptionSubtitle>Size</OptionSubtitle>
                <DropdownButton
                  listItems={['8px', '10px', '11px', '12px', '13px', '14px', '16px', '18px', '20px', '24px', '30px', '36px']}
                  value={props.type === 'default' ? props.optionState.fontSize : props.type === 'hover' ? props.optionState.fontSizeHover : props.type === 'focus' ? props.optionState.fontSizeFocus : null }
                  handler={ (e) => props.dispatch({type: ACTIONS.EDIT_FONT_SIZE, payload: e.target.innerText}) }
                />
            </div>
            <div>
              <OptionSubtitle>Weight</OptionSubtitle>
              <DropdownButton
                listItems={['300', '400', '500', '600', '700']}
                value={props.type === 'default' ? props.optionState.fontWeight : props.type === 'hover' ? props.optionState.fontWeightHover : props.type === 'focus' ? props.optionState.fontWeightFocus : null }
                handler={ (e) => props.dispatch({type: ACTIONS.EDIT_FONT_WEIGHT, payload: e.target.innerText}) }
              />
            </div>
            <PopoverPicker
            color={props.type === 'default' ? props.optionState.fontColor : props.type === 'hover' ? props.optionState.fontColorHover : props.type === 'focus' ? props.optionState.fontColorFocus : null }
            onChange={(color) => props.dispatch({type: ACTIONS.EDIT_FONT_COLOR, payload: color})} />
          </PropertyWrapper>
          </div>
        </Option>

        <Option type="border" style={{animationDelay: '0.15s'}}>
        <OptionSwitch type="checkbox" onChange={() => props.dispatch({type: ACTIONS.TOGGLE_BORDER})}
            checked={props.type === 'default' && props.optionState.toggleBorder ? true :
            props.type === 'hover' && props.optionState.toggleBorderHover ? true :
            props.type === 'focus' && props.optionState.toggleBorderFocus ? true : false}
          />
          <div className={ props.type === 'default' && props.optionState.toggleBorder === false ? 'disabled' :
          props.type === 'hover' && props.optionState.toggleBorderHover === false ? 'disabled' :
          props.type === 'focus' && props.optionState.toggleBorderFocus === false ? 'disabled' : null }>
            <OptionTitle>Border</OptionTitle>
            <PropertyWrapper>
              <div>
              <OptionSubtitle>Style</OptionSubtitle>
              <DropdownButton
                listItems={['None', 'Solid', 'Double', 'Dotted', 'Dashed']}
                value={props.type === 'default' ? props.optionState.borderStyle : props.type === 'hover' ? props.optionState.borderStyleHover : props.type === 'focus' ? props.optionState.borderStyleFocus : null }
                handler={ (e) => props.dispatch({type: ACTIONS.EDIT_BORDER_STYLE, payload: e.target.innerText}) }
                />
              </div>
            
              <div>
              <OptionSubtitle>Width</OptionSubtitle>
              <DropdownButton
                listItems={['1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px', '9px', '10px']}
                value={props.type === 'default' ? props.optionState.borderWidth : props.type === 'hover' ? props.optionState.borderWidthHover : props.type === 'focus' ? props.optionState.borderWidthFocus : null }
                handler={ (e) => props.dispatch({type: ACTIONS.EDIT_BORDER_WIDTH, payload: e.target.innerText}) }
                />
              </div>

              <PopoverPicker
            color={props.type === 'default' ? props.optionState.borderColor : props.type === 'hover' ? props.optionState.borderColorHover : props.type === 'focus' ? props.optionState.borderColorFocus : null }
            onChange={(color) => props.dispatch({type: ACTIONS.EDIT_BORDER_COLOR, payload: color})} />
            </PropertyWrapper>
          </div>
        </Option>

      <Option type="boxShadow" style={{animationDelay: '0.2s'}}>
      <OptionSwitch type="checkbox" onChange={() => props.dispatch({type: ACTIONS.TOGGLE_SHADOW})}
            checked={props.type === 'default' && props.optionState.toggleShadow ? true :
            props.type === 'hover' && props.optionState.toggleShadowHover ? true :
            props.type === 'focus' && props.optionState.toggleShadowFocus ? true : false}
          />
          <div className={ props.type === 'default' && props.optionState.toggleShadow === false ? 'disabled' :
          props.type === 'hover' && props.optionState.toggleShadowHover === false ? 'disabled' :
          props.type === 'focus' && props.optionState.toggleShadowFocus === false ? 'disabled' : null }>
          <OptionTitle>Shadow</OptionTitle>
          <PropertyWrapper>
            <div>
            <OptionSubtitle>Distance</OptionSubtitle>
            <DropdownButton
              listItems={['None', 'Close', 'Medium', 'Far']}
              value={props.type === 'default' ? props.optionState.boxShadowDistance : props.type === 'hover' ? props.optionState.boxShadowDistanceHover : props.type === 'focus' ? props.optionState.boxShadowDistanceFocus : null }
              handler={ (e) => props.dispatch({type: ACTIONS.EDIT_SHADOW_DISTANCE, payload: e.target.innerText}) }
              />
            </div>
            <div>
            <OptionSubtitle>Blur</OptionSubtitle>
            <DropdownButton
              listItems={['None', 'Small', 'Medium', 'Large']}
              value={props.type === 'default' ? props.optionState.boxShadowBlur : props.type === 'hover' ? props.optionState.boxShadowBlurHover : props.type === 'focus' ? props.optionState.boxShadowBlurFocus : null }
              handler={ (e) => props.dispatch({type: ACTIONS.EDIT_SHADOW_BLUR, payload: e.target.innerText}) }
              />
            </div>

            <div>
            <OptionSubtitle>Spread</OptionSubtitle>
            <DropdownButton
              listItems={['None', 'Small', 'Medium', 'Large']}
              value={props.type === 'default' ? props.optionState.boxShadowSpread : props.type === 'hover' ? props.optionState.boxShadowSpreadHover : props.type === 'focus' ? props.optionState.boxShadowSpreadFocus : null }
              handler={ (e) => props.dispatch({type: ACTIONS.EDIT_SHADOW_SPREAD, payload: e.target.innerText}) }
              />
            </div>
            <PopoverPicker
            color={props.type === 'default' ? props.optionState.boxShadowColor : props.type === 'hover' ? props.optionState.boxShadowColorHover : props.type === 'focus' ? props.optionState.boxShadowColorFocus : null }
            onChange={(color) => props.dispatch({type: ACTIONS.EDIT_SHADOW_COLOR, payload: color})} />
          </PropertyWrapper>
        </div>
      </Option>

    </Wrapper>
  );
}

export default EditableContent;