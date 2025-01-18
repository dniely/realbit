import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-DOGE');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from Upbit API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Upbit API' });
  }
}
