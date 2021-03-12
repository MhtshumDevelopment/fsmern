const path = require("path");

process.env.NODE_ENV = 'development';

module.exports = {
  mode:"development",
  entry: path.resolve(__dirname,`src`,`app`),
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve:{
    extensions: ['.js','.jsx']
  },
  devServer:{
    historyApiFallback: true
  },
  module:{
		rules : [    
			{
				test: /\.jsx?/,
        exclude: /node_modules/,
				loader : 'babel-loader'
			}  			
    ]
  }
}
