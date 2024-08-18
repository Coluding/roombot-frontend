export enum Platform{
    kamernet = "kamernet",
    wgg= "wggesucht",
}

export enum Status {
    active = "Active",
    inactive = "Inactive"
}

export enum KamernetStatus {
    student = "Student",
    working = "Working",
    working_student = "Working Student",
}

export interface PlatformSpecific {
    location: string | null;
    max_price: number | null;
    min_size: number | null;
    max_size: number | null;
    min_rooms: number | null;
    max_rooms: number | null;
    radius: number | null;
    gender: string | null;
    age: number | null;
    status: KamernetStatus | null;
}

export class KamernetSpecific implements PlatformSpecific {
    max_price: number;
    min_size: number;
    max_size: number;
    min_rooms: number;
    max_rooms: number;

    constructor(max_price: number, min_size: number, max_size: number, min_rooms: number, max_rooms: number) {
        this.max_price = max_price;
        this.min_size = min_size;
        this.max_size = max_size;
        this.min_rooms = min_rooms;
        this.max_rooms = max_rooms;
    }

}



export interface BotConfiguration {
    platform: Platform | null;
    title: string;
    apikey: string;
    email: string;
    password: string;
    end_date: string;
    search_interval: number;
    system_message: string;
}



export interface FinalKamernetBotConfig {
    title: string;
    apikey: string;
    email: string;
    password: string;
    end_date: string;
    search_interval: number;
    location: string;
    max_price: number;
    max_size: string;
    min_size: string;
    min_rooms: number;
    max_rooms: number;
    gender: string;
    age: string;
    status: string;
    radius: string;
    system_message: string;
}

export interface IUser {
    username: string
    password: string
}



export interface IBotConfigProps {
    title: string;
    apikey: string;
    email: string;
    password: string;
    end_date: string;
    search_interval: number;
    platform: Platform;
    create_date: string;
    location: string;
    max_price: number;
    max_size: string;
    min_size: string;
    min_rooms: number;
    max_rooms: number;
    gender: string;
    age: number;
    status: string;
    radius: string;
    system_message: string;
} 