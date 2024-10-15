import { Menu } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="flex justify-between items-center p-1 shadow bg-white">
      <img className="size-12" src="/logo_sc_vazada.png" alt="Logo São Camilo" />

      <Button size="icon" variant="link">
        <Menu className='size-10 text-zinc-400' />
      </Button>
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
