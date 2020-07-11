<script>
    import NavBar from '../component/NavBar.svelte'
    import {Modal,ModalBody,ModalFooter,ModalHeader,Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
    import { onMount } from 'svelte';

    export let FU;
    import queryString from "query-string";
    let data = {created:"",username:"",name:"",description:"",email:""};
    let queryParams = queryString.parse(window.location.search);
    let open = false;
    const toggle = () => (open = !open);
    let id = queryParams.id;

        onMount(async () => {
                		data = await FU.get('/error/'+id);
                		console.log(data);
                		data.created = formatDateWithHour(new Date(data.created));
                	});


    async function resolve_or_reopen(){
            toggle();
            if(data.state==="PENDING"){
                await resolve_error();
            }else{
                await reopen_error();
            }
        }



    async function resolve_error(){
       await FU.post('/error/'+data.id+"/validate");
    }
        async function reopen_error(){
           await FU.post('/error/'+data.id+"/pending");
        }
        export const formatDateWithHour = (date) => {
               return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
             };
    data.created = formatDateWithHour(new Date(data.created));
</script>
<NavBar FU={FU}></NavBar>

 <Card class="mb-3" style="width: 60%;margin-left: 20%;">
   <CardHeader>
      <CardSubtitle style = "font-size: 40px;">{data.name}</CardSubtitle>
                 {#if data.state === "PENDING"}
                 <CardSubtitle style="color :red" >En attente</CardSubtitle>
                 {:else}
                  <CardSubtitle style="color :green">Resolu</CardSubtitle>
                 {/if}
   </CardHeader>
   <CardBody>
     <CardText>
      {data.description}
     </CardText>
     {#if data.state === "PENDING"}
     <Button on:click="{toggle}" color = "success">Resoudre</Button>
     {:else}
     <Button  on:click="{toggle}" color ="danger" >Reopen</Button>
      {/if}
   </CardBody>
   <CardFooter>{data.created}</CardFooter>
 </Card>

<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Modal title</ModalHeader>
    <ModalBody>
     Etes-vous sûr de vouloir {#if data.state === "PENDING"}valider
                                               {:else}
                                                reouvrir
                                               {/if}
      cette erreur ?
    </ModalBody>
    <ModalFooter>
          <Button color="primary" on:click={resolve_or_reopen}>
            Oui
          </Button>
          <Button color="secondary" on:click={toggle}>
            Retour
          </Button>
    </ModalFooter>
  </Modal>

<style>


</style>