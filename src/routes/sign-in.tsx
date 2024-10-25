import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getEmployeeByCPF } from '@/api/get-employee-by-cpf';
import illustration from '@/assets/illustration.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Esquema de validação com Zod
const colaboradorSchema = z.object({
    cpf: z.string().min(11, 'O CPF deve ter 11 dígitos').max(11, 'O CPF deve ter 11 dígitos'),
});

const gestorSchema = z.object({
    user: z.string(),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

// Tipagem dos formulários com base no Zod
type ColaboradorFormData = z.infer<typeof colaboradorSchema>;
type GestorFormData = z.infer<typeof gestorSchema>;

export function SignIn() {
    const navigate = useNavigate()
    const [isGestor, setIsGestor] = useState(false);

    // useForm para Colaborador
    const {
        register: registerColaborador,
        handleSubmit: handleSubmitColaborador,
        formState: { errors: errorsColaborador, isSubmitting: isSubmittingColaborador },
    } = useForm<ColaboradorFormData>({
        resolver: zodResolver(colaboradorSchema),
    });

    // useForm para Gestor
    const {
        register: registerGestor,
        handleSubmit: handleSubmitGestor,
        formState: { errors: errorsGestor, isSubmitting: isSubmittingGestor },
    } = useForm<GestorFormData>({
        resolver: zodResolver(gestorSchema),
    });

    const onSubmitColaborador = async (data: ColaboradorFormData, e?: BaseSyntheticEvent | undefined) => {
        e?.preventDefault()
        console.log('Autenticando como colaborador...', data);
        // Redirecionamento ou ação após login de colaborador

        await getEmployeeByCPF(data.cpf).then((response) => {
            console.log(response)
            toast.success(`${response.name} encontrado!`)
            navigate('create-justification', { state: { employee: response } })
        }).catch((error) => {
            console.error(error)
            toast.error('CPF não encontrado')
        })
    };

    const onSubmitGestor = async (data: GestorFormData, e?: BaseSyntheticEvent | undefined) => {
        e?.preventDefault()
        console.log('Autenticando como gestor...', data);
        // Redirecionamento ou ação após login de gestor
    };

    return (
        <div className="flex h-screen">
            {/* Lado Esquerdo - Imagem */}
            <div className="flex justify-center w-2/5 bg-blue-500">
                <img
                    src={illustration}
                    alt="Imagem lado esquerdo"
                    className="object-cover"
                />
            </div>

            {/* Lado Direito - Formulário */}
            <div className="w-3/5 flex flex-col justify-center items-center p-8">
                <h1 className="text-3xl font-bold mb-6">Justifica Aí</h1>

                {!isGestor ? (
                    <form onSubmit={handleSubmitColaborador(onSubmitColaborador)} className="w-full max-w-sm">
                        {/* Campo CPF para Colaborador */}
                        <div className="mb-4">
                            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                                CPF
                            </Label>
                            <Input
                                type="text"
                                id="cpf"
                                placeholder="Digite seu CPF"
                                className="shadow-sm appearance-none border rounded-md h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...registerColaborador('cpf')}
                            />
                            {errorsColaborador.cpf && (
                                <p className="text-red-500 text-xs mt-1">{errorsColaborador.cpf.message}</p>
                            )}
                        </div>

                        {/* Botão de login */}
                        <Button
                            type="submit"
                            className="bg-blue-500 w-full h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                            disabled={isSubmittingColaborador}
                        >
                            {isSubmittingColaborador ? <Loader className='animate-spin' /> : 'Entrar'}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitGestor(onSubmitGestor)} className="w-full max-w-sm">
                        {/* Campo Usuário para Gestor */}
                        <div className="mb-4">
                            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
                                Usuário
                            </Label>
                            <Input
                                type="text"
                                id="user"
                                placeholder="Digite seu usuário"
                                className="shadow-sm appearance-none border rounded-md h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...registerGestor('user')}
                                disabled={isSubmittingGestor}
                            />
                            {errorsGestor.user && (
                                <p className="text-red-500 text-xs mt-1">{errorsGestor.user.message}</p>
                            )}
                        </div>

                        {/* Campo Senha para Gestor */}
                        <div className="mb-4">
                            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                                Senha
                            </Label>
                            <Input
                                type="password"
                                id="senha"
                                placeholder="Digite sua senha"
                                className="shadow-sm appearance-none border rounded-md h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...registerGestor('senha')}
                                disabled={isSubmittingGestor}
                            />
                            {errorsGestor.senha && (
                                <p className="text-red-500 text-xs mt-1">{errorsGestor.senha.message}</p>
                            )}
                        </div>

                        {/* Botão de login */}
                        <Button
                            type="submit"
                            className="bg-blue-500 w-full h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                            disabled={isSubmittingGestor}
                        >
                            {isSubmittingGestor ? <Loader className='animate-spin' /> : 'Entrar'}
                        </Button>
                    </form>
                )}

                {/* Separador e opção de login para gestor */}
                <div className="mt-6 flex items-center w-full max-w-sm">
                    <hr className="border-gray-300 flex-grow" />
                    <span className="mx-2 text-gray-500">ou</span>
                    <hr className="border-gray-300 flex-grow" />
                </div>
                <Button
                    variant="link"
                    className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
                    onClick={() => setIsGestor(!isGestor)}
                >
                    {isGestor ? 'Entrar como Colaborador' : 'Entrar como Gestor'}
                </Button>
            </div>
        </div>
    );
}
