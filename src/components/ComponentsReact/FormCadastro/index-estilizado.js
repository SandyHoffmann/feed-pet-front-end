import React from "react";
import { api } from "../../../service";
import { useState, useEffect } from "react";
import { VerificarErros } from "../../../errorHandling";
import "./styles.css"
export function FormCadastroEstilizado(){
    const [nome,setNome] = useState("")
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [imagem,setImagem] = useState("")

    async function handleChange(e){
        const value = e.target.value;
        const nome = e.target.name;
        if (nome=="nome"){
            setNome(value)
        } else if (nome=="email"){
            setEmail(value)
        } else if (nome=="senha"){
            setSenha(value)
        } else if (nome=="avatar"){
            setImagem(e.target.files[0])
        }
        console.log(imagem)
    }
    
    async function handleSubmit(e){
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            console.log(formData)
            let p = document.querySelectorAll(".carregando")
            p[0].className = "carregando loader"
            const res = await api.post(`/usuarios/`, 
                                formData, {
                                    headers: {
                                        "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
                                        }
                                });
            p[0].className = "carregando"
            console.log(res.data)
            setNome("")
            setEmail("")
            setSenha("")   
            setImagem("")   
            window.location.replace("/login");    
        } catch (error) {
            let erros = error.response.data
            
            if (typeof erros === 'object'){
                VerificarErros(erros)
            } else{
                VerificarErros({errors:[{param:'cadastro',msg:'Já existe um usuário com esse e-mail!'}]})
            }
        }
    }

        return (
            <>
            <div className="grandecaixa">
            <div className="caixaimagem"><img src='http://i.imgur.com/hPpW64Wh.gif' className="bluhrit"></img></div>
            <div className="container caixa">
                <form onSubmit={handleSubmit} className="caixaElemento  cadastroCaixa" enctype="multipart/form-data"> 
                <h1>Cadastre-se</h1>
                <br/>
                <div className="form-group nome-err form-err">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" className="form-cadastro" id="nome" name="nome" aria-describedby="Nome" value={nome} onChange={handleChange} placeholder="Nome"/>
                </div>
                <br/>
                <div className="form-group email-err form-err">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-cadastro" id="email" name="email" aria-describedby="Email" value={email} onChange={handleChange} placeholder="Email" />
                </div>
                <br/>
                <div className="form-group senha-err form-err">
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" className="form-cadastro" id="senha" name="senha" aria-describedby="Senha" value={senha} onChange={handleChange} placeholder="Senha" />
                </div>
                <input type="file" name="avatar" className="form-cadastro img inputfile" onChange={handleChange} />
                <span className="avatar-err form-err cadastro-err"></span>
                <br/>
                <button type="submit" className="btn botaoRosa">Enviar</button>
                <div className="loadFlex">
                <p className="carregando"></p>
                </div>
                </form>   
                <br/>
                </div>      
               </div>    
            </>
        );

}
