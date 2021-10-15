
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { id, secret } from './varAmbiente'
import { CorpoPaginaPostagem } from './components/ComponentsReact/PostagemPage/BodyPostagem';
import { CorpoPaginaAdicionarAnimal } from './components/ComponentsReact/PaginaAnimal/PaginaAdicionarAnimal';
import { PaginaAnimal } from './components/ComponentsReact/PaginaPerfilAnimal/Perfil';
import {PaginaNoticias} from './components/PaginaNoticias'
import { FiltragemHome } from './components/ComponentsReact/Home/Tabela';
import { CaixaMensagem } from './components/CaixaMesagem';
import {ChatBot} from './components/ChatBot';
import {sideBarLateral} from './components/SideBarLateral';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FormCadastroEstilizado } from './components/ComponentsReact/FormCadastro/index-estilizado';
import { FormLoginEstilizado } from './components/ComponentsReact/PaginaLogin/Login/index-estilizado';
import { Chat } from './components/ComponentsReact/WebChat/Chat';
import { MapaVisual } from './components/ComponentsReact/MapaVisual';
import { PaginaPerfilAtualizado } from './components/ComponentsReact/PerfilNovoUsuario';




// export function Logbox() {
//   return (<Router>
//     <div className="App">
//       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container">
//           <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to={"/sign-in"}>Login</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="auth-wrapper">
//         <div className="auth-inner">
//           <Switch>
//             <Route exact path='/' component={Login} />
//             <Route path="/sign-in" component={Login} />
//             <Route path="/sign-up" component={SignUp} />
//           </Switch>
//         </div>
//       </div>
//     </div></Router>
//   );
// }

const jwt = require('jsonwebtoken');
const token = jwt.sign({ sub: id }, secret);

function logoff() {
	localStorage.clear()
	window.location.replace("/login")
}

function App() {
	return (
		<Body>
			<Router>
				<Menu />
				<Switch>
					<Route path = "/PaginaNoticias" component = {PaginaNoticias}/>
					<Route path ="/sideBarLateral" component= {sideBarLateral}/>
					<Route path ="/ChatBot" component={ChatBot}/>
					<Route path="/caixa-mensagem" component={CaixaMensagem} />
					<Route path='/teste'/>
					<Route path='/mapa' component={MapaVisual}/>
					<Route path='/chat'>
						<Chat></Chat>
					</Route>
					<Route path='/' exact>
						<FiltragemHome />
						{/* <MediaCard/> */}
					</Route>
					
					<Route path='/cadastro'>
						<FormCadastroEstilizado />
					</Route>
					<Route path='/perfil-usuario/:id'>
						<PaginaPerfilAtualizado />
					</Route>
					<Route path='/postagens'>
						{/* <FeedInicio/> */}
						<CorpoPaginaPostagem />
					</Route>
					<Route path='/perfil/:id' >
						<PaginaAnimal />
					</Route>
					<Route path='/animais'>
						<CorpoPaginaAdicionarAnimal/>
						{/* <Perfilnovo/> */}
					</Route>
					
					<Route path='/logoff' component={logoff}>
					</Route>
					{/* <Route path="*" component={NotFound} />*/}
					<Route path='/login'>
						<FormLoginEstilizado />
					</Route>
					</Switch>
				<Footer />
			</Router>
		</Body>
	);
}

export default App;





