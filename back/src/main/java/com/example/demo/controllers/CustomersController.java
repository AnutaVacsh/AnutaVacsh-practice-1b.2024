package com.example.demo.controllers;

import com.example.demo.exception.*;
import com.example.demo.models.Customers;
import com.example.demo.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("Customers")
public class CustomersController {
    @Autowired
    private CustomersRepository customersRepository;

    @GetMapping(value = "/allCustomers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Customers>> getCustomers(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(customersRepository.findAll());
    }

    @GetMapping(value = "/getCustomers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Optional<Customers>> getOneCustomers(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(customersRepository.findById(id));
    }

    @PostMapping("/safeCustomers")
    public String safeCustomers(@RequestBody Customers customers){
        customersRepository.save(customers);
        return "Add Customers";
    }

    @PutMapping("editCustomers/{id}")
    public Customers editCustomers(@RequestBody Customers freshCustomers, @PathVariable Integer id){
        return customersRepository.findById(id)
                .map(h -> {
                    h.setName(freshCustomers.getName());
                    h.setAddress(freshCustomers.getAddress());
                    return customersRepository.save(h);
                }).orElseThrow(() -> new CustomersNotFoundException(id));
    }


    @DeleteMapping("deleteCustomers/{id}")
    public void deleteCustomers(@PathVariable Integer id){
        if(customersRepository.existsById(id))
            customersRepository.deleteById(id);
        else throw new CustomersNotFoundException(id);
    }
}
