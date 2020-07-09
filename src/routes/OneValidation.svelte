<script>
    import NavBar from '../component/NavBar.svelte'
    import {Toast,ToastHeader,ToastBody,Modal,ModalBody,ModalFooter,ModalHeader,Jumbotron,Button,Card,CardHeader,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Badge} from 'sveltestrap';
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";


    export let FU;
    import queryString from "query-string";
    let data = {created:"",username:"",name:"",description:"",email:"",to:"",from:""};
    let queryParams = queryString.parse(window.location.search);
    let open = false;
    const toggle = () => (open = !open);
    let id = queryParams.id;

       onMount(async () => {
            		data = await FU.get('/auth/valid/'+id);
            		console.log("tkt");
            		console.log(data);
            	});

    async function validate(){
            toggle();
            await FU.post('/auth/validatePsy/'+data.id);
            navigate("/validations");
        }

    export const formatDateWithHour = (date) => {
               return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours()}h${String(date.getMinutes()).padStart(2, '0')}`
             };
    data.created = formatDateWithHour(new Date(data.created));
</script>
<NavBar FU={FU}></NavBar>

 <Card class="mb-3" style="width: 60%;margin-left: 20%;">
   <CardHeader>
      <CardSubtitle style = "font-size: 40px;">Validation d'un nouveau PSY</CardSubtitle>

   </CardHeader>
   <CardBody>
          <CardSubtitle>{data.username}</CardSubtitle>
          <CardText>
            Vous pouvez rentrer en contact avec l'utilisateur via cet email : {data.email}
          </CardText>
            <Button on:click="{toggle}" color="success">Valider</Button>
        </CardBody>
        <CardFooter>{data.created}</CardFooter>
 </Card>

<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Modal title</ModalHeader>
    <ModalBody>
     Etes-vous sûr de vouloir valider ce psycologue ?
    </ModalBody>
    <ModalFooter>
          <Button color="primary" on:click={validate}>
            Oui
          </Button>
          <Button color="secondary" on:click={toggle}>
            Retour
          </Button>
    </ModalFooter>
  </Modal>
<style>


</style>