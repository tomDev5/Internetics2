import { Timestamp } from "rxjs";

export class Message {
    _id:string;
    user: string;
    text: string;
    upload_time: Timestamp<any>;


    constructor(id:string, user:string, text:string, timestamp:Timestamp<any>){
        this._id = id
        this.user = user
        this.text = text
        this.upload_time = timestamp
    }
}