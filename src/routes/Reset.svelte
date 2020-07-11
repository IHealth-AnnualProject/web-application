<script>
    export let FU;
    export let login;
    let displayMessage = false;
    import { Alert } from "sveltestrap";
    let okmessage ="Un email à été envoyé au compte associé.";
    let komessage ="Veuillez rentrer un nom d'utilisateur";
    let message;
    let color;
    function reset_password(){
         color="success";
         message = okmessage;
        if(login ==="" || !login){
            displayMessage = true;
            color="danger";
            message = komessage;
            return
        }
        FU.post('/auth/resetPassword',{"username":login});
        displayMessage = true
    }
</script>
    <div class="form-group">
                       <label>User Name</label>
                       <input bind:value={login} type="text" class="form-control" placeholder="User Name">
                       <button  type="button" class="btn btn-black" on:click="{reset_password}" >Envoyer</button>
                       {#if displayMessage}
                          <Alert {color}>
                            {message}
                          </Alert>
                        {/if}
    </div>

<style>

.form-group{
    padding-top: 10%;
    padding-left: 40%;
    width: 55%;
}

.btn-black{
    background-color: rgb(255, 195, 1) !important;
    color: #fff;
}
</style>