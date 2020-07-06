<script>
    import NavBar from '../component/NavBar.svelte'
    import {Table} from 'sveltestrap';
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";

    export let FU;
    export let coucou = "coucou";
    let errors = [];

    export const formatDateWithHour = (date) => {
           return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
         };

       function navigate_one_errors(value){
                console.log(value);
                navigate('/error/?token='+JSON.stringify(value))
            }

    onMount(async () => {
        		errors = await FU.get('/error');
        	});

</script>
<NavBar FU={FU}></NavBar>

<div class="table-error"><Table>
       <thead>
       <tr>
         <th>Titre de l'érreur</th>
         <th>Date</th>
         <th>Etats</th>
       </tr>
       </thead>
       <tbody class="tableau-hover">
       {#each errors as {name,created,state }, i}

       		  <tr on:click={ () => navigate_one_errors(errors[i])} >
                 <td>{errors[i].name}</td>
                 <td>{formatDateWithHour(new Date(errors[i].created))}</td>
                 {#if errors[i].state === "PENDING"}
                 <td class="redrr">NON RESOLU</td>
                 {:else}
                 <td class="bluerr">RESOLU</td>
                 {/if}
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