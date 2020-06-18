
<script>
    let login;
    let password;
    let error;
    let errordisplay = false;
    export let FU;
	function Login() {
	        if(!login || !password){
	            error="Le nom d'utilisateur ou le mot de passe est manquant";
                errordisplay = true;
                return;
	        }
            FU.get();
            errordisplay = false;
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
                    <button type="submit" class="btn btn-secondary">Register</button>
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
        margin-left: 35%;
    }
}


.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: rgb(116, 113, 1) !important;
    color: #fff;
}

.login-form{
    padding-top:10%;
    width:40%
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