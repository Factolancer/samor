/*
 username:Option[String],userid:Option[Long], foliocount:Option[Long], firstname : Option[String],pan : Option[String], mob : Option[String]

 */

export class UserLogin {
    username: string;
    userid: number;
    foliocount : number;
    firstname : string;
    pan  : string;
    mob :  string;
    isVerified: string;

    constructor(public _username?: string, public _userid?: number, public _foliocount?: number, public _firstname?: string, public _pan?: string, public _mob?: string, public _isVerified?: string) {
        this.username = _username || "Anonymous";
        this.userid = _userid || 0;
        this.foliocount  = _foliocount || 0;
        this.firstname = _firstname || this.username;
        this.pan = _pan || "";
        this.mob = _mob || "";
        this.isVerified = _isVerified || "";
    }
}