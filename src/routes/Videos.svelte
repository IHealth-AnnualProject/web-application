<script>
    import NavBar from '../component/NavBar.svelte'
    import {Table} from 'sveltestrap';
    import { onMount } from 'svelte';
    import { Button } from "sveltestrap";

    export let FU;

    import { FormGroup, Input, Label } from 'sveltestrap';
    import { ListGroup, ListGroupItem } from 'sveltestrap';

    const colors = [
        "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"
    ];

    let inputValue = '';

    function create_intent(){
        console.log("JR Keeperrr")
    }
</script>

<NavBar FU={FU}></NavBar>

<div class="chatbot-form">
    <FormGroup>
    <Label>Nom de l'intention :</Label>
    <Input type="text" bind:value={inputValue} />
    <Button block>Créer intention</Button>
    </FormGroup>
</div>


<style>
    .chatbot-form {
        width: 80%;
        padding-left: 25%;
        padding-top: 2%;
    }
</style>