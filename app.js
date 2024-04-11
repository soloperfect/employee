// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
mongoose.connect('mongodb://localhost:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const employeeSchema = new mongoose.Schema({
    name: String,
    location: String,
    position: String,
    salary: Number,
  });
  
  const Employee = mongoose.model('Employee', employeeSchema);
  


  app.use(express.json());
  app.use(express.static(path.join(__dirname, '/dist/FrontEnd')));
  




//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



//TODO: get single data from db  using api '/api/employeelist/:id'
pp.get('/api/employeelist/:id', async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (employee == null) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    const employee = new Employee({
      name: req.body.name,
      location: req.body.location,
      position: req.body.position,
      salary: req.body.salary,
    });
    try {
      const newEmployee = await employee.save();
      res.status(201).json(newEmployee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
// Task 5: Delete an employee data from db using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ message: 'Employee deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.patch('/api/employeelist/:id', async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedEmployee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



