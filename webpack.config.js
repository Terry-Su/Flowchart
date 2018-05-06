const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: {
		'flowchart.js': './src/index.ts',
	},
	output: {
		filename: '[name]',
		path: path.resolve( __dirname, 'build' )
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, "build"),
		compress: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		alias: {
			draw: path.resolve( __dirname, './src/draw' ),
			model: path.resolve( __dirname, './src/model' ),
			shape: path.resolve( __dirname, './src/shape' ),
			util: path.resolve( __dirname, './src/util' ),
			store: path.resolve( __dirname, './src/store' ),
			lib: path.resolve( __dirname, './src/lib' ),
			interface: path.resolve( __dirname, './src/interface' ),
			interaction: path.resolve( __dirname, './src/interaction' ),
			schema: path.resolve( __dirname, './src/schema' ),
			mixin: path.resolve( __dirname, './src/mixin' ),
			shared: path.resolve( __dirname, './src/shared' ),
		},
		extensions: [
			'.tsx',
			'.ts',
			'.js'
		],
	},
	plugins: [
		new CleanWebpackPlugin( [ 'build' ] ),
		new CopyWebpackPlugin( [
			{
				from: './src/__test__',
				to: '__test__'
			},
			{
				from: './src/asset',
				to: 'asset'
			},
		] )
	]

};
