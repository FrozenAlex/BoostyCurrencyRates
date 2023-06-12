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
      let result = await getTarget(272652, "USD");
      
      // The target sum in USD (target ruble value = 100 000)
      let sumInUSD = result.targetSum;

      // Divide 100000 by the target sum in USD
      let rubPerUSD = 100000 / sumInUSD;

      // Round the result to 2 decimal places
      rubPerUSD = Math.round(rubPerUSD * 100) / 100;

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
          <div className="rate__value">{rubLoading ? 'Загрузка...' : rubRate}</div>
        </div>
      </div>
    </section>
  );
};

export default Popup;
