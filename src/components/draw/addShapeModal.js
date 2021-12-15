import { useState } from 'react';
import { Button, Modal, Form, FloatingLabel, ToastContainer, Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

function AddShapeModal(props) {
    const { show, setShow, data } = (props);
    const handleModal = () => setShow(!show);
    const [name, setName] = useState('');

    const [showToast, setShowToast] = useState(false);

    const toggleShowToast = () => setShowToast(false);
    const dispatch = useDispatch();

    const submitForm = (event) => {
        event.preventDefault();
        if (!name) {
            alert('Name is required');
            return;
        }
        const layer = data.layer;
        var object = { id: layer._leaflet_id, name: name, layerType: data.layerType, _latlngs: layer._latlng || layer._latlngs, options: layer.options };
        dispatch({ type: 'ADD_MAP', payload: object });
        setShow(false);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false)
        }, 2000);
    };
    return (
        <div>
            <Modal
                show={show}
                keyboard={false}
            >
                <Form onSubmit={submitForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Shape</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Enter a name for your shape</h6>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Shape Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="shape one" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </FloatingLabel>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModal}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">Save Shape</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ToastContainer className='toast-container' >
                <Toast show={showToast} onClose={toggleShowToast} animation={true}>
                    <Toast.Header className="bg-success text-light" >
                        <strong className="me-auto">Successful</strong>
                    </Toast.Header>
                    <Toast.Body> Shape Saved !</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default AddShapeModal;
