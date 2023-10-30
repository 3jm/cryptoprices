async function fetchCryptoData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,litecoin,dash,tether');
      const cryptoData = await response.json();
      return cryptoData;
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  }

  function createCryptoCard(crypto) {
    const cryptoList = document.getElementById('cryptoList');

    const card = document.createElement('div');
    card.className = 'crypto-card';

    const logo = document.createElement('img');
    logo.src = crypto.image;
    logo.alt = `${crypto.name} Logo`;
    logo.className = 'crypto-logo';

    const name = document.createElement('h2');
    name.className = 'crypto-name';
    name.textContent = `${crypto.name} (${crypto.symbol})`;

    const price = document.createElement('p');
    price.className = 'crypto-price';
    price.textContent = `$${crypto.current_price.toFixed(2)}`;

    const change = document.createElement('p');
    change.className = 'crypto-change';
    const changePercentage = crypto.price_change_percentage_24h;
    const changeIcon = changePercentage >= 0 ? '<i class="fa-solid fa-arrow-trend-up"></i>' : '<i class="fa-solid fa-arrow-trend-down"></i>';
    change.innerHTML = `${changeIcon} ${changePercentage.toFixed(2)}%`;
    change.style.color = changePercentage >= 0 ? 'green' : 'red';

    const marketCap = document.createElement('p');
    marketCap.className = 'crypto-info';
    marketCap.textContent = `Market Cap: $${crypto.market_cap.toLocaleString()}`;

    const totalVolume = document.createElement('p');
    totalVolume.className = 'crypto-info';
    totalVolume.textContent = `Total Volume: $${crypto.total_volume.toLocaleString()}`;

    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(change);
    card.appendChild(marketCap);
    card.appendChild(totalVolume);

    cryptoList.appendChild(card);
  }

  async function main() {
    const cryptoData = await fetchCryptoData();

    if (cryptoData) {
      cryptoData.forEach((crypto) => {
        createCryptoCard(crypto);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', main);