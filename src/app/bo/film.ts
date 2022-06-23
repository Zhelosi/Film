export class Film{
    public Rated:string;
    public Released:string;
    public Runtime:string;
    public Genre:string;
    public Director:string;
    public Writer:string;
    public Plot:string;
    public Language:string;
    public Country:string;
    public Awards:string;
    public Ratings:string;
    public imdbRating:string;
    // 3 constructeurs
    constructor(public Title:string, public Year:string, public imdbID:string, public Type:string, public Poster:string, public Fav:boolean=false){
      //  this.name =name;
      //  this.status = status;
    }
}