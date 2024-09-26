export interface ResponseObject{
    data:IMovie; 
}

export interface IMovie {
    filmId?:number,
    title: string,
    description: string,
    director: string,
    genre: string,
    cast: string,
    posterImage: string,
    trailer:string
}
