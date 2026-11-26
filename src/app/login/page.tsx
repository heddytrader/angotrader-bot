"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  function entrar(e: any) {
    e.preventDefault();
    if (!nome && !isLogin) { alert("Escreve o teu nome!"); return; }
    if (!email || !senha) { alert("Preenche email e senha!"); return; }
    localStorage.setItem("angotrader_user", JSON.stringify({ nome: nome || "Utilizador", email }));
    router.push("/");
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#020617", padding:20}}>
      <form onSubmit={entrar} style={{width:"100%", maxWidth:400, background:"#0f172a", padding:24, borderRadius:16}}>
        <h1 style={{color:"white", textAlign:"center", fontSize:24, fontWeight:"bold"}}>AngoTrader</h1>
        <p style={{color:"#94a3b8", textAlign:"center", marginBottom:20}}>{isLogin ? "Entrar na tua conta" : "Criar a tua conta"}</p>
        {!isLogin && <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Teu nome" style={{width:"100%", padding:12, marginBottom:12, borderRadius:10, background:"#1e293b", color:"white", border:"1px solid #334155"}} />}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Teu email" type="email" style={{width:"100%", padding:12, marginBottom:12, borderRadius:10, background:"#1e293b", color:"white", border:"1px solid #334155"}} />
        <div style={{position:"relative"}}>
          <input value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Palavra-passe" type={mostrar ? "text" : "password"} style={{width:"100%", padding:12, marginBottom:16, borderRadius:10, background:"#1e293b", color:"white", border:"1px solid #334155"}} />
          <button type="button" onClick={()=>setMostrar(!mostrar)} style={{position:"absolute", right:10, top:10, background:"none", border:"none", fontSize:18}}>{mostrar ? "X" : "Olho"}</button>
        </div>
        <button type="submit" style={{width:"100%", padding:13, background:"#22c55e", color:"white", fontWeight:"bold", borderRadius:10, border:"none"}}>{isLogin ? "ENTRAR" : "CRIAR CONTA"}</button>
        <p onClick={()=>setIsLogin(!isLogin)} style={{color:"#38bdf8", textAlign:"center", marginTop:14, cursor:"pointer"}}>{isLogin ? "Nao tens conta? Criar conta" : "Ja tens conta? Entrar"}</p>
      </form>
    </div>
  );
}
