var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./UserRoutes/userRoute');
var userbyidRouter = require('./UserRoutes/userbyidRoute');
var feedbackRouter = require('./UserRoutes/feedbackRoute');
var usertypeRouter = require('./UserRoutes/usertypeRoute');
var propertyRouter = require('./UserRoutes/propertyRoute');
var propertybyareaRouter = require('./UserRoutes/propertybyareaRoute');
var propertybyidRouter = require('./UserRoutes/propertybyidRoute');
var propertybyuseridRouter = require('./UserRoutes/propertybyuseridRoute');
var propertyimagesRouter = require('./UserRoutes/propertyimagesRoute');
var appointmentreqRouter = require('./UserRoutes/appointmentReqRoute');
var propertytypeRouter = require('./UserRoutes/propertybytypeRoute');
var fixappointmentRouter = require('./UserRoutes/fixappointmentRoute');
var joinappointmentRouter = require('./UserRoutes/joinappointmentRoute');
var sendmailRouter =  require('./UserRoutes/sendmailRoute');
var sellpropertyRouter = require('./UserRoutes/propertysellRoute');
var propertymaxrentRouter = require('./UserRoutes/propertymaxrentRoute');
var deletepimage = require('./UserRoutes/deletepropertyimageRoute');

var adminloginRoute = require('./AdminRoutes/loginRoute');
var adminManageUsersRoute = require('./AdminRoutes/manageUsersRoute');
var adminManageFeedbacksRoute = require('./AdminRoutes/manageFeedbacksRoute');
var adminManageProfileRoute = require('./AdminRoutes/manageProfileRoute');
var adminHomePage = require('./AdminRoutes/homePageRoute');
var adminForgotPwd = require('./AdminRoutes/forgotPwdRoute');
var adminManageAppointments = require('./AdminRoutes/manageAppointmentsRoute');
var adminManageProperties = require('./AdminRoutes/managePropertiesRoute');


var app = express();
var cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user',userRouter);
app.use('/userbyid',userbyidRouter)
app.use('/feedback',feedbackRouter);
app.use('/usertype',usertypeRouter);
app.use('/propertybyarea',propertybyareaRouter);
app.use('/propertybyid',propertybyidRouter);
app.use('/property',propertyRouter);
app.use('/propertybyuserid',propertybyuseridRouter);
app.use('/propertyimages',propertyimagesRouter);
app.use('/sellproperty',sellpropertyRouter);
app.use('/appointmentreq',appointmentreqRouter);
app.use('/propertybytype',propertytypeRouter);
app.use('/fixappointment',fixappointmentRouter);
app.use('/joinappointment',joinappointmentRouter);
app.use('/sendmail',sendmailRouter);
app.use('/propertymaxrent',propertymaxrentRouter);
app.use('/deletepropertyimage',deletepimage);

app.use(adminloginRoute);
app.use(adminManageUsersRoute);
app.use(adminManageFeedbacksRoute);
app.use(adminManageProfileRoute);
app.use(adminHomePage);
app.use(adminForgotPwd);
app.use(adminManageAppointments);
app.use(adminManageProperties);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
