use Siren
db.dropDatabase()
use Siren

db.User.insertOne({_id: "tomlubin", description: "I am Tom Lubin!", name: "Tom", password: "test"})
db.User.insertOne({_id: "tomlub", description: "I am Tom Lub!", name: "Tom2", password: "test"})
db.User.insertOne({_id: "omerlubin", description: "I am Omer lubin!", name: "Omer", password: "test"})

db.Room.insertOne({
    _id: "5fd57646415578f15f6fccb7",
    name: "room1",
    users: ["tomlubin","omerlubin","tomlub"],
    sirens: [
        {
            _id: "576155742cc42d2dbbabb3c6",
            user: 'tomlubin',
            text: 'HELLO! I AM TOM!',
            comments: [
                {_id: "578155742cc42d2dbbabb3c6", user: 'omerlubin', text: 'HI!', upload_time: 1616822382204},
                {_id: "598155742cc42d2dbbabb3c6", user: 'tomlub', text: 'HELLO!', upload_time: 1617822382204}
            ],
            upload_time: 1607822382204,
            likes: ['omerlubin', 'tomlubin']
        },
        {
            _id: "2fd57646415578f15f6fccbe",
            user: 'omerlubin',
            text: 'HELLO! I AM OMER!',
            comments: [
                {_id: "2dd57646415578f15f6fccbe", user: 'omerlubin', text: 'HI!', upload_time: 1627822382204}
            ],
            upload_time: 1607722382204,
            likes: ['tomlub']
        },
        {
            _id: "57615573e9982b2d34ffcbc2",
            user: 'tomlub',
            text: 'HELLO! I AM TOM TOO!',
            comments: [
                {_id: "53315573e9982b2d34ffcbc2", user: 'omerlubin', text: 'HI!', upload_time: 1617822382204}
            ],
            upload_time: 1607622382204,
            likes: ['tomlub', 'tomlubin']
        },
    ]
})

db.Room.insertOne({
    _id: "34ab6787c787d788a77feaa3",
    name: "room2",
    users: ["omerlubin"],
    sirens: [
        {
            _id: "576111ecd313042d3c6",
            user: 'omerlubin',
            text: 'HELLO!',
            comments: [
                {_id: "581111ecd313042d3c6", user: 'omerlubin', text: 'TEST!', upload_time: 1597822382204}
            ],
            upload_time: 1587822382204,
            likes: ['omerlubin']
        }
    ]
})

db.Admin.insertOne({
    _id: 'admin',
    password: 'test'
})