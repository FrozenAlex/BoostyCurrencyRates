import * as React from 'react';
// import {browser, Tabs} from 'webextension-polyfill-ts';

import './styles.scss';
import { getTarget } from '../api';

// function openWebPage(url: string): Promise<Tabs.Tab> {
//   return browser.tabs.create({url});
// }

const Popup: React.FC = () => {
  // Use rub rate
  const [rubRate, setRubRate] = React.useState(0);
  const [rubLoading, setRubLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      let result = await getTarget(414314, 'USD');
      
      // The target sum in USD (target ruble value = 150 000)
      let sumInUSD = result.targetSum;

      // Divide 150000 by the target sum in USD
      let rubPerUSD = 150000 / sumInUSD;

      // Round the result to 4 decimal places
      rubPerUSD = Math.round(rubPerUSD * 10000) / 10000;

      setRubRate(rubPerUSD);
      setRubLoading(false);
    })();
  }, []);

  return (
    <section id="popup">
      <h2 className="title">Курс валют Boosty</h2>
      <div className="rates">
        <div className="rate">
          <div className="rate__title">1 USD = RUB</div>
          <div className="rate__value">{rubLoading ? 'Загрузка...' : rubRate.toString()}</div>
        </div>
      </div>
    </section>
  );
};

export default Popup;
