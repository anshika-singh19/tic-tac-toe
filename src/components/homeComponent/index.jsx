import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Lottie from "react-lottie";
import cross from "../../assets/jsonFiles/cross.json";
import circle from "../../assets/jsonFiles/circle.json";
import style from "./style"
import { withStyles } from "@material-ui/core/styles";

const defaultOptionsCross = {
  loop: false,
  autoplay: true,
  animationData: cross,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptionsCircle = {
  loop: false,
  autoplay: true,
  animationData: circle,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
class HomeComponent extends Component {

  handleGameType = (value) => {
    this.props.history.push(`/settings/${value}`)
  }
  render() {
    const { classes } = this.props
    return (
      <Grid container justify="center" spacing={2} direction="row" alignItems="center" className={classes.homeWrapper}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1} alignItems="center">
            <Grid item >
              <Lottie
                options={defaultOptionsCross}
                style={{
                  width: 145
                }}
              />
            </Grid>
            <Grid item >
              <Lottie
                options={defaultOptionsCircle}
                style={{
                  width: 155
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="h6">
            Tic Tac Toe
          </Typography>
        </Grid>


        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginBottom: 30 }}>Choose your play mode</Typography>
          <div>

            <Chip onClick={() => this.handleGameType("withAi")} style={{ boxShadow: "0px 0px 4px 1px #0f13e2", background: "blue", color: "white", marginBottom: 10, width: 150 }}
              label={<Typography variant="subtitle1" className="font_weight_bold">With AI </Typography>} />

          </div>
          <div>
            <Chip onClick={() => this.handleGameType("withFriend")} style={{ boxShadow: "0px 0px 4px 1px #bf7a0d", width: 150 }}
              label={<Typography variant="subtitle1" className="font_weight_bold">With a friend </Typography>} variant="outlined" />
          </div>
        </Grid>
      </Grid >
    )
  }
}

export default withRouter(withStyles(style)(HomeComponent))