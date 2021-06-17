import { Address } from "./address";

export enum DeviceType{
	Prekidac,
	Osigurac,
	Transformator,
	Diskonektor
}

export class Device {
	
	public type:DeviceType;
	public id:number;
	public name:string;
	public address:Address;
	public longCoord:number;
	public latCoord:number;
	
	constructor(type:DeviceType, name:string, addr:Address, longcoord:number, latcoord:number)
	{
		this.type = type;
		this.name = name;
		this.address = addr;
		this.longCoord = longcoord;
		this.latCoord = latcoord;
	}
	
}