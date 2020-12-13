use Siren
db.dropDatabase()
use Siren

db.User.insertOne({_id: "tomlubin", name: "Tom", password: "test"})
db.User.insertOne({_id: "tomlub", name: "Tom2", password: "test"})
db.User.insertOne({_id: "omerlubin", name: "Omer", password: "test"})

db.Room.insertOne({
    name: "room1",
    users: ["tomlubin","omerlubin","tomlub"],
    messages: [
        {user: 'tomlubin', text: 'HELLO! I AM TOM!', comments: [{user: 'omerlub', text: 'HI!', upload_time: 1616822382204}, {user: 'tomlub', text: 'HELLO!', upload_time: 1617822382204}], upload_time: 1607822382204, likeCount: 3, liked: true},
        {user: 'omerlubin', text: 'HELLO! I AM OMER!', comments: [{user: 'omerlub', text: 'HI!', upload_time: 1627822382204}], upload_time: 1607722382204, likeCount: 3, liked: true},
        {user: 'tomlub', text: 'HELLO! I AM TOM TOO!', comments: [{user: 'omerlub', text: 'HI!', upload_time: 1617822382204}], upload_time: 1607622382204, likeCount: 3, liked: true},
    ]
})

db.Room.insertOne({
    name: "room2",
    users: ["omerlubin"],
    messages: [
        {user: 'omerlubin', text: 'HELLO!', comments: [{user: 'omerlub', text: 'TEST!', upload_time: 1597822382204}], upload_time: 1587822382204}
    ]
})