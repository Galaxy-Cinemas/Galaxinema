export interface ResponseObject{
    data:IFunction; 
}

export interface IFunction {

    FunctionId?:number,
    MovieId?:number,
    Price?:number,
    FunctionDate?:string,
    Room?:number,
    NumberOfSeats?:number,
}

// public DateTime FunctionDate { get; set; }
