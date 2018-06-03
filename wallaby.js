const wallabyWebpack = require('wallaby-webpack');
const path = require('path');

const compilerOptions = Object.assign(
  {},
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions,
  { module: 'CommonJs' });

module.exports = function (wallaby) {
  const webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
      'src/wallaby-test.js',
      'src/**/*spec.js',
    ],
    module: {
      rules: [
        { test: /\.css$/, loader: ['raw-loader'] },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.ts$/, loader: '@ngtools/webpack',
          include: /node_modules/,
          query: { tsConfigPath: 'tsconfig.json' },
        },
        { test: /\.js$/, loader: 'angular2-template-loader',
          exclude: /node_modules/,
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader'] },
        { test: /\.less$/, loaders: ['raw-loader', 'less-loader'] },
        { test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader'] },
        { test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000' },
      ]
    },
    node: {
      dns: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [
        path.join(wallaby.projectCacheDir, 'src/lib'),
        path.join(wallaby.projectCacheDir, 'src'),
        'node_modules',
      ],
    },
  });

  return {
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions),
    },
    debug: true,
    env: {
      kind: 'chrome',
    },
    files: [
      { pattern: 'src/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)',
        load: false,
      },
      { pattern: 'src/**/*.d.ts', ignore: true },
      { pattern: 'src/**/*spec.ts', ignore: true },
    ],
    // middleware: function (app, express) {
    //   const path = require('path');
    //   app.use(
    //     '/favicon.ico',
    //     express.static(path.join(__dirname, 'src/favicon.ico')));
    //   app.use(
    //     '/assets',
    //     express.static(path.join(__dirname, 'src/assets')));
    // },
    postprocessor: webpackPostprocessor,
    setup: function () {
      window.__moduleBundler.loadTests();
    },
    testFramework: 'jasmine',
    tests: [
      { pattern: 'src/**/*spec.ts', load: false },
      { pattern: 'src/**/*e2e-spec.ts', ignore: true },
    ],
  };
};
