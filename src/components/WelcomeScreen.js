import styled from 'styled-components';
import Logo from './Logo';
import Button from './Button';

import FadeIn from './utility/FadeIn';

import {AiFillGithub} from 'react-icons/ai';
import {BsArrowRight} from 'react-icons/bs';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10%;
  text-align: center;

  @media (max-width: 600px) {
    padding: 0;

    & > div:first-of-type {
      font-size: 0.8em;
    }
  }
`

const Heading = styled.h1`
  font-size: 2.5em;
  color: var(--text-h);
  margin-bottom: 0.25em;
  margin-top: 0.75em;
  transition: var(--transition-med);

  @media (max-width: 600px) {
    font-size: 1.7em;
    margin-bottom: 0.5em;
  }
`

const Subheading = styled.p`
  font-size: 1em;
  color: var(--text-p);
  margin-bottom: 1.5em;
  transition: var(--transition-med);

  @media (max-width: 600px) {
    font-size: 0.9em;
  }
`

const ButtonWrapper = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;

  @media(min-width: 769px) {
    & > * + * {
      margin-left: 1em;
    }
  } 

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    & > * + * {
      margin-top: 1em;
    }
  }
`

const WelcomeScreen = (props) => {

  return (
    <Wrapper>
        <FadeIn style={{width: 'max-content'}}><Logo /></FadeIn>
        <FadeIn delay={200}><Heading>Create beautiful React buttons <br className="desktop" />with a simple, visual builder</Heading></FadeIn>
        <FadeIn delay={400}><Subheading>A lightning-fast application with no signup required. Jump right in and enjoy!</Subheading></FadeIn>

        <ButtonWrapper>
          <FadeIn style={{width:'100%'}} delay={600}><Button primary onClick={() => props.stateHandler(2)}>Get Started <BsArrowRight/></Button></FadeIn>
          <FadeIn style={{width:'100%'}} delay={700}><a href="https://github.com/jamiestegman/ui-maker"><Button>Read the docs <AiFillGithub/></Button></a></FadeIn>
        </ButtonWrapper>
    </Wrapper>
  );
};

export default WelcomeScreen;