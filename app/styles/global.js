
import { Platform } from 'react-native'

export default global = {
  screen: {
    flex: 1
  },
  header: {
    flex: 3,
    backgroundColor: "#03A9F4",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios:{
        paddingTop: 20
      }
    })
  },
  headerText: {
    fontSize: 30,
    color: "white"
  },
  button: {
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    ...Platform.select({
      android: {backgroundColor: "#03A9F4"}
    })
  },
  buttonText: {
    color: "#03A9F4",
    fontSize: 14,
    ...Platform.select({
      android: {
        color: "white"
      }
    })
  }
}
