import { Outlet } from "react-router-dom";

export function App() {

  return (
    <div className="flex flex-col bg-zinc-50 h-screen">
      <Outlet />
    </div>
  )
}