import { useState, useEffect } from 'react'

import React from 'react';

import Modal from 'react-modal';

import axios from 'axios'

import './App.css'
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './components/Register';
import LoginPage from './components/Login';
import Home from './components/Home';





function App() {
  return <Routes>
    <Route path='/signup'element={<SignUpPage />} />
    <Route path='/login'element={<LoginPage />} />
    <Route path='/'element={<Home />} />
  </Routes>
}

export default App

