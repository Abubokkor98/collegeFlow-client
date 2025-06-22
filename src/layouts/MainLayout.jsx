import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div>
        <main className="min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>
    </div>
  )
}
