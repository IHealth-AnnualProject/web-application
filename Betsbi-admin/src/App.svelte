<script>
	export var name;
    import { navigate } from "svelte-routing";
	import {Router,Link,Route} from "svelte-routing";
	import NavBar from './Navbar.svelte'
	import Connection from './Connection.svelte'
	import Home from './routes/Home.svelte'
	import Footer from './Footer.svelte'
	import { FetchUtils }from './utils/fetch_utils.js'
	var FU = new FetchUtils(process.env.API_URL,"");
</script>
<NavBar></NavBar>
<Router>
    <Route path="/"> <Connection FU={FU}></Connection></Route>
    <Route path="/Home" component ={Home} />
</Router>

<Footer></Footer>
<style>
    @font-face { font-family: Betsbi-font; src: url('/resources/PoetsenOne-Regular.ttf'); }
</style>