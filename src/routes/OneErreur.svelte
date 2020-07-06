<script>
    import NavBar from '../component/NavBar.svelte'
    import {Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
    export let FU;

    export let location;

</script>
<NavBar FU={FU}></NavBar>

{queryParams.error}