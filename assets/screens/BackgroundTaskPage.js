import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";



export default function BackgroundTaskPage(props){
	const [isRegistered, setIsRegistered] = React.useState(false);
	const [status, setStatus] = React.useState(null);
	
	const {TaskManager, BackgroundFetch, Notifications } = props.ATA.Native;
	
	const GetAPIm = ()=>{
		const xhr = new XMLHttpRequest();
	};
	
	const BACKGROUND_FETCH_TASK = 'background-fetch';
	
	TaskManager.defineTask(BACKGROUND_FETCH_TASK, async(arg)=>{
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Title",
				body: "Body",
			},
			trigger: null,
		})
		return BackgroundFetch.BackgroundFetchResult.NewData;
	});
	
	async function registerBackgroundFetchAsync() {
		return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
			minimumInterval: 60, // 60 sec
			stopOnTerminate: false, // android only,
			startOnBoot: true, // android only
		});
	}
	
	async function unregisterBackgroundFetchAsync() {
		return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
	}
	
	React.useEffect(() => {
		checkStatusAsync();
	}, []);
	
	const checkStatusAsync = async () => {
		const status = await BackgroundFetch.getStatusAsync();
		const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
		setStatus(status);
		setIsRegistered(isRegistered);
	};
	
	const toggleFetchTask = async () => {
		if (isRegistered) {
			await unregisterBackgroundFetchAsync();
		} else {
			await registerBackgroundFetchAsync();
		}
		
		checkStatusAsync();
	};
	const { ATA, SetPage } = props;
	return (<>
		<View style={styles.screenTop}>
		</View>
		<View style={styles.container}>
			<View style={styles.screen}>
				<View style={styles.textContainer}>
					<Text>
						Background fetch status:{' '}
						<Text>
							{status && BackgroundFetch.BackgroundFetchStatus[status]}
						</Text>
					</Text>
					<Text>
						Background fetch task name:{' '}
						<Text>
							{isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
						</Text>
					</Text>
				</View>
				<View></View>
				<Button
					title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
					onPress={toggleFetchTask}
				/>
			</View>
			<Button onPress={() => {
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
