<script>
    import NavBar from '../component/NavBar.svelte'
    export let FU;
    import { onMount } from 'svelte';

    import {ToastBody,ToastHeader,Toast,Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
    import queryString from "query-string";
    let report = {created:"",username:"",name:"",description:"",email:"",to:"",from:""}
    let queryParams = queryString.parse(window.location.search);
    let open = false;
    const toggle = () => (open = !open);
    let id = queryParams.id;
          onMount(async () => {
                		report = await FU.get('/report/'+id);
                		console.log(report);
                	});

</script>
<NavBar FU={FU}></NavBar>
<div class="p-3 bg-success mb-3">
    <Toast class="mr-1">
      <ToastHeader>
        Sveltestrap
      </ToastHeader>
      <ToastBody>
        This is a toast on a  background  check it out!
      </ToastBody>
    </Toast>
    </div>

<div class="p-3 bg-danger mb-3">
    <Toast class="mr-1">
      <ToastHeader>
        Sveltestrap
      </ToastHeader>
      <ToastBody>
        This is a toast on a background  check it out!
      </ToastBody>
    </Toast>
    </div>