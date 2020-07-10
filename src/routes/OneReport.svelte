<script>
    import NavBar from '../component/NavBar.svelte'
    export let FU;
    import { onMount } from 'svelte';

    import {Modal,ModalHeader,ModalFooter,ModalBody,ToastBody,ToastHeader,Toast,Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
    import queryString from "query-string";
    let report = {created:"",username:"",name:"",description:"",email:"",to:"",from:""};
    let queryParams = queryString.parse(window.location.search);
    let open = false;
    const toggle = () => (open = !open);

        export const formatDateWithHour = (date) => {
                   return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
                 };
    let id = queryParams.id;
          onMount(async () => {
                		report = await FU.get('/report/'+id);
                		console.log(report);
                		report.created = formatDateWithHour(new Date(report.created));

                		report.to.created = formatDateWithHour(new Date(report.to.created));
                		report.from.created = formatDateWithHour(new Date(report.from.created));
                	});

</script>
<NavBar FU={FU}></NavBar>
<div class="main-div">
<div class="p-3 bg-success mb-3 toasted">
    <Toast class="mr-1 profile-display">
      <ToastHeader>
        Sveltestrap
      </ToastHeader>
      <ToastBody>
        {report.from.username}
        <br>
        {#if report.from.isPsy}
        Psychologue
        {:else}
        Utilisateur basique
        {/if}
        <br>
        {report.from.created}
      </ToastBody>
    </Toast>
    </div>

<div class="p-3 bg-danger mb-3 toasted">
    <Toast class="mr-1 profile-display">
      <ToastHeader>
        Sveltestrap
      </ToastHeader>
           <ToastBody>
             {report.to.username}
             <br>
             {#if report.to.isPsy}
             Psychologue
             {:else}
             Utilisateur basique
             {/if}
             <br>
             {report.to.created}
           </ToastBody>
    </Toast>
    </div>
</div>


 <Card class="mb-3" style="width: 60%;margin-left: 20%;">
   <CardHeader>
      <CardSubtitle style = "font-size: 40px;">{report.name}</CardSubtitle>
   </CardHeader>
   <CardBody>
     <CardText>
      {report.description}
     </CardText>
     <Button on:click="{toggle}" color = "danger">Ban</Button>
   </CardBody>
   <CardFooter>{report.created}</CardFooter>
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

.main-div {
    width: 70%;
    padding: 2%;
    margin-left: 20%;
}
.toasted{
    width: 40%;
    display: inline-block;
    color:black;
}

.profile-display{

}
</style>

