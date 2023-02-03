import { useState } from "react";

// Utils
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Index of the (first) max value of an array
function indexOfMax(arr) {
  return arr.indexOf(Math.max(...arr));
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const n = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(n).fill(0));

  const getNewSelected = () => setSelected(getRandomInt(n));
  const vote = () => {
    const nextPoints = [...points];
    nextPoints[selected] += 1;
    setPoints(nextPoints);
  };

  const top = indexOfMax(points);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <DisplayAnecdote
        anecdote={anecdotes[selected]}
        point={points[selected]}
      />
      <button onClick={vote}>vote</button>
      <button onClick={getNewSelected}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <DisplayAnecdote anecdote={anecdotes[top]} point={points[top]} />
    </div>
  );
};

export default App;

const DisplayAnecdote = ({ anecdote, point }) => {
  const prettyPoint = `${point} vote${point > 1 ? "s" : ""}`;

  return (
    <>
      <div>{anecdote}</div>
      <div>has {prettyPoint}</div>
    </>
  );
};
