import { Outlet } from "react-router-dom";
import { Header } from "./components/header";

export function App() {

  return (
    <div className="flex flex-col bg-zinc-50 h-screen">
      <Header />
      <Outlet />
    </div>
  )
}