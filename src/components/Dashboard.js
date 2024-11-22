import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Header from './Header';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {

  return (
    <>
    <Header />
    <div className="min-h-full">
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            <div style={{border: "2px solid black", width:"15%", borderRadius:"5%"}}>
                <br></br>
                <p style={{fontWeight:"bold"}}>todo.title </p>
                <p><i>todo.date</i></p><br></br>
                <hr style={{width:"80%"}}></hr><br></br>
                <p>todo.description</p><br></br><br></br><br></br>
            </div>
            
          </div>
        </main>
      </div>
    </>
  )
}
