import requestIp from 'request-ip';
import rateLimit from 'express-rate-limit';

const ipRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  skip: req => (req.ip === '8.8.8.8' || '::1' ? true : false),
});
export default ipRateLimiter;
