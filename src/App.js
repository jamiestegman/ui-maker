import './Style.css';
import {useState} from 'react';

import Container from './components/Container';
import Card from './components/Card';
import WelcomeScreen from './components/WelcomeScreen';
import Editor from './components/Editor';
import ThemeButton from './components/ThemeButton';

import {useRef} from 'react';

function App() {

  const [appState, setAppState] = useState(0);
  const card = useRef();

  const stateHandler = (newState) => {
    card.current.classList.add('fade-out');
    setTimeout(() => {
      setAppState(newState);
      card.current.classList.remove('fade-out');
    }, 400);
  }

  return (
    <Container>
      <Card ref={card}>
        { appState === 0 && <WelcomeScreen stateHandler={stateHandler} /> }
        { appState === 2 && <Editor type="button" /> }
      </Card>
      <ThemeButton />
    </Container>
  );
}

export default App;
