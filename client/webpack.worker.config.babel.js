import config from './webpack.config.babel';

config.entry = { sw: "./src/util/serviceWorker.js" };
config.output.filename = '[name].js';

export default config;
