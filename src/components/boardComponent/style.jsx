export default theme => ({
  boardWrapper: {
    height: "65%",
    margin: 10,
    width: "95%",
    padding: 14,
    background: "white",
    borderRadius: 10,
    boxShadow: "0px 0px 4px 3px #285369",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },
  boardBg: {
    background: "white",
  }
})