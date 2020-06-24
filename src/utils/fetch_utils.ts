import { local } from 'svelte-persistent-store';
const { writable, readable, derived } = local;

export class FetchUtils{

    constructor(private readonly API_URL: string,private token,user,private store,private tokenstore) {
        this.token = localStorage.getItem("token") || "";
        this.store =  localStorage.getItem("token");
    }

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

    async is_token_valid(){
        let request = 'http://'+this.API_URL+'/auth/is-token-valid';
        console.log(this.token);
        return fetch(request).then(function(response) {
            return response.ok;
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

    setToken(token:string){
        console.log("setToken");
        console.log(token);
        localStorage.setItem("token", token);
        this.token=token;
    }


}