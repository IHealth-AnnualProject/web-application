<script>
    import NavBar from '../component/NavBar.svelte'
    export let FU;
    export let coucou = "coucou"
</script>

<NavBar FU={FU}></NavBar>


    <div class="last-error">
            <div class="title-error"><label class = "label-titre">Titre :</label><label class="title-value">value</label></div>
            <div class="users"><label class = "label-value">Auteur :</label><label class="title-value">Report:</label></div>
    </div>

<style>
   .last-error{
       width: 50%;
       margin-left: 30%;
       margin-top: 9%;
   }
    .title-value{
     display: inline;
    }
    .label-titre{
           display: inline;
    }
    .last-error{
        background: #f5f5f5;
    }
</style>