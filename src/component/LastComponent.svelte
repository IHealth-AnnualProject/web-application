 <script>
     import {Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
     import { navigate } from "svelte-routing";
     import { onMount } from 'svelte';
     export let type;
     export let FU;

     export const formatDateWithHour = (date) => {
       return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
     };

     let data = {created:"",username:"",name:"",description:"",email:""};
         onMount(async () => {
                    if(type==="ERROR"){
                        data = await FU.get('/error/getLast');
                           if(data.created !==""){
                                                    data.created = formatDateWithHour(new Date(data.created));
                                                }
                    }else if(type==="VALID"){
                          data = await FU.get('/auth/getLast');
                          if(data.created !==""){
                                                data.created = formatDateWithHour(new Date(data.created));
                                                }
                    }else if(type==="REPORT"){
                        data = await FU.get('/report/getLast');
                        if(data.created !==""){
                            data.created = formatDateWithHour(new Date(data.created));
                        }
                    }

             });
         function go_to(url){
             navigate(url)
         }
 </script>


{#if type === "VALID"}
 <Card class="mb-3">
   <CardHeader>
     <Card body color="primary" inverse class="mb-3">Validation</Card>
   </CardHeader>
   <CardBody>
     <CardSubtitle>{data.username}</CardSubtitle>
     <CardText>
     {#if data.id === undefined}
        Aucune nouvelle demande de validation
     {:else}
       Vous pouvez rentrer en contact avec l'utilisateur via cet email : {data.email}
     {/if}
     </CardText>
     <Button disabled='{data.id === undefined}' on:click={()=> go_to("/validation/?id="+data.id)} >Voir plus</Button>
   </CardBody>
   <CardFooter>{data.created}</CardFooter>
 </Card>
{:else if type === "ERROR"}
 <Card class="mb-3">
   <CardHeader>
     <Card body color="warning" class="mb-3">Erreur</Card>
   </CardHeader>
   <CardBody>
     <CardSubtitle>{data.name}</CardSubtitle>
     <CardText>
          {#if data.id === undefined}
             Aucune nouvelle erreur
          {:else}
            {data.description}
          {/if}
     </CardText>
          <Button disabled='{data.id === undefined}' on:click={()=> go_to("/error/?id="+data.id)} >Voir plus</Button>
   </CardBody>
   <CardFooter>{data.created}</CardFooter>
 </Card>
{:else if type === "REPORT"}
 <Card class="mb-3">
   <CardHeader>
     <Card body color="danger" class="mb-3">Report</Card>
   </CardHeader>
   <CardBody>
     <CardSubtitle>{data.name}</CardSubtitle>
     <CardText>
        {#if data.id === undefined}
           Aucune nouveau report
                     {:else}
                    {data.description}
                    {/if}
     </CardText>
     <Button disabled='{data.id === undefined}' on:click={()=> go_to("/report/?id="+data.id)} >Voir plus</Button>
   </CardBody>
   <CardFooter>{data.created}</CardFooter>
 </Card>

{/if}