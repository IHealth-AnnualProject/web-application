<script>
    import NavBar from '../component/NavBar.svelte'
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import {
        Table, 
        CustomInput,
        Button, 
        Modal, 
        ModalBody, 
        ModalFooter, 
        ModalHeader, 
        FormGroup,
        Label
    } from "sveltestrap";
    let open = false;
    const toggle = () => (open = !open);

    export let FU;
    let music = [];

    function navigate_one_music(id) {
        navigate('/music/?id='+id)
    }

    function str_pad_left(string, pad, length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }

    onMount(async () => {
        music = await FU.get('/music');
        var i;
        for (i = 0; i < music.length; i++) {
            var minutes = Math.floor(music[i].duration / 60);
            var seconds = music[i].duration - minutes * 60;
            var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
            music[i].duration = finalTime;
        }

        console.log(music);
    });
</script>

<NavBar FU={FU}></NavBar>
<div>
<p>Musique en ligne</p>
</div>

<div class="center">
  <Button block color="primary" on:click={toggle}>
    Ajouter une nouvelle musique
  </Button>
  <Modal class="center" isOpen={open} {toggle}>
    <ModalHeader {toggle}>Ajout de musique</ModalHeader>
    <ModalBody>
        <FormGroup>
            <Label for="fileBrowser">Sélectionnez un fichier</Label>
            <CustomInput
            type="file"
            id="fileBrowser"
            name="customFile"
            label="Aucun fichier choisi" />
        </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggle}>
        Ajouter
      </Button>
      <Button color="secondary" on:click={toggle}>
        Annuler
      </Button>
    </ModalFooter>
  </Modal>
</div>

<div class="table-error">
    <Table>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Duration</th>
            </tr>
        </thead>

        <tbody class="tableau-hover">
        {#each music as { id, name, duration }, i}
            <tr on:click={ () => navigate_one_music(music[i].id)}>
                <td>{music[i].name}</td>
                <td>{music[i].duration}</td>
            </tr>
       	{/each}
       </tbody>
    </Table>
</div>


<style>
    .table-error{
        width: 75%;
        padding-left: 25%;
        padding-top: 2%;
    }

    .tableau-hover tr:hover {
        background-color: #f5f5f5;
    }

	p {
		color: rgb(38, 85, 214);
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}

    .center {
        margin: auto;
        width: 40%;
        padding: 20px;
    }
</style>