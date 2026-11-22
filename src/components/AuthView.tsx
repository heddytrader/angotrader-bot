'use client'
import { useState } from 'react'
import { Eye, EyeOff, TrendingUp, Mail, User, Lock } from 'lucide-react'

export default function AuthView({ onLogin }: { onLogin: (name: string, email: string) => void }) {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email.includes('@') || password.length < 4) {
      setError('E-mail inválido ou senha muito curta (mín. 4)')
      return
    }
    if (isRegister && !name.trim()) {
      setError('Escreve o teu nome')
      return
    }
    const users = JSON.parse(localStorage.getItem('angotrader_users') || '[]')
    if (isRegister) {
      if (users.find((u: any) => u.email === email.toLowerCase())) {
        setError('Este e-mail já tem conta. Faz login.')
        return
      }
      users.push({ name, email: email.toLowerCase(), password })
      localStorage.setItem('angotrader_users', JSON.stringify(users))
    } else {
      const found = users.find((u: any) => u.email === email.toLowerCase() && u.password === password)
      // permite entrar mesmo sem conta criada antes, para não ficares preso
      if (!found && users.length > 0) {
        setError('Senha errada para este e-mail')
        return
      }
    }
    const finalName = isRegister ? name : (users.find((u: any) => u.email === email.toLowerCase())?.name || 'Trader')
    localStorage.setItem('angotrader_session', JSON.stringify({ name: finalName, email: email.toLowerCase() }))
    onLogin(finalName, email.toLowerCase())
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#121826] rounded-3xl p-6 border border-white/10">
        {/* LOGO tipo Bybit / Binance */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-2xl font-black text-black">AT</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-3">Ango<span className="text-yellow-400">Trader</span></h1>
          <p className="text-gray-400 text-sm flex items-center gap-1"><TrendingUp size={14} /> Sinais • IA • Trading</p>
        </div>

        <div className="flex bg-black/40 rounded-full p-1 mb-5">
          <button onClick={() => { setIsRegister(false); setError('') }} className={`flex-1 py-2 rounded-full text-sm font-bold ${!isRegister ? 'bg-yellow-400 text-black' : 'text-gray-300'}`}>Entrar</button>
          <button onClick={() => { setIsRegister(true); setError('') }} className={`flex-1 py-2 rounded-full text-sm font-bold ${isRegister ? 'bg-yellow-400 text-black' : 'text-gray-300'}`}>Criar Conta</button>
        </div>

        {isRegister && (
          <div className="relative mb-3">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-white outline-none focus:border-yellow-400" />
          </div>
        )}
        <div className="relative mb-3">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-white outline-none focus:border-yellow-400" />
        </div>
        <div className="relative mb-3">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type={showPass ? 'text' : 'password'} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white outline-none focus:border-yellow-400" />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-gray-400">
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}

        <button onClick={handleSubmit} className="w-full bg-yellow-400 text-black font-black py-3 rounded-xl">
          {isRegister ? 'Criar Conta' : 'Entrar'}
        </button>
        <p className="text-center text-gray-500 text-xs mt-4">Ao entrar aceitas os termos do AngoTrader</p>
      </div>
    </div>
  )
}
