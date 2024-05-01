const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

function getHtmlPlugins(chunks) {
	return chunks.map(
		(chunk) =>
			new HtmlWebpackPlugin({
				filename: `${chunk}.html`,
				template: path.resolve(__dirname, `src/${chunk}/${chunk}.html`),
				chunks: [chunk],
			})
	)
}

module.exports = {
	// mode: 'development',
	mode: 'production',
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
		...getHtmlPlugins(['popup', 'options']),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public'),
					to: path.resolve(__dirname, 'build'),
				},
			],
		}),
	],
	optimization: {
		minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: (chunk) => {
				return chunk.name !== 'background'
			},
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
