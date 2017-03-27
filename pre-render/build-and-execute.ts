import * as webpack from 'webpack';
import * as MemoryFileSystem from 'memory-fs';
import config from './webpack.config';

const compiler = webpack(config);
compiler.outputFileSystem = new MemoryFileSystem();

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    const output = stats.compilation.assets['main.js'].source();
    eval(output); // so gross but the only way I can find currently that doesn't involve writing temporary files to disk
  }
});