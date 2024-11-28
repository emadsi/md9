module.exports = {
    entry: './src/index.tsx',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'] // Add `.ts` and `.tsx`
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,   // For `.ts` and `.tsx` files
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        // Other loaders like `css-loader`, `file-loader`, etc.
      ],
    },
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist',
    },
  };
  