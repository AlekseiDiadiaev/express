import { useAppDispatch } from '../../hooks/reduxTypesHooks';
import { setModalIsOpen } from '../../slices/commonSlice';
import './modal.css';

const Modal = () => {
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(setModalIsOpen(false))
    }
    return (
       <div className="overley">
            <div className="modal" onClick={handleClose}>
                <button className="modal__close" onClick={handleClose}></button>
                Your order is being processed. We will contact you.
            </div>
       </div> 
    );
}

export default Modal;
