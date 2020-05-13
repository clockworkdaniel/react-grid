import React, { useState, useEffect } from "react";
import "./App.css";
import { LoremIpsum } from "lorem-ipsum";
import { createUseStyles } from "react-jss";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const Header = ({ title }) => <h1>{`${title}`}</h1>;

const Copy = ({ copy }) => <p>{`${copy}`}</p>;

const Picture = () => {
  const [doggo, setDoggo] = useState(undefined);

  useEffect(() => {
    fetch("https://random.dog/woof.json")
      .then((response) => response.json())
      .then((json) => setDoggo(json.url));
  }, []);

  return doggo ? (
    <img className="picture" src={`${doggo}`} alt="god boi" />
  ) : null;
};

const ReactGrid = ({ children, styleSheet }) => {
  const gridAreas = children.reduce((acc, child, index) => {
    return {
      ...acc,
      [`& > :nth-child(${index + 1})`]: {
        gridArea: `${(child.props.itemName || child.type.name).toLowerCase()}`,
      },
    };
  }, {});

  const classes = createUseStyles({
    reactGrid: {
      display: "grid",
      ...styles,
      ...gridAreas,
    },
  })();

  return <div className={classes.reactGrid}>{children}</div>;
};

const styles = {
  gridTemplateAreas: `'. blah .'
    'copy picture picture'
    'copy picture picture'`,
  gridGap: "1rem",
  gridTemplateColumns: "repeat(3, 1fr)",
};

function App() {
  return (
    <div className="App">
      <ReactGrid styleSheet={styles}>
        <Header title="Doggos" itemName="blah" />
        <Copy copy={lorem.generateSentences(5)} />
        <Picture />
      </ReactGrid>
    </div>
  );
}

export default App;
