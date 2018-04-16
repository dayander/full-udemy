require('babel-core/register')({
    "presets": ['react', 'es2016', 'stage-2']
})


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var httpProxy = require('http-proxy');

var requestHandler = require('./requestHandler');



var app = express();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);



//PROXY TO API

const apiProxy = httpProxy.createProxyServer({
    target:"http://localhost:3001"
});
app.use('/api', function(req, res){

    apiProxy.web(req, res);
})
//
app.use(requestHandler);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// app.get('*', (req,res)=>{
//     requestHandler(req,res)
//
// });


// app.get('*', (req,res)=>{
//
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
