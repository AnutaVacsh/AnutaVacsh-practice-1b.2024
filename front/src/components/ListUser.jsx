import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MessegeContext } from "../context/MessageContext";

function ListUser(){
    const [allCustomers, setCustomers] = useState([]);
    const {openMessageError, openMessageSuccess} = useContext(MessegeContext);

    useEffect(() => {
        fetch("http://localhost:8080/Customers/allCustomers", {
            mode: 'cors',
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => setCustomers(data))
        .catch((e)=> console.log(e.message))
    }, [])

    function clickCreate(){
        window.location.href = '/create';
    }

    function clickDelete(id){
        const confirmed = window.confirm('Вы уверены?');
        if(confirmed){
            fetch("http://localhost:8080/Customers/deleteCustomers/"+id, {
                mode: 'cors',
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    setCustomers(allCustomers.filter(customer => customer.id !== id))
                    openMessageSuccess()
                }
            })
            .catch(openMessageError("Пользователь не удалён"))
            .catch((e) => console.log(e.message))
        }
        
    }

    function clickEdit(id){
        window.location.href = '/edit/'+id;
    }

    const h = allCustomers.map((item) => 
        <div className="row mb-3" key={item.id}>
            <div className="name col-md-3">{item.name}</div>
            <div className="address col-md-3">{item.address}</div>
            <div className="col-md-3">
                <Button variant="primary" onClick={() => clickDelete(item.id)}>Удалить</Button>
            </div>
            <div className="col-md-3">
                <Button variant="primary" onClick={() => clickEdit(item.id)}>Редактировать</Button>
            </div>
        </div>
    )

    return(
        <article className="mb-4 text-center">
            <h1 className="mb-3">Список клиентов</h1>
            <Button variant="primary" onClick={clickCreate} className="mb-3">Создать нового клиента</Button>
            {h}
        </article>
    )
}

export default ListUser;