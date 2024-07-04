import { React, useContext, useState } from "react";
import { Button } from 'react-bootstrap';
import { MessegeContext } from "../context/MessageContext";

function CreateUser(){
    const [newUser, setNewUser] = useState({ name: '', address: '' });
    const {openMessageError, openMessageSuccess} = useContext(MessegeContext);


    function validate(name, address){

        let strError = [];
        if(name.length < 5) strError.push("Имя должно содержать больше 4 символов");

        const regex = /\s\d{6}$/; //индексом считается последовательность шести цифр в конце строки
        if(!regex.test(address)) strError.push("Адрес должен содержать индекс");

        return strError;
    }

    function save(){
        console.log(newUser)

        let strError = validate(newUser.name, newUser.address);

        console.log(strError)

        if(strError.length === 0){
            fetch("http://localhost:8080/Customers/safeCustomers", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(newUser)
            })
            .then(response => {
                if (response.ok) {
                    openMessageSuccess()
                }
            })
            .then(()=>{window.location.href = '/'})
            .catch((e)=> openMessageError("Пользователь не добавлен\n"+e.message))
            .catch((e)=> console.log(e.message))
        }

        else alert(strError.join("\n"));
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    };
  
    const handleCancel = () => {
      window.location.href = '/';
    };
  
    return (
      <div className="container mx-auto mt-5 p-4 border border-primary rounded" style={{ maxWidth: '600px' }}>
        <h2 className="mb-3">Создание нового клиента</h2>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Имя</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newUser.name} // Установка начального значения
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Адрес</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={newUser.address} // Установка начального значения
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <Button variant="primary" className="me-2" onClick={save}>Сохранить</Button>
              <Button variant="secondary" onClick={handleCancel}>Отмена</Button>
            </div>
          </div>
        </div>
      </div>
      );
}

export default CreateUser;