import React, { Component } from 'react'

import Grid from "@material-ui/core/Grid";
import XComponent from "../xComponent";
import OComponent from "../oComponent";

export default class Index extends Component {

  render() {
    return (
      <Grid container direction='row' spacing={0} style={{
        height: "65%", margin: 10, width: "95%", padding: 14,
        background: "white", borderRadius: 10, boxShadow: "0px 0px 4px 3px #285369",
      }}>
        {this.props.board.map((boardItem, index) =>
          <Grid item xs={12} key={index} style={{ height: "33%" }}>
            <Grid container direction='row' spacing={0} style={{ height: "100%", width: "100%", borderBottom: index !== 2 && "2px solid #d0d0d0" }}>
              {boardItem.map((item, ind) =>
                <Grid item xs={4} key={ind} onClick={() => this.props.handleClick(index, ind)} style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center", background: "white", borderRight: ind !== 2 && "2px solid #d0d0d0"
                }}>
                  {item === "x" && <XComponent />}
                  {item === "o" && <OComponent />}
                </Grid>
              )}
            </Grid>
          </Grid>
        )
        }
      </Grid>


    )
  }
}
