<script async>
	import { onMount } from 'svelte';
	export var token;
    import { navigate } from "svelte-routing";
	import {Router,Link,Route} from "svelte-routing";
	import NavBar from './Navbar.svelte'
	import Connection from './Connection.svelte'
	import Home from './routes/Home.svelte'
	import Footer from './Footer.svelte'
	import { FetchUtils }from './utils/fetch_utils.js'
	let FU = new FetchUtils(process.env.API_URL,"");

	onMount(async () => {
    			let isTokenValid = await FU.is_token_valid();
    			 console.log(isTokenValid);
                        	if(!isTokenValid){
                                navigate("/", { replace: true });
                        	}else{
                        	    navigate("/home", { replace: true });
                        	}
    	});
</script>
<NavBar></NavBar>
<Router>
    <Route path="/"> <Connection FU={FU}></Connection></Route>
    <Route path="/home" component ={Home} />
</Router>

<Footer></Footer>
<style>
    @font-face { font-family: Betsbi-font; src: url('/resources/PoetsenOne-Regular.ttf'); }
</style>