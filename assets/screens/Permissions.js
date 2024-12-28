import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";

export default function Permissions(props){
	const { ATA, SetPage } = props;
	return (<>
		<View style={styles.screenTop}>
		</View>
		<View style={styles.container}>
			<Button onPress={()=>{
				SetPage("main");
			}} title={ATA.Page} />
		</View>
		<View style={styles.screenBottom}>
		</View>
	</>);
}

const styles = StyleSheet.create({
	screenTop: {
		margin: 0,
		marginTop: 0,
		fontSize: 18,
		fontWeight: "600",
		backgroundColor: "#0d6efd",
		color: "#FFFFFF",
		height: 30,
		display: ""
		
	},
	screenBottom: {
		margin: 0,
		marginBottom: 0,
		fontSize: 18,
		fontWeight: "600",
		backgroundColor: "#0d6efd",
		color: "#FFFFFF",
		height: 60,
		
	},
	container: {
		flex: 1,
		backgroundColor: "#FFFF00",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		margin: 0,
	},

});
