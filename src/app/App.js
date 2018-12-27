import React, { Component } from 'react';


function Square(props) {
    return (
     <button type ='submit' className='square' onClick={props.onClick}
      > {props.value}
      </button>
    );
  }
  
  class Board extends Component {
      constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext:'',
       };
       this.addGame = this.addGame.bind(this);

   }
    
      handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }  
      squares[i] = this.state.xIsNext ? 'O' : 'X'; 
       this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,   
      });
    }
    
    renderSquare(i) {
      return (<Square value= {this.state.squares[i]}
       onClick={() => this.handleClick(i)} 
               />
              );
    }
    addGame(e) {
          fetch('/api/jugadas',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept':'application/json',
              'Content-Type': 'application/json' 
            } 
          })
            .then(res => res.json())
            .then(data => {
           //   console.log(data);
             M.toast({html:'task saved'})
             this.setState({
              squares: Array(9).fill(null),
              xIsNext: false,
            });
          })
          .catch(err => console.log(err));
        
    
        e.preventDefault();
        
      }

   render() {
     const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'O' : 'X');
        }      
      return (
        <div className="row">
         <div className="status" >{status}</div>
          <div className="board" >
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board" >
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <form onSubmit ={this.addGame} >
         <button type="submit" className="btn light-blue darken-4"> Pausar </button>
        </form>
       </div>
      );
    }
  }
  
  class Game extends Component {
       constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      };
    }
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
         </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  

  
  export default Game;
