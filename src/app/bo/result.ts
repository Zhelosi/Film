import { Film } from './film';
export class Result{
    constructor(public Response:string, public Search:Film[], public totalResults:string){
        
    }
}