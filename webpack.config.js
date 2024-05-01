const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		popup: './src/popup.jsx',
	},
	output: {
		path: path.resolve(__dirname, 'build/src'),
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
			template: 'src/popup.html',
			chunks: ['popup'],
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
