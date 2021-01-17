import BackgroundImage from "../../assets/images/game_home_bg.png";

export default theme => ({
  gameWraper: {
    height: "100vh",
    backgroundColor: "#1480b3",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
    width: "100vw",
    margin: 0
  },
  chip: {
    padding: 5, boxShadow: "0px 0px 4px 1px #864c02", borderRadius: 20,
  },
  gameMain: {
    flexDirection: "column", height: "90%", marginBottom: -50, marginTop: -32
  }
})