import React, { Component } from 'react';

const formatName = (user) => (user.firstName + ' ' + user.lastName);

const user = { firstName: 'Jose', lastName: 'Ortega' };

const Greeting = (props) => (props.name);

const element = <Greeting name="Mercedes" />

const Welcome = (props) => ( <h1> Hello, {props.name} </h1> );

const WelcomeComp = (props) => (
  <div>
    <Welcome name="Franceska" />
    <Welcome name="Siena" />
    <Welcome name="Kiara" />
  </div>
);

const Learning = () => ( <div> <h1> Hello, {formatName(user)}! </h1> <h2> {element} </h2> <WelcomeComp /> </div> );

export default Learning;
