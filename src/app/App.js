import React, { Component } from 'react';

const styles ={
      square:{
      background: '#fff',
      border: '1px solid #999',
      float: 'left',
      fontSize: '100px',
      fontWeight: 'bold',
      lineeHight: '100px',
      height: '120px',
      marginRight: '-1px',
      marginTop: '0px',
      padding: '0',
      textAlign: 'center',
      width: '120px',
   },
    juego:{
        position: 'absolute',
        left: '35%',
        top: '20%'
        
   }
    
  
  }


function Square(props) {
    return (
     <button type ='submit' className='square' block='true'  style={styles.square} onClick={props.onClick}
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
            M.toast({html:'task saved'})
             this.setState({
              squares: Array(9).fill(null),
              xIsNext: false,
            });
          })
          .catch(err => console.log(err));
        
    
        e.preventDefault();
     }
     fecthGame(){
        fetch('/api/jugadas')
        .then(res => res.json())
        .then(data => {
          this.setState({tasks:data});
       //   console.log(this.state.tasks);
        });
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
        <div className="juego col" style={styles.juego}>
          <div className="status" style={{display:'block', position:'static'}}>{status}</div>
          <div className="board" style={{clear: 'both', content: "", display: 'table'}}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board" style={{clear: 'both', content: "", display: 'table'}}>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board" style={{clear: 'both', content: "", display: 'table'}}>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <form onSubmit={this.addGame}>
          <button type="submit" className="btn light-blue darken-4">pausar </button>
          </form>
  
        </div>
       <div className="historia col">
       <table>
         <thead>
           <tr>
             <th>squares</th>
           </tr>
         </thead>
         <tbody>
              
         </tbody>
       </table>
  
       </div>
       </div>
      );
    }
  }
  
  class Game extends Component {
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
