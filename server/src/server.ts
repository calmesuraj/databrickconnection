import express from 'express';
import cors from 'cors';
import routes from '../src/routes';
import 'dotenv/config';

const PORT = Number(process.env.PORT || 8787);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});