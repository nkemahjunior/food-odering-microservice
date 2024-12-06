 
interface fnProps {
  closeModal: (arg: boolean) => void;
  modalIsOpen: boolean;
  expandLeft?: string;
  zIndex:string
}
export default function ModalOverlay({closeModal, modalIsOpen, expandLeft, zIndex}:fnProps) {
    return (
      <div
        className={` z-[2] fixed inset-0 ${expandLeft} ${zIndex} bg-[rgba(0,0,0,0.1)] ${modalIsOpen ? " " : "hidden"}`}
        onClick={() => closeModal(false)}
      ></div>
    );
}