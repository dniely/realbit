import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// 클라이언트 파일 서빙 설정
app.use(express.static('public'));

// CORS 헤더 추가
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 기본 라우트로 HTML 파일 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Upbit API 프록시 라우트
app.get('/api/upbit', async (req, res) => {
  try {
    const coin = req.query.coin || 'BTC'; // 쿼리로 코인 값 가져오기 (기본값: BTC)
    const response = await fetch(`https://api.upbit.com/v1/ticker?markets=KRW-${coin}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Upbit API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Upbit API' });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
