require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const analyzeRouter = require('./routes/analyze');
const downloadRouter = require('./routes/download');
const healthRouter = require('./routes/health');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// trust proxy if configured
if (config.TRUST_PROXY) app.set('trust proxy', 1);

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// CORS
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow server-to-server or curl
    if (config.CORS_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('CORS_NOT_ALLOWED'));
  },
};
app.use(cors(corsOptions));

// rate limiter
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// routes
app.use('/api/analyze', analyzeRouter);
app.use('/api/download', downloadRouter);
app.use('/api/health', healthRouter);

// health root
app.get('/', (req, res) => res.json({ ok: true, message: 'YTGrab backend' }));

// error handler
app.use(errorHandler);

module.exports = app;
