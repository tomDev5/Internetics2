const readline = require("readline-sync")
const request = require('sync-request')
const MongoClient = require('mongodb').MongoClient

const USERS_URL = 'https://random-data-api.com/api/users/random_user'
const HIPSTERS_URL = 'https://random-data-api.com/api/hipster/random_hipster_stuff'
const DESSERTS_URL = 'https://random-data-api.com/api/dessert/random_dessert'

function genHexString(len = 24) {
    const str = Math.floor(Math.random() * Math.pow(16, len)).toString(16);
    return "0".repeat(len - str.length) + str;
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function generateUsers(num) {
    const raws = JSON.parse(request('GET', USERS_URL + '?size=' + num).body)
    const users = []
    for (let raw of raws) {
        users.push({
            _id: raw.username,
            name: raw.first_name + ' ' + raw.last_name,
            description: raw.employment.title + '. My key skill is ' + raw.employment.key_skill.toLowerCase() + '.',
            password: 'test',
        })
    }

    return users
}

function generateComments(num, users) {
    const raws = JSON.parse(request('GET', HIPSTERS_URL + '?size=' + num).body)

    const comments = []
    for (let raw of raws) {
        const user = getRandomSubarray(users, 1).map(user => user._id)[0]
        const uploadTime = Math.floor(Math.random() * 100000000000 + 1550000000000)

        comments.push({
            _id: genHexString(24),
            user: user,
            text: raw.paragraph,
            upload_time: uploadTime,
        })
    }

    return comments
}

function generateSirens(num, users) {
    const raws = JSON.parse(request('GET', HIPSTERS_URL + '?size=' + num).body)

    const sirens = []
    for (let i = 0; i < num; i++) {
        const user = getRandomSubarray(users, 1).map(user => user._id)[0]
        const uploadTime = Math.floor(Math.random() * 100000000000 + 1550000000000)
        const likes = getRandomSubarray(users, Math.random() * (users.length + 1)).map(user => user._id)
        const comments = generateComments(Math.random() * users.length, users)

        sirens.push({
            _id: genHexString(24),
            user: user,
            text: raws[i].paragraph,
            upload_time: uploadTime,
            comments: comments,
            likes: likes,
        })
    }

    return sirens
}

function generateRooms(num, users) {
    const raws = JSON.parse(request('GET', DESSERTS_URL + '?size=' + num).body)

    const rooms = []
    for (let raw of raws) {
        const roomSize = Math.floor(Math.random() * users.length / 4)

        const numSirens = Math.floor(Math.random() * roomSize)
        const roomUsers = getRandomSubarray(users, roomSize)

        rooms.push({
            _id: genHexString(24),
            name: raw.variety,
            users: roomUsers.map(user => user._id),
            sirens: generateSirens(numSirens, roomUsers),
        })
    }

    return rooms
}

const connectionString = 'mongodb://127.0.0.1:27017/'
MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    
    const db = client.db('Siren')
    db.dropDatabase()

    const numUsers = readline.questionInt('How many users? ')
    const numRooms = readline.questionInt('How many rooms? ')

    const yesno = readline.question(`Scrape ${numUsers} users and ${numRooms} rooms? (yes/no) `)

    if (yesno.toLowerCase().trim() !== 'yes') {
        console.log('Cancelled scraping.')
        process.exit(0)
    }

    console.log('Generating users...')
    const users = generateUsers(numUsers)
    db.collection('User').insertMany(users)

    console.log('Generating rooms...')
    const rooms = generateRooms(numRooms, users)
    db.collection('Room').insertMany(rooms)

    const admins = [
        {
            _id: 'admin',
            password: 'test',
        }
    ]
    db.collection('Admin').insertMany(admins)

    console.log('done')
})