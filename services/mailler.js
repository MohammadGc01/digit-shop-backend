const { send_email } = require("../controller/mailler_controller")

class mailler {
    constructor(to , subject , text){
      this.to = to
      this.subject = subject
      this.text = text
    }

    async send() {
        await send_email(this.to , this.subject, this.text)
    }
}

module.exports = mailler