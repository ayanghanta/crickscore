"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const ModalContext = createContext();

function Modal({ children }) {
  const [windowId, setWindowId] = useState("ok");

  const closeModal = () => setWindowId("");
  const openModal = (id) => setWindowId(id);

  return (
    <ModalContext.Provider value={{ closeModal, openModal, windowId }}>
      {children}
    </ModalContext.Provider>
  );
}

function Button({ children, id }) {
  const { closeModal, openModal, windowId } = useContext(ModalContext);

  function handleClick() {
    if (windowId === "" || windowId !== id) openModal(id);
    else closeModal();
  }

  return cloneElement(children, { onClick: handleClick });
}

function Window({ children, id }) {
  const { windowId, closeModal } = useContext(ModalContext);
  // const { refEl } = useOutsideClick(closeModal);

  if (id !== windowId) return null;

  return (
    <div className="fixed inset-0 w-full h-screen bg-black/10 backdrop-blur-sm z-[1000] flex justify-center items-center transition-all duration-500">
      <div className="flex flex-col max-h-[90vh] overflow-hidden rounded-md shadow-lg w-6/12">
        <div className="relative overflow-y-auto bg-gray-50 rounded-md px-12 py-8">
          <IoCloseOutline
            className="p-1 absolute top-1 right-1 text-4xl text-gray-800 z-[999] cursor-pointer rounded hover:bg-gray-200 transition-all duration-300"
            onClick={closeModal}
          />

          {cloneElement(children, { handelCloseModal: closeModal })}
        </div>
      </div>
    </div>
  );
}

Modal.Button = Button;
Modal.Window = Window;

export default Modal;
