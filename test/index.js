var themeify = require('../lib/index');

themeify(__dirname + '/theme.less', {
	paths: [__dirname]
})

.then(function(result) {
	console.log(result);
})
.catch(function(err) {
	console.error(err.message + '\n' + err.stack || '');
})
