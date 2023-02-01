const
    iconv = require('iconv-lite'),
    { exec } = require('child_process')

// Выполнить команду net user
const exec_netUser = (callback) => {
    exec('net user', { encoding: "buffer" },
        (error, stdout, stderr) => {
            if (error) {
                callback(stderr, null)
            } else {
                callback(null, iconv.decode(stdout, 'CP866'))
            }
        }
    );
}

// Создать массив со списком пользователей
const usersTable = (callback) => (exec_netUser((err, res) => {
    if (err) {
        console.log(`Error: ${err}`)
    }
    else {
        callback(res
            .slice(res.lastIndexOf('-') + 1)
            .match(/([A-Za-zА-Яа-я0-9_]+)/g)
        )
    }
}))

module.exports = usersTable