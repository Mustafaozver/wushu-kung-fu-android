import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import { WebView} from "react-native-webview";

//import Button from "../components/Button";

export default function Main(props){
	const wdoc = require("../www/index.html");
	//const jdoc = require("../../node_modules/react-native-webview-invoke/src/browser");
	const width = Dimensions.get('window').width;
	const height = Dimensions.get('window').height;
	
	const Ref = props.Ref;
	const ParseMessage = props.ParseMessage;
	
	const Mobile_Properties = {
		width,
		height,
		
	};
	
	const jsCode = "window.Mobile_Properties = " + JSON.stringify(Mobile_Properties) + ";";
	
	return (<>
		<View style={styles.screenTop}>
			<StatusBar style={styles.StatusBar} />
		</View>
		<View style={styles.container}>
			<WebView style={{
					margin: 0,
					alignItems: "flex-start",
					justifyContent: "flex-start",
					width,
					flex: 1,
				}}
				useWebKit
				ref={Ref}
				originWhitelist={["*"]}
				mixedContentMode="compatibility"
				scalesPageToFit={true}
				onMessage={(event)=>{
					ParseMessage(event);
				}}
				javaScriptEnabledAndroid={true}
				injectedJavaScript={jsCode}
				domStorageEnabled={true}
				source={{ uri: "http://192.168.1.52:1682/mobile2" }}
			/>
		</View>
	</>);
}

const styles = StyleSheet.create({
	screenTop: {
		margin: 0,
		marginTop: 0,
		fontSize: 18,
		fontWeight: "600",
		backgroundColor: "#80808000",
		height: 30,
		//
	},
	screenBottom: {
		margin: 0,
		marginBottom: 0,
		fontSize: 18,
		fontWeight: "600",
		backgroundColor: "#0d6efd",
		color: "#FFFFFF",
		height: 40,
		//
	},
	container: {
		flex: 1,
		backgroundColor: "#000000",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		margin: 0,
		borderColor: "#808080",
		borderWidth: 0,
		//
	},

});
