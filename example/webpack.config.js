module.exports = {
  entry: {
    app: ['./main.jsx']
  },
  output: {
    path: './build',
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
	module: {
		loaders: [{
			 //tell webpack to use jsx-loader for all *.jsx files
			test: /\.jsx$/,
			loader: 'jsx-loader?insertPragma=React.DOM&harmony'
		}]
	},
	externals: {
		//don't bundle the 'react' npm package with our bundle.js
		//but get it from a global 'React' variable
	//	'react': 'React'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
