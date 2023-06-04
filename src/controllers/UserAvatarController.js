const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const diskStorage = require("../providers/DiskStorage")

class UserAvatarController{
    async update(req, res){
        const user_id = req.user.id;
        const avatarFileName = req.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users")
        .where({ id: user_id }).first();

        if(!user){
            return res.status(401).json("Only authenticated users can change profile picture");
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFileName);
        user.avatar = filename;
        await knex("users").update(user).where({id: user_id });

        return res.json(user);
    }
}

module.exports = UserAvatarController;