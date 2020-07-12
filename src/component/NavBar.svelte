<script>
    export let FU;
    import { navigate } from "svelte-routing";
    function Disconnect(){
        FU.disconnect();
        navigate("/", { replace: true });
    }
    let error={name:"Harcelement inintérompu",description:"il a été très méchant",
    from:{
        username:"jeane"
    },
    to:{
        username:"john"
    }
    }
    function navigate_home(){
        navigate('/home')
    }
    function navigate_errors(){
            navigate('/errors')
        }
    function navigate_valid(){
                    navigate('/validations')
                }
    function navigate_report(){
            navigate('/reports')
          }
    function navigate_musique(){
            navigate('/musique')
          }
</script>
   <div class="nave">
      <ul>
        <li class="Accueil" ><a href="#" on:click="{navigate_home}">Accueil</a></li>
        <li class="Erreur" ><a href="#" on:click="{navigate_errors}">Erreur</a></li>
        <li class="Erreur" ><a href="#" on:click="{navigate_valid}">Validation</a></li>
        <li class="Erreur" ><a href="#" on:click="{navigate_report}">Signalement</a></li>
        <li class="Erreur" ><a href="#" on:click="{navigate_musique}">Musique</a></li>
        <li class="Disconnect" on:click="{Disconnect}"><a href="#">Deconnexion</a></li>
      </ul>
    </div>
<style>
body {
  margin: 0;
  padding: 0;
  background: #ccc;
}

.nave ul {
  list-style: none;
  background-color:rgb(255, 195, 1);;
  text-align: center;
  padding: 0;
  margin: 0;
}
.nave li {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #888;
}

.nave a {
  text-decoration: none;
  color: #444;
  display: block;
  transition: .3s background-color;
}

.nave a:hover {
  background-color: #005f5f;
   color: #fff;
}

.nave a.active {
  background-color: #fff;
  color: #444;
  cursor: default;
}

@media screen and (min-width: 600px) {
  .nave li {
    width: 120px;
    border-bottom: none;
    height: 50px;
    line-height: 50px;
    font-size: 1.4em;
  }

  /* Option 1 - Display Inline */
  .nave li {
    display: inline-block;
    margin-right: -4px;
  }

}

</style>
