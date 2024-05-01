const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	mode: 'development',
	// mode: 'production',
	entry: {
		popup: './src/popup/popup.jsx',
		options: './src/options/options.jsx',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'popup.html',
			template: path.resolve(__dirname, 'src/popup/popup.html'),
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			filename: 'options.html',
			template: path.resolve(__dirname, 'src/options/options.html'),
			chunks: ['options'],
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public'),
					to: path.resolve(__dirname, 'build'),
				},
			],
		}),
	],
	//  optimization: {
	//       minimizer: [
	//           new TerserPlugin(),
	//           new OptimizeCSSAssetsPlugin(),
	//       ],
	//       splitChunks: {
	//           chunks: 'all',
	//       },
	//   },
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
