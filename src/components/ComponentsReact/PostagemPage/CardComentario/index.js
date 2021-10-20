import "./styles.css"
import { Link } from "react-router-dom";
const moment = require('moment'); 


export function CardComentario(props) {

    let data = props.criado

    let tempo = moment(data).format('HH:mm:ss DD-MM')

    return (
        <>
            <div className="card p-3">
                <div className="cardComentario">
                    <div className="imgcomentaario">
                        <img src={props.usuario.avatar} width="30" className="imgComentario" />
                        <Link to={`/perfil-usuario/${props.usuario.id}`}><span>{props.usuario.nome}</span></Link>
                    </div>
                    <small>{tempo}</small>

                </div>
                <div className="comentario">
                    <p>{props.conteudo} </p>
                </div>
                
            </div>
        </>
    )
}