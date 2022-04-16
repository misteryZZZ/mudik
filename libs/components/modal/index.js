import { useEffect } from 'react'

export const Modal = ({ title, children, onClose }) => {

  const handleKeydown = (e) => {
    if (event.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    document.body.className = 'modal-open';
    document.addEventListener("keydown", handleKeydown, false);
  },[])

  useEffect(() => () => {
    document.body.className = '';
    document.removeEventListener("keydown", handleKeydown, false);
  },[])

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button className="text-xl" onClick={onClose}>x</button>
        </div>
        {children}
        </div>
    </div>
  )
}