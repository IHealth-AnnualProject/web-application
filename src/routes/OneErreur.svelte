<script>
    import NavBar from '../component/NavBar.svelte'
    import {Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';

    export let FU;
    export let location;
    import queryString from "query-string";
    let data = {created:"",username:"",name:"",description:"",email:""};
    let queryParams = queryString.parse(window.location.search);
    data = JSON.parse(queryParams.token);

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
                 <CardSubtitle style="color :red">{data.state}</CardSubtitle>
                 {:else}
                  <CardSubtitle style="color :green">{data.state}</CardSubtitle>
                 {/if}
   </CardHeader>
   <CardBody>
     <CardText>
      {data.description}
     </CardText>
     {#if data.state === "PENDING"}
     <Button on:click="{resolve_error}">Resoudre</Button>
     {:else}
     <Button on:click="{reopen_error}" color ="danger">Reopen</Button>
      {/if}
   </CardBody>
   <CardFooter>{data.created}</CardFooter>
 </Card>

<style>


</style>