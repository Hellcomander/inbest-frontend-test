'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login () {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Aquí iría tu llamada al backend
        if (email === 'admin' && password === '1234') {
            // Simulando token guardado
            localStorage.setItem('token', 'fake-jwt-token')
            router.push('/dashboard')
        } else {
            setError('Correo electrónico o contraseña incorrectos')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-300">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Iniciar Sesión</h1>

                {error && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-black">Correo electrónico</label>
                        <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 text-black"
                        placeholder="Ingresa tu usuario"
                        required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-black">Contraseña</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 text-black"
                        placeholder="Ingresa tu contraseña"
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}