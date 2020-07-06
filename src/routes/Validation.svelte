<script>
    import NavBar from '../component/NavBar.svelte'
    import {Table} from 'sveltestrap';
    import { onMount } from 'svelte';

    export let FU;
    export let coucou = "coucou";
    let validations = [];

    export const formatDateWithHour = (date) => {
           return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
         };

    onMount(async () => {
        		validations = await FU.get('/auth/valid');
        		console.log(validations);
        	});

</script>
<NavBar FU={FU}></NavBar>

<div class="table-error"><Table>
       <thead>
       <tr>
         <th>Pseudo</th>
         <th>Email</th>
         <th>Date</th>
       </tr>
       </thead>
       <tbody class="tableau-hover">
       {#each validations as {name,created,state }, i}
       		  <tr>
                 <td>{validations[i].username}</td>
                 <td>{validations[i].email}</td>
                 <td>{formatDateWithHour(new Date(validations[i].created))}</td>
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