<script>
    import NavBar from '../component/NavBar.svelte'
    export let FU;
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    let reports =[];
    import {Table,TabContent,TabPane,Modal,ModalHeader,ModalFooter,ModalBody,ToastBody,ToastHeader,Toast,Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
    import queryString from "query-string";
    let report = {created:"",username:"",name:"",description:"",email:"",to:"",from:""};

    let open = false;
    const toggle = () => (open = !open);
    async function update (){
        let queryParams = queryString.parse(window.location.search);
        let id = queryParams.id;
        report = await FU.get('/report/'+id);
        reports = await FU.get('/report/'+report.to.id+'/reported');
        console.log(report);
        report.created = formatDateWithHour(new Date(report.created));
        report.to.created = formatDateWithHour(new Date(report.to.created));
        report.from.created = formatDateWithHour(new Date(report.from.created));
       }

        export const formatDateWithHour = (date) => {
                   return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
                 };

          onMount(async () => {
                        await update()

                	});


               function navigate_one_report(id){
                              console.log("hehoo")
                              navigate('/report/?id='+id)
                              update();
                          }


              async function ban(){
                      toggle();
                      //await FU.post('/auth/validatePsy/'+report.id);
                      navigate("/reports");
                  }

</script>
<NavBar FU={FU}></NavBar>
<div class="left-div">
<div class="main-div">
<div class="p-3 bg-success mb-3 toasted">
    <Toast class="mr-1 profile-display">
      <ToastHeader>
        Auteur du signalement
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
               Utilisateur signalé
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
     <Card class="mb-3" style="width: 80%;">
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
</div>
<div class="table-error">
<h1 class="tab-title">Autre signalement : </h1>
<Table>
       <thead>
       <tr>
         <th>Titre du rapport</th>
         <th>Date</th>
         <th>Utilisateur signalé</th>
       </tr>
       </thead>
       <tbody class="tableau-hover">
       {#each reports as {name,created,state }, i}
       {#if reports[i].id !== report.id}
       		   <tr on:click={ () => navigate_one_report(reports[i].id)}>
                 <td>{reports[i].name}</td>
                 <td>{formatDateWithHour(new Date(reports[i].created))}</td>
                 <td>{reports[i].to.username}</td>
               </tr>
        {/if}
       	{/each}

       </tbody>
     </Table>
     </div>






</div>



<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Modal title</ModalHeader>
    <ModalBody>
     Etes-vous sûr de vouloir ban {report.to.username} ?
    </ModalBody>
    <ModalFooter>
          <Button color="primary" on:click={ban}>
            Oui
          </Button>
          <Button color="secondary" on:click={toggle}>
            Retour
          </Button>
    </ModalFooter>
  </Modal>
<div class="right-div">

</div>

<style>

.main-div {
    width:50%;
    display: inline-block;
}
.toasted{
    min-width: 300PX;
    display: inline-block;
    color:black;
}

.profile-display{

}

  .tableau-hover tr:hover {
      background-color: #f5f5f5;
    }


.left-div {
    padding: 2%;
    margin-left: 10%
}

.table-error {
    display: inline-block;
    min-width: 40%;
    min-height:400px;

}

.toast

.tab-title {
    display: table;
    padding-bottom: 2%;
}
</style>

