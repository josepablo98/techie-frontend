import { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Transition, Dialog, DialogPanel, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { startLogout } from "../store/auth";
import { AppDispatch } from "../store";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch : AppDispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(startLogout());
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-extrabold tracking-wide">Techie</h1>
        <nav className="flex items-center space-x-4">
          <button className="bg-white text-blue-600 font-bold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Nuevo Chat
          </button>
          <Menu as="div" className="relative">
            <MenuButton className="bg-white text-blue-600 font-bold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Opciones
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <NavLink
                      to="/account"
                      className={`block px-4 py-2 rounded-md ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`}
                    >
                      Información de cuenta
                    </NavLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <NavLink
                      to="/settings"
                      className={`block px-4 py-2 rounded-md ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`}
                    >
                      Configuración
                    </NavLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={openModal}
                      className={`block w-full text-left px-4 py-2 rounded-md ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`}
                    >
                      Historial de chats
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`block w-full text-left px-4 py-2 rounded-md ${
                        active ? "bg-red-500 text-white" : "text-black"
                      }`}
                    >
                    Cerrar sesión
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </nav>
      </div>

      {/* Modal de Historial de Chats */}
      <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal} />
        <DialogPanel className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative transition-transform transform scale-95 opacity-100">
          <h2 className="text-xl font-bold text-gray-800">Historial de Chats</h2>
          <ul className="mt-4 space-y-2">
            {["Chat 1", "Chat 2", "Chat 3", "Chat 4", "Chat 5"].map((chat, index) => (
              <li
                key={index}
                className="p-3 bg-gray-100 rounded-lg hover:bg-blue-100 transition"
              >
                {chat}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Cerrar
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
