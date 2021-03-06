import { local } from 'svelte-persistent-store';
const { writable, readable, derived } = local;


export class FetchUtils{

    constructor(private readonly API_URL: string,private token,user,private store,private payload) {
        this.token = localStorage.getItem("token") || "";
        this.store =  localStorage.getItem("token");
    }

    async get(route:string){
        let request = 'http://'+this.API_URL+route;
        let myInit:any = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.token
            },
            method: 'GET',
            mode: 'cors',
            };
        return fetch(request,myInit).then(function(response) {
            console.log(response);
           return  response.json().then(function(data) {
                return data;
            });
        })
    }

    async is_token_valid(){
        let request = 'http://'+this.API_URL+'/auth/is-token-valid';
        return fetch(request,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.token
            },
            method: "GET",
            mode:'cors'
        }).then(function(response) {
            return response.ok;
        })
    }

    async post(route:string,data:string){
        let request = 'http://'+this.API_URL+route;
        return fetch(request, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.token
            },
            method: "POST",
            body: JSON.stringify(data),
            mode:'cors'
        }).then(function(response) {
            return response;
        })
    }

    async upload_music(file,name){
        let request = 'http://'+this.API_URL+'/music/';
        let formData = new FormData();
        console.log(formData);
        formData.append("name",name);
        formData.append("file", file[0]);
        return fetch(request, {method: "POST",  headers:{
                'Authorization':'Bearer '+this.token
            }, body: formData}).then(function(response) {
            return response;
        });
    }


    async delete(route:string){
        let request = 'http://'+this.API_URL+route;
        return fetch(request, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.token
            },
            method: "DELETE",
            mode:'cors'
        }).then(function(response) {
            return response;
        })
    }


    setToken(token:string){
        localStorage.setItem("token", token);
        this.token=token;
    }

    disconnect(){
        this.setToken("");
    }


}