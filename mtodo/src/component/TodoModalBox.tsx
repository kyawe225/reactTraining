import { Button, Modal } from "react-bootstrap";

type TodoModalBoxProps = {
    show: boolean,
    handleClose: (id:number) => void,
}


export function TodoModalBox(todo: TodoModalBoxProps) {
    function deleteA(){
        todo.handleClose(1);
    }
    return (
        <Modal show={todo.show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure Do you want to Delete?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={deleteA}>
                    Close
                </Button>
                <Button variant="danger" onClick={deleteA}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}