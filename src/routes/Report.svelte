<script>
    import NavBar from '../component/NavBar.svelte'
    import {Table} from 'sveltestrap';
    import { onMount } from 'svelte';

    export let FU;
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
         <th>Titre du rapport</th>
         <th>Date</th>
         <th>Utilisateur signalé</th>
       </tr>
       </thead>
       <tbody class="tableau-hover">
       {#each reports as {name,created,state }, i}
       		  <tr >
                 <td>{reports[i].name}</td>
                 <td>{formatDateWithHour(new Date(reports[i].created))}</td>
                 <td>{reports[i].to.username}</td>
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

    .tableau-hover tr:hover {
      background-color: #f5f5f5;
    }

</style>