<script>
    import NavBar from '../component/NavBar.svelte'
    export let FU;
    import { onMount } from 'svelte';

    import {ToastBody,ToastHeader,Toast,Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
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

<style>

.main-div {
    width: 70%;
    padding: 2%;
}
.toasted{
    width: 40%;
    display: inline-block;
    color:black;
}

.profile-display{

}
</style>

