const path =  require('path');

const includePaths = [
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, 'test'),
  path.resolve(__dirname, 'package.json'),
];

module.exports = {
  
  entry: './src/server.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  
  //default mode is production
  mode: 'development',
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/i,
        use: 'ts-loader',
        exclude: ['/node_modules/'],
        include: includePaths,
      },
    ]
  },
  resolve: {
    fallback: { 
      "os": false,
      "path": false,
      "process": false,
      "fs": false,
      "http": false,
      "buffer": false,
      "url": false,
      // "http": require.resolve("stream-http"),
      // "buffer": require.resolve("buffer/"),
      // "url": require.resolve("url/"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    modules: ['src', 'node_modules']
  }
}