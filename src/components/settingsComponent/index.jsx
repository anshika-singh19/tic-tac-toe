import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import XComponent from "../xComponent";
import OComponent from "../oComponent";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Chip from "@material-ui/core/Chip";
import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";

class SettingsComponent extends Component {
  state = {
    primaryKey: ""
  }

  handleBack = () => {
    this.props.history.goBack();
  }
  handleContinue = () => {
    this.props.history.push(`/game/${this.props.match.params.gameType}/${this.state.primaryKey}`)
  }
  render() {
    return (
      <div style={{
        height: "100vh", backgroundImage: "linear-gradient(transparent,orange)", overflow: "hidden", width: "100vw",
        margin: 0
      }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton edge="start" aria-label="menu" onClick={this.handleBack}>
              <ArrowBack />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="flex_center_center" style={{ flexDirection: "column", height: "70%", }}>
          <Typography variant="h6">Pick your side</Typography>

          <RadioGroup onClick={e => {
            this.setState({
              primaryKey: e.target.value
            })
          }} row aria-label="position" name="position" defaultValue="top"
            className="flex_spacearound_center">
            <FormControlLabel
              value="x"
              control={<Radio color="primary" />}
              label={<XComponent />}
              labelPlacement="top"
            />
            <FormControlLabel
              value="o"
              control={<Radio color="primary" />}
              label={<OComponent />}
              labelPlacement="top"
            />
          </RadioGroup>
          <Button variant="outlined" onClick={this.handleContinue} disabled={!this.state.primaryKey} style={{ marginTop: 50, width: 130, borderRadius: 20 }}>
            Continue
          </Button>
        </div>

      </div >
    )
  }
}
export default withRouter(SettingsComponent);