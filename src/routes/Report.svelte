<script>
    import NavBar from '../component/NavBar.svelte'
    import {Table} from 'sveltestrap';
    import { onMount } from 'svelte';

    export let FU;
    export let coucou = "coucou";
    let reports = [];

    export const formatDateWithHour = (date) => {
           return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
         };

    onMount(async () => {
        		reports = await FU.get('/report');
        		console.log(reports);
        	});

</script>
<NavBar FU={FU}></NavBar>

<div class="table-error"><Table>
       <thead>
       <tr>
         <th>#</th>
         <th>Titre de l'érreur</th>
         <th>Date</th>
         <th>Etats</th>
       </tr>
       </thead>
       <tbody>
       {#each reports as {name,created,state }, i}
       		  <tr>
                 <th scope="row">1</th>
                 <td>{reports[i].name}</td>
                 <td>{formatDateWithHour(new Date(reports[i].created))}</td>
               </tr>
       	{/each}

       </tbody>
     </Table></div>


<style>
    .table-error{
        width: 80%;
        padding-left: 25%;
        padding-top: 2%;
    }
    .bluerr{
    color:green;
    }

    .redrr{
        color:red;
        }


</style>