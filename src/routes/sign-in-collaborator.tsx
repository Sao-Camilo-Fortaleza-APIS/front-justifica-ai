import illustration from '@/assets/bg3.jpg'
import { CollaboratorForm } from '@/components/collaborator-form'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

export function SignInCollaborator() {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen">
            <div className="flex justify-center w-3/6 h-full bg-gradient-to-t from-[#f3f4f6] to-[#f9f9f9]">
                <img src={illustration} alt="Banner Justifica Aí" className="object-fill w-full border border-input" />
            </div>

            <div className="w-3/6 bg-primary h-full flex flex-col justify-center items-center p-8">
                <Link
                    target="_blank"
                    to="http://chamadotasy.sccuradars.local/historico"
                    className="absolute right-4 top-3 flex items-center text-sm antialiased underline gap-2 text-zinc-100 hover:text-zinc-200 transition-colors duration-200"
                >
                    Acompanhar suas justificativas
                </Link>

                <div className='flex flex-col items-center bg-white shadow p-8 rounded-md w-full max-w-sm'>
                    <h1 className="text-2xl font-bold font-inter antialiased mb-6 text-zinc-900">Área do colaborador</h1>

                    <CollaboratorForm />

                    <div className="mt-6 flex items-center w-full max-w-sm">
                        <hr className="border-gray-300 flex-grow" />
                        <span className="mx-2 text-gray-500">ou</span>
                        <hr className="border-gray-300 flex-grow" />
                    </div>

                    <Button
                        variant="link"
                        className="mt-4 text-primary hover:text-primary/90 font-semibold underline hover:no-underline"
                        onClick={() => navigate('/manager/login')}
                    >
                        Acessar como Gestor
                    </Button>
                </div>
            </div>
        </div>
    )
}
