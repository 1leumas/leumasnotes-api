const { Router } = require('express');
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');
const ensureAuth = require('../middleware/ensureAuth');

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


usersRouter.post('/', usersController.create);
usersRouter.put('/',ensureAuth, usersController.update);
usersRouter.patch("/avatar", ensureAuth, upload.single("avatar"), userAvatarController.update)

module.exports = usersRouter;