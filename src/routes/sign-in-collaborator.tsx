import illustration from '@/assets/illustration.svg'
import { CollaboratorForm } from '@/components/collaborator-form'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

export function SignInCollaborator() {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen">
            <div className="flex justify-center w-2/5 bg-blue-500">
                <img src={illustration} alt="Imagem lado esquerdo" className="object-cover" />
            </div>

            <div className="w-3/5 flex flex-col justify-center items-center p-8">
                <Link
                    target="_blank"
                    to="http://chamadotasy.sccuradars.local/historico"
                    className="absolute right-4 top-3 flex items-center text-sm antialiased underline gap-2 text-muted-foreground hover:text-secondary-foreground transition-colors duration-200"
                >
                    Acompanhar suas justificativas
                </Link>

                <h1 className="text-3xl font-bold mb-6">Justifica Aí</h1>

                <CollaboratorForm />

                <div className="mt-6 flex items-center w-full max-w-sm">
                    <hr className="border-gray-300 flex-grow" />
                    <span className="mx-2 text-gray-500">ou</span>
                    <hr className="border-gray-300 flex-grow" />
                </div>

                <Button
                    variant="link"
                    className="mt-4 text-blue-500 hover:text-blue-700 font-semibold underline hover:no-underline"
                    onClick={() => navigate('/manager/login')}
                >
                    Acessar como Gestor
                </Button>
            </div>
        </div>
    )
}
