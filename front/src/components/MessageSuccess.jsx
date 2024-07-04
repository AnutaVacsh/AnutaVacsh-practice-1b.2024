import { Button } from "react-bootstrap";
import { MessegeContext } from "../context/MessageContext";
import { useContext } from "react";

function MessegeSuccess(){
    const {closeMessege} = useContext(MessegeContext);

    return(
        <div className={`border border-primary rounded p-3 bg-light text-center`}>
            <h4 className="mb-3">Действие выполнено успешно</h4>
            <Button variant="primary" className="me-2" onClick={closeMessege}>Оk</Button>
        </div>
    )
}

export default MessegeSuccess;