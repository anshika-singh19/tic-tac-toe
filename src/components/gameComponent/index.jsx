import React, { Component } from 'react'
import Board from "../boardComponent";
import Chip from "@material-ui/core/Chip";
import { Typography } from '@material-ui/core';
import { withRouter, Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Refresh from "@material-ui/icons/Refresh";
import Settings from "@material-ui/icons/Settings";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import style from "./style"
import { withStyles } from "@material-ui/core/styles";



class GameComponent extends Component {
  state = {
    board: [[null, null, null], [null, null, null], [null, null, null]],
    isPrimaryNext: true,
    winner: "",
    player1Wins: 0,
    player2Wins: 0
  }
  componentDidMount = () => {

  }
  findWinner = (box) => {
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
      if (box[a1][a2] && box[b1][b2] && box[c1][c2] && (box[a1][a2] === box[b1][b2]) && (box[a1][a2] === box[c1][c2])) {
        winnerKey = box[a1][a2]
      }
    }
    if (winnerKey) {
      this.setState({
        winner: winnerKey === this.props.match.params.primaryKey ? "Player 1" : "Player2",
        player1Wins: (winnerKey === this.props.match.params.primaryKey && this.state.player1Wins + 1) || this.state.player1Wins,
        player2Wins: (winnerKey !== this.props.match.params.primaryKey && this.state.player2Wins + 1) || this.state.player2Wins,
      })
    }
    else if (box.every(item => !item.includes(null)) && !winnerKey) {
      this.setState({
        winner: "none"
      })
    }

    if (this.props.match.params.gameType === "withAi" && box.some(item => item.includes(null)) && !this.state.isPrimaryNext) {
      this.handleAiTurn(box);
    }
  }

  handleAiTurn = (box) => {
    setTimeout(() => {
      let index = 0
      let id = 0
      while (box[index][id]) {
        index = Math.floor(Math.random() * 3);
        id = Math.floor(Math.random() * 3);
      }
      this.handleClick(index, id);
    }, 1000);
  }

  handleClick = (index, id) => {

    const newBoard = [...this.state.board];

    if (newBoard[index][id]) return;

    newBoard[index][id] = this.state.isPrimaryNext ? (this.props.match.params.primaryKey === "x" ? "x" : "o")
      : (this.props.match.params.primaryKey === "x" ? "o" : "x");

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
    const { classes } = this.props

    return (
      <div className={classes.gameWraper}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton edge="start" aria-label="menu" onClick={this.handleBack}>
              <ArrowBack className="white" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className={`flex_center_center ${classes.gameMain}`}>
          <div className="flex_spacearound_center" style={{ marginBottom: 15, width: "100%" }}>
            <Typography variant="button" className="white"> Player 1</Typography>
            <Chip style={{ boxShadow: "0px 0px 4px 1px #1a6177", color: "white" }}
              label={`${this.state.player1Wins} -${this.state.player2Wins} `} variant="outlined" />
            < Typography variant="button" className="white"> Player 2</Typography>
          </div>
          <Board board={this.state.board} handleClick={this.handleClick}
            gameType={this.props.match.params.gameType} isPrimaryNext={this.state.isPrimaryNext} />
        </div >

        <div className="flex_spacearound_baseline" style={{ margin: "auto", width: 100 }}>
          <Link to="/" style={{ textDecoration: 'none', }}>
            <Settings className={`black ${classes.chip}`} />
          </Link>
          <Refresh onClick={this.handleRefresh} className={`black ${classes.chip}`} />
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

export default withRouter(withStyles(style)(GameComponent));