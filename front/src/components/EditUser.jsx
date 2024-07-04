import {useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MessegeContext } from "../context/MessageContext";

function EditUser(){
    const {id} = useParams();

    const [newUser, setNewUser] = useState({ name: '', address: '' });
    const {openMessageError, openMessageSuccess} = useContext(MessegeContext);
  
    const handleCancel = () => {
        window.location.href = '/';
    };

    useEffect(() => {
        fetch("http://localhost:8080/Customers/getCustomers/"+id, {
            mode: 'cors',
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {setNewUser({name: data.name, address: data.address})})
        .catch((e)=> console.log(e.message))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevUser => ({
          ...prevUser,
          [name]: value
        }));
      };

    function validate(name, address){
        let strError = [];
        if(name.length < 5) strError.push("Имя должно содержать больше 4 символов");

        const regex = /\s\d{6}$/;
        if(!regex.test(address)) strError.push("Адрес должен содержать индекс");
        console.log(regex.test(address))

        return strError;
    }

    function save(){
        console.log(newUser)

        let strError = validate(newUser.name, newUser.address);

        console.log(strError)

        if(strError.length === 0){
            fetch("http://localhost:8080/Customers/editCustomers/"+id, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(newUser)
            })
            .then(response => {
                if (response.ok) {
                    openMessageSuccess()
                }
            })
            .then(()=>{window.location.href = '/'})
            .catch(openMessageError("Пользователь не изменён"))
            .catch((e)=> console.log(e.message))
        }

        else alert(strError.join("\n"));
    }

    return(
        <div className="container mt-5">
        <div className="add active border border-primary rounded p-4">
        <h2>Редактировать клиента</h2>
        <div className="form">
            <div className="double">
            <div className="number">
                <Form.Group className="mb-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                />
                </Form.Group>
            </div>
            <div className="title">
                <Form.Group className="mb-3">
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={newUser.address}
                    onChange={handleChange}
                />
                </Form.Group>
            </div>
            </div>
            <div className="buttons">
            <Button variant="primary" className="me-2" onClick={save}>Сохранить</Button>
            <Button variant="secondary" onClick={handleCancel}>Отмена</Button>
            </div>
        </div>
        </div>
        </div>
    )
}

export default EditUser;