const db = require("../database/connection");

function save_to_database(loglevel,message) {
    const sql = "INSERT INTO log(loglevel,message) VALUES(?,?)"
    db.query(sql, [loglevel,message],(err,result)=> {
        if(err) return console.log("save log in db have error =>" + " " + err.message);
        console.log("save log in db success =>" + " " + result.message);
    })
}

function get_logs(loglevel) {
    let sql = "SELECT * FROM log"
    let params = []

    if (loglevel !== "all") {
        sql += " WHERE loglevel = ?"
        params.push(loglevel)
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log("get log from db have error => " + err.message)
            return
        }
        console.log("get log from db success =>", result.message)
    })
}




module.exports = {
save_to_database,
get_logs
}