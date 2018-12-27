import React, { Component } from 'react';
import { render } from 'react-dom';

class Game extends Component {
    render(){
        return (
        <h1>hola react</h1>
        )
    }
}

render(<Game/>,document.getElementById('app'))