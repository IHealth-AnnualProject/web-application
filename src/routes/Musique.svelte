<script>
    import NavBar from '../component/NavBar.svelte'
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import {
        Table,
        Badge,
        CustomInput,
        Button, 
        Modal, 
        ModalBody, 
        ModalFooter, 
        ModalHeader, 
        FormGroup,
        Label,
        Input,
        Pagination, 
        PaginationItem, 
        PaginationLink
    } from "sveltestrap";

    let open = false;
    const toggle = () => (open = !open);

    export let FU;
    let music = [];
    let files;
    let musicName = "";

    function str_pad_left(string, pad, length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }

    function upload_music(id) {
        FU.upload_music(files, musicName).then(function(){
            update();
        });
        console.log(files);
        toggle();
    }

    async function delete_music(id) {
        await FU.delete("/music/" + id);
        await update();
    }

    async function update() {
        music = await FU.get('/music');
        var i;
        for (i = 0; i < music.length; i++) {
            var minutes = Math.floor(music[i].duration / 60);
            var seconds = music[i].duration - minutes * 60;
            var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
            music[i].duration = finalTime;
        }

        console.log(music);
    }


    onMount(async () => {
        await update();
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
            <Input bind:files type="file" name="file" id="exampleFile" />
            <Label>Nom de la musique</Label>
            <Input bind:value={musicName} type="textarea" name="text" id="exampleText" />
        </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={upload_music}>
        Ajouter
      </Button>
      <Button color="secondary" on:click={toggle}>
        Annuler
      </Button>
    </ModalFooter>
  </Modal>
</div>

<div class="music-table">
    <Table>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Duration</th>
                <th></th>
            </tr>
        </thead>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

        <tbody class="tableau-hover">
        {#each music as { id, name, duration }, i}
            <tr>
                <td>{music[i].name}</td>
                <td>
                    {music[i].duration}
                    <!--<a href="#">-</a>-->
                </td>
                <td>
                    <div class="center" on:click={ async () => await delete_music(music[i].id)}>
                        <button type="button" class="btn btn-default btn-sm">
                            <span class="glyphicon glyphicon-trash"></span>
                        </button>
                    </div>
                </td>
            </tr>
       	{/each}
       </tbody>
    </Table>
</div>


<div class="pagination">
    <Pagination ariaLabel="Page navigation example">
        <PaginationItem disabled>
            <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem disabled>
            <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
            <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink last href="#" />
        </PaginationItem>
    </Pagination>
</div>


<style>
    .music-table{
        width: 75%;
        padding-left: 25%;
        padding-top: 2%;
        margin-bottom: 0%
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

    .pagination {
        margin: auto;
        margin-left: 43%;
        width: 40%;
        padding: 20px;
    }
</style>