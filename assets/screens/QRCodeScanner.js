import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

//import { BarCodeScanner } from 'expo-barcode-scanner';


export default function QRCodeScanner(props){
	const { ATA, SetPage, JSInvoke } = props;
	const BarCodeScanner = ATA.Native.BarCodeScanner.BarCodeScanner;
	
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	
	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};
		
		getBarCodeScannerPermissions();
	}, []);
	
	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		SetPage("main");
		JSInvoke("QRCODE", {
			type,
			data,
		});
	};
	
	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (<>
		<View style={styles.screenTop}>
		</View>
		<View style={styles.container}>
			<BarCodeScanner
				//barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={[StyleSheet.absoluteFillObject, styles.QRCamera]}
				type="back"
			>
				{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
				
			</BarCodeScanner>
			<Button onPress={()=>{
				SetPage("main");
			}} title="Geri" />
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
		backgroundColor: "#000000",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		margin: 0,
		
	},
	QRCamera: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//paddingTop: Constants.statusBarHeight,
		backgroundColor: '#000000',
		padding: 8,
		borderColor: "#808080",
		borderWidth: 5,
		
	},
	
});
