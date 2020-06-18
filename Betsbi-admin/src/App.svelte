<script>
	export var name;
    import { navigate } from "svelte-routing";
	import {Router,Link,Route} from "svelte-routing";
	import NavBar from './Navbar.svelte'
	import Connection from './Connection.svelte'
	import Home from './routes/Home.svelte'
	import Footer from './Footer.svelte'
	import { FetchUtils }from './utils/fetch_utils.js'
	var FU = new FetchUtils("E","");
</script>
<NavBar></NavBar>
<Connection FU={FU}></Connection>
<Footer></Footer>
<style>

</style>