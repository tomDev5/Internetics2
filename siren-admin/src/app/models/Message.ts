import { Timestamp } from "rxjs";

export class Message {
    _id:string;
    user: string;
    text: string;
    likes: string[];
    upload_time: number;
    comments: any[]


    constructor(id:string, user:string, text:string, likes:string[], timestamp:number, comments:Comment[]){
        this._id = id
        this.user = user
        this.text = text
        this.likes = likes
        this.upload_time = timestamp
        this.comments = comments
    }
}