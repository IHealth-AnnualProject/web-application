<script>
	import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
	import {Router,Link,Route} from "svelte-routing";
	import Header from './component/Header.svelte'
	import Connection from './component/Connection.svelte'
	import Reset from './routes/Reset.svelte'
	import Home from './routes/Home.svelte'
    import Erreurs from './routes/Erreurs.svelte'
    import OneErreur from './routes/OneErreur.svelte'
    import OneValidation from './routes/OneValidation.svelte'
    import OneReport from './routes/OneReport.svelte'
	import Footer from './component/Footer.svelte';
	import Validation from './routes/Validation.svelte';
	import Report from './routes/Report.svelte';
	import ChangePassword from './routes/ChangePassword.svelte';
	import Videos from './routes/Videos.svelte';

	import queryString from "query-string";

	import { FetchUtils }from './utils/fetch_utils.js';
	let FU = new FetchUtils(process.env.API_URL,"");
	onMount(async () => {
	            console.log("tamer");
    			let isTokenValid = await FU.is_token_valid();
                        	if(!isTokenValid){
                        	    if(window.location.href.lastIndexOf('/changePass/') !== -1){
                        	        return
                        	    }
                                navigate("/", { replace: true });
                        	}else{
                        	    navigate("/home", { replace: true });
                        	}
    	});
</script>
<Header></Header>
<div style="height:66%;">
<Router>
    <Route path="/"> <Connection FU={FU}></Connection></Route>
    <Route path="/home"><Home FU={FU}></Home></Route>
    <Route path="/errors"><Erreurs FU={FU}></Erreurs></Route>
    <Route path="/error"><OneErreur FU={FU} let:location></OneErreur></Route>
    <Route path="/validation"><OneValidation FU={FU}></OneValidation></Route>
    <Route path="/reports"><Report FU={FU}></Report></Route>
    <Route path="/report"><OneReport FU={FU}></OneReport></Route>
    <Route path="/reset"><Reset  FU={FU}></Reset></Route>
    <Route path="/videos"><Videos  FU={FU}></Videos></Route>
    <Route path="/validations"><Validation FU={FU}></Validation></Route>
    <Route path="/changePass"><ChangePassword FU={FU}></ChangePassword></Route>
</Router>
</div>

<Footer></Footer>
<style>
    @font-face { font-family: Betsbi-font; src: url('/resources/PoetsenOne-Regular.ttf'); }
</style>