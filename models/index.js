const {rooms} = require('./rooms');

rooms.sync({force : true}).then(() => {
    rooms.bulkCreate([
        {
            id : Date.now(),
            name: 'room1',
            users: JSON.stringify(['user1','user2']),
            password : 'room1'
        },
        {
            id : Date.now()+1,
            name: 'room2',
            users: JSON.stringify([]),
            password : 'room2'
        },
        {
            id : Date.now()+2,
            name: 'room3',
            users: JSON.stringify([]),
            password : 'room3'
        },
    ])
})

module.exports = {rooms};