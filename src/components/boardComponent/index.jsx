import React from 'react'

import Grid from "@material-ui/core/Grid";
import XComponent from "../xComponent";
import OComponent from "../oComponent";
import style from "./style"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(style);

export default function BoardComponent(props) {
  const classes = useStyles();

  const handleBoxClick = (index, ind) => {
    if (props.gameType !== "withAi") {
      props.handleClick(index, ind);
    }
    else {
      if (props.isPrimaryNext) {
        props.handleClick(index, ind);
      }
    }
  }

  return (
    <Grid container direction='row' spacing={0} className={classes.boardWrapper}>
      {props.board.map((boardItem, index) =>
        <Grid item xs={12} key={index} style={{ height: "33%" }}>
          <Grid
            container
            direction='row'
            spacing={0}
            className="height_width_100"
            style={{ borderBottom: index !== 2 && "2px solid #d0d0d0" }}>
            {boardItem.map((item, ind) =>
              <Grid
                item
                xs={4}
                key={ind}
                onClick={() => handleBoxClick(index, ind)}
                className="flex_center_center"
                style={{ borderRight: ind !== 2 && "2px solid #d0d0d0" }}
              >
                {item === "x" && <XComponent />}
                {item === "o" && <OComponent />}
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
