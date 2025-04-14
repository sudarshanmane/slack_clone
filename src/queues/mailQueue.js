import Queue from 'bull';

import redisConfig from '../config/redisConfig.js';

const queue = new Queue('mailQueue', {
  redis: redisConfig
});

// queue.on('error', (err) => {
//   console.error('❌ Queue Redis error:', err);
// });

export default queue;
