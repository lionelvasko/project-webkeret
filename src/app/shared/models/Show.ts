import { Time } from "@angular/common";
import { Timestamp } from "firebase/firestore";

export interface Show {
    id?: any;
    seats: Array<boolean>;
    movie: string;
    datetime: Timestamp;
}


