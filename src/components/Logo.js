import styled from 'styled-components';

const Wrapper = styled.a`
  text-decoration: none;
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: var(--gradient-primary);
  border-radius: 0.3em;

  &.small {
    width: 30px;
    height: 30px;
  }

  &.large {
    width: 80px;
    height: 80px;
  }
`

const Text = styled.span`
  font-size: 1.9em;
  font-weight: 700;
  color: white;
  text-align: left;

  &.small {
    font-size: 1em;
  }

  &.large {
    font-size: 3em;
  }
`

function Logo(props) {
  return(
    <Wrapper className={`${props.small && 'small'} ${props.large && 'large'}`} href="/">
        <Text className={`${props.small && 'small'} ${props.large && 'large'}`}>
          UI
        </Text>
    </Wrapper>
  );
}

export default Logo;