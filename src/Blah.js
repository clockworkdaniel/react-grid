import React, { useState } from 'react';
import './App.css';
import randomPuppy from 'random-puppy';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const GridItem = ({itemName, color}) => (
  <div style={{gridArea: itemName, backgroundColor: color}} />
);

const Header = ({title}) => (
  <h1>{`${title}`}</h1>
);

const Copy = ({copy}) => (
  <p>{`${copy}`}</p>
);

const Picture = () => {
  const [puppy, setPuppy] = useState(undefined);
  randomPuppy().then(url => setPuppy(url))
  return puppy ? <img src={`${puppy}`} alt="god boi"/> : null;
}

function App() {

  return (
    <div className="App">
      <div className="grid">
        <Header title="Doggos" gridItem="header"/>
        <Copy copy={lorem.generateSentences(5)} gridItem="copy"/>
        <Picture gridItem="picture" />
      </div>
    </div>
  );
}

export default App;
