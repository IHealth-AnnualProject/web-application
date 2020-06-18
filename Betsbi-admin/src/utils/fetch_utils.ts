export class FetchUtils{

    constructor(private readonly API_URL: string,private token:string) {}

    async get(route:string){
        let myHeaders = new Headers();

        let myInit = { method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            };
        fetch(route).then(function(response) {
            return response.blob();
        })
    }

    async post(route:string,data:string){
        let request = this.API_URL+route;
        fetch(request, {
            method: "POST",
            body: data
        })
    }


}