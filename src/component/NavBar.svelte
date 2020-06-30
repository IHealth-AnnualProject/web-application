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
</script>
   <div class="nav">
      <ul>
        <li class="Accueil"><a class="active">Home</a></li>
        <li class="Erreur"><a >Erreurs</a></li>
        <li class="Disconnect" on:click="{Disconnect}"><a>Disconnect</a></li>
      </ul>
    </div>
<style>
body {
  margin: 0;
  padding: 0;
  background: #ccc;
}

.nav ul {
  list-style: none;
  background-color:rgb(255, 195, 1);;
  text-align: center;
  padding: 0;
  margin: 0;
}
.nav li {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #888;
}

.nav a {
  text-decoration: none;
  color: #444;
  display: block;
  transition: .3s background-color;
}

.nav a:hover {
  background-color: #005f5f;
   color: #fff;
}

.nav a.active {
  background-color: #fff;
  color: #444;
  cursor: default;
}

@media screen and (min-width: 600px) {
  .nav li {
    width: 120px;
    border-bottom: none;
    height: 50px;
    line-height: 50px;
    font-size: 1.4em;
  }

  /* Option 1 - Display Inline */
  .nav li {
    display: inline-block;
    margin-right: -4px;
  }

}

</style>
