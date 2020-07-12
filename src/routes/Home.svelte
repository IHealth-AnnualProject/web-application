<script>
    import NavBar from '../component/NavBar.svelte'
    import LastComponent from '../component/LastComponent.svelte'
    import { onMount } from 'svelte';

    export let FU;

    import {Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
</script>

<NavBar FU={FU}></NavBar>
<div>
<h1>Dernières nouveautés </h1>
</div>
<div class="valid">
<LastComponent FU={FU} type="VALID"></LastComponent>
</div>
<div class="valid">
<LastComponent FU={FU} type="ERROR"></LastComponent>
</div>
<div class="valid">
<LastComponent FU={FU} type="REPORT"></LastComponent>
</div>

<style>
    .valid{
        width:32%;
        display: inline-block;
        padding:2%
    }
</style>