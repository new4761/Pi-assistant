import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import CoinPanel from './CoinPanel';

const dateToLocalTime = () => {
  return new Date(Date.now()).toString();
};

const TimePanelStyle = {
  fontSize: '3.5rem',
  textAlign: 'center',
};
// const Hello = () => {
//   return <div>{dateToLocalTime().toString()}</div>;
// };

type MyState = { date: string };
class TimePanel extends React.Component<null, MyState> {
  timer: Timeout;

  constructor(props) {
    super(props);
    this.state = { date: dateToLocalTime() };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime() {
    this.setState({
      date: dateToLocalTime(),
    });
  }

  render() {
    const { date } = this.state;
    return <h1 style={TimePanelStyle}>{date}</h1>;
  }
}

export default function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <TimePanel />
      <CoinPanel />
    </div>
  );
}
