export class FetchUtils{

    constructor(private readonly API_URL: string,private token:string,user) {}

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
        let request = 'http://'+this.API_URL+route;
        console.log(request);
        return fetch(request, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data),
            mode:'cors'
        }).then(function(response) {
            console.log("blabla")
            return response;
        })
    }


}