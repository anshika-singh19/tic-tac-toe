import React, { Component } from 'react'
import Board from "../boardComponent";
import Chip from "@material-ui/core/Chip";
import { Typography } from '@material-ui/core';
import { withRouter, Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import BackgroundImage from "../../assets/images/game_home_bg.png";
import Refresh from "@material-ui/icons/Refresh";
import Settings from "@material-ui/icons/Settings";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class GameComponent extends Component {

  state = {
    board: [[null, null, null], [null, null, null], [null, null, null]],
    isPrimaryNext: true,
    winner: "",
    player1Wins: 0,
    player2Wins: 0
  }
  findWinner = (squares) => {
    const cases = [
      [[0, 0], [0, 1], [0, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]]
    ];
    let winnerKey = "";
    for (let i = 0; i < cases.length; i++) {
      const [[a1, a2], [b1, b2], [c1, c2]] = cases[i];
      if (squares[a1][a2] && squares[b1][b2] && squares[c1][c2] && (squares[a1][a2] === squares[b1][b2]) && (squares[a1][a2] === squares[c1][c2])) {
        winnerKey = squares[a1][a2]
      }
    }
    if (winnerKey) {
      this.setState({
        winner: winnerKey === this.props.match.params.primaryKey ? "Player 1" : "Player2",
        player1Wins: (winnerKey === this.props.match.params.primaryKey && this.state.player1Wins + 1) || this.state.player1Wins,
        player2Wins: (winnerKey !== this.props.match.params.primaryKey && this.state.player2Wins + 1) || this.state.player2Wins,
      })
    }
    else if (squares.every(item => !item.includes(null)) && !winnerKey) {
      this.setState({
        winner: "none"
      })
    }
  }

  handleClick = (index, id) => {

    const newBoard = [...this.state.board];

    if (newBoard[index][id]) return;

    // Put an X or an O in the clicked square
    newBoard[index][id] = this.state.isPrimaryNext ? (this.props.match.params.primaryKey === "x" ? "x" : "o") : (this.props.match.params.primaryKey === "x" ? "o" : "x");

    this.setState({
      board: newBoard,
      isPrimaryNext: !this.state.isPrimaryNext
    }, function () {
      this.findWinner(newBoard)
    })
  };
  handleRefresh = () => {
    this.setState({
      board: [[null, null, null], [null, null, null], [null, null, null]],
      winner: ""
    })
  }
  handleBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div style={{
        height: "100vh", backgroundImage: `url(${BackgroundImage})`, backgroundRepeat: "no-repeat",
        backgroundSize: "cover", overflow: "hidden", width: "100vw",
        margin: 0
      }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton edge="start" aria-label="menu" onClick={this.handleBack}>
              <ArrowBack style={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "90%", marginBottom: -50, marginTop: -32

        }}>
          <div style={{
            display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: 15, width: "100%"
          }}>
            <Typography variant="button" style={{ color: "white" }}> Player 1</Typography>
            <Chip style={{ boxShadow: "0px 0px 4px 1px #1a6177", color: "white" }}
              label={`${this.state.player1Wins} -${this.state.player2Wins} `} variant="outlined" />
            < Typography variant="button" style={{ color: "white" }}> Player 2</Typography>
          </div>
          <Board board={this.state.board} handleClick={this.handleClick} />
        </div >
        <div style={{
          display: "flex", justifyContent: "space-around", alignItems: "baseline", margin: "auto",
          width: 100
        }}>
          <Link to="/" style={{ textDecoration: 'none', }}>
            <Settings style={{ padding: 5, boxShadow: "0px 0px 4px 1px #864c02", borderRadius: 20, color: "black" }} />
          </Link>
          <Refresh onClick={this.handleRefresh} style={{ padding: 5, boxShadow: "0px 0px 4px 1px #864c02", borderRadius: 20, color: "inherit" }} />
        </div>
        <Dialog

          open={!!this.state.winner}
          onClose={() => this.setState({ winner: "" })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Game Over!!</DialogTitle>
          <DialogContent>
            {(this.state.winner !== "none" && <DialogContentText id="alert-dialog-description">
              {this.state.winner} is the winner
          </DialogContentText>) || <DialogContentText id="alert-dialog-description">
                Match Draw
          </DialogContentText>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRefresh} color="primary">
              Play Again
          </Button>
            <Button onClick={this.handleBack} color="primary" autoFocus>
              Go Back
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(GameComponent);