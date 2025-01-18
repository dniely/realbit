import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = 3000;

// 사용자의 랭킹을 관리하기 위한 메모리 배열 (실제로는 데이터베이스를 사용할 수 있음)
let rankings = [];

app.use(express.static('public'));

// 기본 라우트로 HTML 파일 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Upbit API 프록시 라우트
app.get('/api/upbit', async (req, res) => {
  try {
    const response = await fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-DOGE');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Upbit API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Upbit API' });
  }
});

// 랭킹 정보 제공 API
app.get('/api/ranking', (req, res) => {
  res.json(rankings);
});

// 사용자가 게임을 종료하고 랭킹에 저장할 때 호출
app.post('/api/update-ranking', express.json(), (req, res) => {
  const { name, balance } = req.body;

  // 기존에 해당 이름의 사용자가 있으면 업데이트, 없으면 새로 추가
  const existingUser = rankings.find(user => user.name === name);
  if (existingUser) {
    existingUser.balance = balance;
  } else {
    rankings.push({ name, balance });
  }

  // 랭킹 정렬 (잔액 기준 내림차순)
  rankings.sort((a, b) => b.balance - a.balance);
  res.status(200).send('Ranking updated!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
