//// loglevel (info , warn , error)

const { save_to_database } = require("../controller/log_controller")


class logger {
    constructor(loglevel,message){
      this.loglevel = loglevel
      this.message = message
    }

    async save(){
        await save_to_database(this.loglevel , this.message)
    }
}


module.exports = logger
