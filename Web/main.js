var libraries = {
	express:	require('express'),
	path:		require('path')
};

var app = libraries.express();
app.set('view engine', 'jade');
app.set('views', libraries.path.join(__dirname, 'views'));
//app.set('public', libraries.path.join(__dirname, 'public'));

app.use('/public', libraries.express.static(libraries.path.join(__dirname, 'public')));
app.use(libraries.express.static(libraries.path.dirname(require.resolve("mosca")) + "/public"));

// HTTP Section
app.get('/', function(req, res, next) {
	res.render('index', { title: "Express" });
});

module.exports = app;