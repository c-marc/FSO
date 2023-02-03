import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //more stats
  const all = good + neutral + bad;
  const average = all ? (good - bad) / all : "no feedback";
  const positive = all ? (good / all) * 100 : "no feedback";

  const stats = { good, neutral, bad, all, average, positive };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td> {value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  if (stats.all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={stats.good} />
        <StatisticLine text="neutral" value={stats.neutral} />
        <StatisticLine text="bad" value={stats.bad} />

        <StatisticLine text="all" value={stats.all} />
        <StatisticLine text="average" value={stats.average} />
        <StatisticLine text="positive" value={`${stats.positive} %`} />
      </tbody>
    </table>
  );
};
