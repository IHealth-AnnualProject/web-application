<script>
	import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
	import {Router,Link,Route} from "svelte-routing";
	import Header from './component/Header.svelte'
	import Connection from './component/Connection.svelte'
	import Home from './routes/Home.svelte'
    import Erreurs from './routes/Erreurs.svelte'
    import OneErreur from './routes/OneErreur.svelte'

	import Footer from './component/Footer.svelte';
	import Validation from './routes/Validation.svelte';
	import Report from './routes/Report.svelte';
	import queryString from "query-string";

	import { FetchUtils }from './utils/fetch_utils.js';
	let FU = new FetchUtils(process.env.API_URL,"");
    export let location;
	onMount(async () => {
    			let isTokenValid = await FU.is_token_valid();
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
    <Route path="/error"><OneErreur FU={FU} let:location></OneErreur></Route>
    <Route path="/reports"><Report FU={FU}></Report></Route>
    <Route path="/validations"><Validation FU={FU}></Validation></Route>
</Router>

<Footer></Footer>
<style>
    @font-face { font-family: Betsbi-font; src: url('/resources/PoetsenOne-Regular.ttf'); }
</style>