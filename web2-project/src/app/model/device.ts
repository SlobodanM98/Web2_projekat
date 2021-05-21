export enum DeviceType{
	Prekidac,
	Osigurac,
	Transformator,
	Diskonektor

}

export class Device {
	
	public Type:DeviceType;
	public ID:string;
	public Name:string;
	public Address:string;
	public LongCoord:number;
	public LatCoord:number;
	
	constructor(type:DeviceType, id:string, name:string, addr:string, longcoord:number, latcoord:number)
	{
		this.Type = type;
		this.ID = id;
		this.Name = name;
		this.Address = addr;
		this.LongCoord = longcoord;
		this.LatCoord = latcoord;
	}


}