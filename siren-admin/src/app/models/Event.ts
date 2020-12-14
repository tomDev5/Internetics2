export class Event {
    name: string;
    time: string;
    user: string;
    room: string;
    text: string;

    constructor(name: string, time: string, user: string, room: string, text: string = "") {
        this.name = name;
        this.time = time;
        this.user = user;
        this.room = room;
        this.text = text;
    }
}