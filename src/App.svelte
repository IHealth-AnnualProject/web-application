<script>
	import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
	import {Router,Link,Route} from "svelte-routing";
	import Header from './component/Header.svelte'
	import Connection from './component/Connection.svelte'
	import Home from './routes/Home.svelte'
    import Erreurs from './routes/Erreurs.svelte'
	import Footer from './component/Footer.svelte'
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
<Header></Header>
<Router>
    <Route path="/"> <Connection FU={FU}></Connection></Route>
    <Route path="/home"><Home FU={FU}></Home></Route>
    <Route path="/errors"><Erreurs FU={FU}></Erreurs></Route>
</Router>

<Footer></Footer>
<style>
    @font-face { font-family: Betsbi-font; src: url('/resources/PoetsenOne-Regular.ttf'); }
</style>