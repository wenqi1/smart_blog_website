import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Routes, Route }from 'react-router-dom';
import 'antd/dist/antd.css';
import Home from '../src/pages/home.js';

ReactDom.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home/> } />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)