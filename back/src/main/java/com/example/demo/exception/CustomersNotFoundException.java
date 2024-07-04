package com.example.demo.exception;

public class CustomersNotFoundException extends RuntimeException{
    public CustomersNotFoundException(Integer id){
        super("Could not found customers "+ id);
    }
}