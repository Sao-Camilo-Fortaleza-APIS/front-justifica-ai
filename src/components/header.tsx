import { Hero } from "./hero";

export function Header() {
  return (
    <header className="flex justify-between items-center sm:px-60 p-1 shadow bg-white">
      <span className="flex items-center gap-2">
        <img className="size-12" src="/logo_sc_vazada.png" alt="Logo São Camilo" />
        <h1 className="text-xl font-bold text-zinc-800">Justifica Aí</h1>
      </span>

      <Hero />

      {/* <Button size="icon" variant="link">
        <Menu className='size-10 text-zinc-400' />
      </Button> */}
      {/* <nav>
        <ul className="flex">
          <li><a href="#">Início</a></li>
          <li><a href="#">Criar Justificativa</a></li>
          <li><a href="#">Perfil</a></li>
          <li><a href="#">Sair</a></li>
        </ul>
      </nav> */}
    </header>
  )
}
