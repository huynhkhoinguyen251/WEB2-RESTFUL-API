var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

const server = app.listen(port, () => {
  console.log(`Todo List REST API started on port: ${port}`);
  console.log(`Process PID: ${process.pid}`);
});

server.on('error', (err) => {
  console.error('Server error event:');
  console.error(err && err.stack ? err.stack : err);
  // nếu là lỗi port in thêm thông tin hữu ích
  if (err && err.code === 'EADDRINUSE') {
    console.error(`EADDRINUSE — port ${port} đang bị chiếm.`);
    try {
      // show current listeners (may require admin)
      const { execSync } = require('child_process');
      const out = execSync('netstat -ano | findstr 3000', { encoding: 'utf8' });
      console.error('netstat output (immediately after error):\n' + out);
    } catch (e) {
      console.error('Không thể chạy netstat từ node (có thể do quyền). Hãy chạy netstat thủ công.');
    }
  }
  process.exit(1);
});
