import React from 'react';
import {useDispatch} from 'react-redux';
import {motion} from 'framer-motion';
import useInput from '../hooks/useInput';
import {editTodo} from '../store/actions/todosActions';

const backdropVariant = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
}

const modalVariant = {
    hidden: {
        x: '-100vw',
        y: '-50%',
        opacity: 0
    },
    visible: {
        x: '-50%',
        y: '-50%',
        opacity: 1,
        transition: {delay: 0.1},
    }
}

const EditTodo = ({value, setModalIsOpen, todoId}) => {
    const [input, connectInput] = useInput(value);
    const dispatch = useDispatch();

    const closeModal = () => setModalIsOpen(false);
    const closeByBackdrop = e => {
        e.stopPropagation();
        if (e.target.id === "backdrop") setModalIsOpen(false);
    }

    const handleEditTodo = () => {
        let newValue = input.trim();
        if (newValue === value) setModalIsOpen(false);
        else {
            dispatch(editTodo(todoId, newValue));
            setModalIsOpen(false);
        }
    }

    return (
        <motion.div className="backdrop" id="backdrop" onClick={closeByBackdrop} variant={backdropVariant} initial="hidden" animate="visible" exit="hidden">
            <motion.div className="modal-edit bg-light px-5 py-4" variants={modalVariant}>
                <div className="d-flex justify-content-between">
                    <h1 className="pb-5">Edit todo</h1>
                    <span className="modal-close" onClick={closeModal}>X</span>
                </div>
                <div className="d-flex flex-column">
                    <input type="text" className="form-control input-edit" {...connectInput.setInput} />
                    <button className="btn btn-primary d-block btn-edit mt-5 align-self-end px-4" onClick={handleEditTodo}>Save changes</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default EditTodo;
