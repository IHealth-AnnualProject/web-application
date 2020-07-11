
<script>
    import { writable, readable, derived } from 'svelte-persistent-store/dist/session';
    import { navigate } from "svelte-routing";
    //import Home from "../routes/Home.svelte";
    import { Nav, NavItem, NavLink } from 'sveltestrap';
    let login;
    let password;
    let error;
    let errordisplay = false;
    export let FU;
	async function Login() {
	        if(!login || !password){
	            error="Le nom d'utilisateur ou le mot de passe est manquant";
                errordisplay = true;
                return;
	        }
            let res = await FU.post('/auth/login',{username:login,password:password});
	        if(!res.ok){
	            errordisplay = true;
	            if(res.status===400)error = "Nom de compte ou mot de passe erroné";
                else if(res.status===404)error = "Connexion impossible avec le serveur";
                return;
	        }else{
	           res.json().then(function(json) {
	                                        FU.setToken(json.token.access_token);
	                                        //token = json.token.access_token;
	                                        FU.user = json.user;
                                            navigate("/home", { replace: true });
                                          });
	        }
            errordisplay = false;
	}

	function reset_password(){
	    navigate('/reset')
	}

</script>

<div class="wrapper fadeInDown">
        <div class="main">
           <div class="col-md-6 col-sm-12">
              <div class="login-form">
                 <form>
                    <div class="form-group">
                       <label>User Name</label>
                       <input bind:value={login} type="text" class="form-control" placeholder="User Name">
                    </div>
                    <div class="form-group">
                       <label>Password</label>
                       <input bind:value={password} type="password" class="form-control" placeholder="Password">
                    </div>
                    <button  type="button" class="btn btn-black" on:click="{Login}" >Login</button>
                    <NavLink href="#" on:click={()=> reset_password(login)} style="display:inline-block;">Mot de passe oublié?</NavLink>
                    {#if errordisplay}
                      <div class ="error">{error}</div>
                    {/if}
                 </form>
              </div>
           </div>
</div>
</div>
<style>
body {
    font-family: "Lato", sans-serif;
}

.main {
    padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

}

@media screen and (min-width: 768px){
    .main{
        margin-left: 45%;
    }
}


.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: rgb(255, 195, 1) !important;
    color: #fff;
}

.login-form{
    padding-top:30%;
    width:40%;
    max-width:500px;

}
.error{
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    border-radius: .25rem;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
}
</style>