import React from 'react';

const coinsList = ['0bitcoin', 'Cbinancecoin', 'Cethereum', 'Caave','Csmooth-love-potion','Calpha-finance','Csolana','Cthetan-arena','Corca']
const baseUrl = 'https://api.coingecko.com/api/v3';
let parameterUrl = '/coins/markets?vs_currency=THB&ids=';

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
    //every 5 min
    this.timer = setInterval(() => this.updateCoinsPrice(), 1000 * (60 * 2));
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
            <h5>
              <img src={item.image} width="20" />  {item.id} :{' '}
              {item.current_price} THB
            </h5>
          </li>
        ))}
      </ul>
    );
  }
}
