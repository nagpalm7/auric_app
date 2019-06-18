import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 16
    },
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loginContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 100,
    },
    logo:{
        marginBottom:20,
        width: 229,
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    loginForm:{
        width: '100%',
    },
    item:{
        marginLeft:16,
        marginRight:16
    },
    loginButton:{
        margin: 16,
        marginTop:40,
        backgroundColor:'#cd9930',
        color: '#fff'
    }
})