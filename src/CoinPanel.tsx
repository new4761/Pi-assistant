import React from 'react';

const coinsList = ['0bitcoin', 'Cbinancecoin', 'Cethereum', 'Caave'];
const baseUrl = 'https://api.coingecko.com/api/v3';
let parameterUrl = '/coins/markets?vs_currency=usd&ids=';
coinsList.forEach((element: string) => {
  parameterUrl += '%2' + element;
});
parameterUrl += '&order=gecko_desc&per_page=100&page=1&sparkline=false';
type MyState = { data: Promise<any>[] };
export default class CoinPanel extends React.Component<null, MyState> {
  timer: Timeout;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.updateCoinsPrice();
    this.timer = setInterval(
      () => this.updateCoinsPrice(),
      1000 * 60 * (60 * 3)
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateCoinsPrice() {
    fetch(baseUrl + parameterUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
        return data;
      })
      .catch(console.log);
  }

  render() {
    return (
      <ul>
        {this.state.data.map((item) => (
          <li key={item.id}>
            <h1>
              <img src={item.image} width="40" /> {item.id} :{' '}
              {item.current_price} USD
            </h1>
          </li>
        ))}
      </ul>
    );
  }
}
