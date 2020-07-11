<script>
    export let FU;
    export let pass;
    export let confirmPassword;
    export let displayMessage;
    import { Alert } from "sveltestrap";
    let message;
    import {Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
    import { onMount } from 'svelte';
    import queryString from "query-string";
    let queryParams = queryString.parse(window.location.search);
    let id = queryParams.id;
    let error =false;
    onMount(async () => {
            let response = await FU.post('/auth/checkTokenReset/',{token:id});
            if(!response.ok){
               error = true;
            }
    });

    async function  changePassword(){
        if(pass===confirmPassword){
             let responseChange = await FU.post('/auth/changePassword/',{token:id,newPassword:pass});
             if(responseChange.ok){
                 console.log("blabla");
                 message= "Votre mot de passe à été changé";
             }
        }
    }

</script>
    <div class="form-group">
                {#if !error}
                       <label>Mot de passe</label>
                       <input bind:value={pass} type="password" class="form-control" placeholder="Mot de passe">
                       <br>
                       <input bind:value={confirmPassword} type="password" class="form-control" placeholder="Mot de passe">
                       <button  type="button" class="btn btn-black" on:click="{changePassword}" >Envoyer</button>
                       {#if displayMessage}
                          <Alert {color}>
                            {message}
                          </Alert>
                        {/if}
                {:else}
                <Card>
                  <CardBody>Le lien pour changer de mot de passe a expiré veuillez réitérer votre demande.</CardBody>
                </Card>
                {/if}
    </div>
<style>

.form-group{
    font-size:30px;
    padding-top: 7%;
    padding-left: 35%;
    width: 70%;
}

.btn-black{
    background-color: rgb(255, 195, 1) !important;
    color: #fff;
}
</style>