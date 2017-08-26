import axios from 'axios';

function createLogger(type) {
  return function (...args) {
    if (process.env.NODE_ENV === 'development') {
      return console.log(`[${type}]`, ...args);
    }
    return axios.post('/log', { data: JSON.stringify(args) });
  }
}

const logger = createLogger('log');
Object.assign(logger, {
  error: createLogger('error'),
  debug: createLogger('debug'),
  log: createLogger('log'),
})

export default logger;
