import {StyleSheet} from 'react-native'


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: '98%'
  },
  containerRow: {
    flex: 4,
    height: '50%',
    width: '98%',
    flexDirection: "row",
    flexWrap: 'wrap-reverse',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 10,
  },

  image: {

    height: 125,
    width: 105,
    opacity: 1,
    marginLeft: "10%",
    marginTop: '5%',
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: "#FFC857",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: '#f0ead6',
  
   
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    color: "#FFC857",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingTop: "5%",
    marginBottom: "-5%",
  },
});