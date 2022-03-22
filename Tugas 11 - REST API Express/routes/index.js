var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/users');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/karyawan', UsersController.findAll)

router.post('/register', UsersController.register)
router.post('/login', UsersController.login)
router.post('/karyawan/:name/siswa', UsersController.addStudent)


router.get('/test', function(req, res, next) {
  res.send('this is test of other users endpoint');
});  


module.exports = router;
