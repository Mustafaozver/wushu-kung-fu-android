import React, { useEffect, useState, useRef } from "react";
import {StatusBar} from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import Modal from "react-native-modal";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import MapView from "react-native-maps";

import Login from "./assets/screens/Login";
import Main from "./assets/screens/Main";
import Camera_ from "./assets/screens/Camera";
import ErrorPage from "./assets/screens/ErrorPage";
import Permissions from "./assets/screens/Permissions";
import QRCodeScanner from "./assets/screens/QRCodeScanner";
import BackgroundTaskPage from "./assets/screens/BackgroundTaskPage";

 


import * as Sensors from "expo-sensors";
import * as Application from "expo-application";
import * as AV from "expo-av";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as BarCodeScanner from "expo-barcode-scanner";
import * as Battery from "expo-battery";
import * as Camera from "expo-camera";
import * as Cellular from "expo-cellular";
import * as Clipboard from "expo-clipboard";
import * as Device from "expo-device";
import * as DocumentPicker from "expo-document-picker";
import * as FaceDetector from "expo-face-detector";
import * as FileSystem from "expo-file-system";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import * as Awake from "expo-keep-awake";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as NavigationBar from "expo-navigation-bar";

import NetInfo from '@react-native-community/netinfo';
//import * as Network from 'expo-network';
import * as Notifications from 'expo-notifications';
import * as ScreenCapture from 'expo-screen-capture';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SMS from 'expo-sms';
import * as Speech from 'expo-speech';
import * as SystemUI from 'expo-system-ui';
//import * as Updates from 'expo-updates';


const ATA = {
	Page: "",
	Native: {
		Sensors,
		Application,
		AV,
		BackgroundFetch,
		TaskManager,
		BarCodeScanner,
		Battery,
		Camera,
		Cellular,
		Clipboard,
		Device,
		DocumentPicker,
		FaceDetector,
		FileSystem,
		Haptics,
		ImagePicker,
		Awake,
		Location,
		MediaLibrary,
		NavigationBar,
		NetInfo,
		//Network,
		Notifications,
		ScreenCapture,
		ScreenOrientation,
		SMS,
		Speech,
		SystemUI,
		//Updates,
		
		
		
		
		
		
		
	}
};

const {
	Accelerometer,
	Barometer,
	DeviceMotion,
	Gyroscope,
	LightSensor,
	Magnetometer,
	MagnetometerUncalibrated,
	Pedometer,
} = Sensors;

export default function App(){
	const Ref = useRef(null);
	const [Page, SetPage] = useState("backgroundtask");
	
	const ParseMessage = (event)=>{
		const data = JSON.parse(event.nativeEvent.data);
		Alert.alert(data.method);
		switch(data.method){
			case"QRCODE":
				SetPage("qrcode");
			break;
			
			default:
			break;
		}
	};
	
	const JSInvoke = (method, data)=>{
		Ref.current.injectJavaScript("alert(\"" + method + "\", " + JSON.stringify(data) + ")");
	};
	
	/*setTimeout(()=>{
		JSInvoke("low", {h:1453});
	}, 5000);*/
	
	Awake.useKeepAwake();
	SystemUI.setBackgroundColorAsync("light");
	
	return (<>
		<View style={{
			flex: 1,
			
		}}>
			<StatusBar
				style="dark"
				backgroundColor="#dafb61"
			/>
			
			<View style={{ flex: 1, display: (Page === "main" ? "flex" : "none") }}>
				<Main ATA={ATA} SetPage={SetPage} Ref={Ref} ParseMessage={ParseMessage} />
			</View>
			
			<View style={{ flex: 1, display: (Page === "login" ? "flex" : "none") }}>
				<Login ATA={ATA} SetPage={SetPage} JSInvoke={JSInvoke} />
			</View>
			
			<View style={{ flex: 1, display: (Page === "qrcode" ? "flex" : "none") }}>
				<QRCodeScanner ATA={ATA} SetPage={SetPage} JSInvoke={JSInvoke} />
			</View>
			
			<View style={{ flex: 1, display: (Page === "backgroundtask" ? "flex" : "none") }}>
				<BackgroundTaskPage ATA={ATA} SetPage={SetPage} JSInvoke={JSInvoke} />
			</View>
			
			
			
			
		</View>
	</>);
};
