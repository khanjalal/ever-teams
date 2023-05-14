/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import React, { FC, useMemo, useState } from "react"
import { View, StyleSheet, Text, Image, ImageStyle, TouchableOpacity } from "react-native"
import { Entypo, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { GLOBAL_STYLE as GS } from "../../../../../assets/ts/styles"
import { colors, spacing, typography, useAppTheme } from "../../../../theme"
import DeletePopUp from "./DeletePopUp"
import { ITaskStatus, ITeamTask } from "../../../../services/interfaces/ITask"
import { observer } from "mobx-react-lite"
import TaskStatus from "../../../../components/TaskStatus"
import { useTeamTasks } from "../../../../services/hooks/features/useTeamTasks"

export interface Props {
	task: ITeamTask
	handleActiveTask: (value: ITeamTask) => unknown
}

const IndividualTask: FC<Props> = observer(({ task, handleActiveTask }) => {
	const { colors } = useAppTheme()
	const [showDel, setShowDel] = useState(false)
	const { updateTask } = useTeamTasks()

	const onCloseTask = async () => {
		const value: ITaskStatus = "Closed"
		const EditTask = {
			...task,
			status: value,
		}
		await updateTask(EditTask, task.id)
	}

	const reOpen = async () => {
		const value: ITaskStatus = "Todo"
		const EditTask = {
			...task,
			status: value,
		}
		await updateTask(EditTask, task.id)
	}

	// Display two fist users profile image
	const assigneeImg1 = useMemo(() => task?.members[0]?.user?.imageUrl, [task])
	const assigneeImg2 = useMemo(() => task?.members[1]?.user?.imageUrl, [task])

	return (
		<TouchableOpacity style={styles.container} onPress={() => handleActiveTask(task)}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					width: "60%",
				}}
			>
				<View style={styles.wrapTaskNumber}>
					<View style={styles.wrapBugIcon}>
						<MaterialCommunityIcons name="bug-outline" size={14} color="#fff" />
					</View>
					<Text
						style={{ color: "#9490A0", fontSize: 12, marginLeft: 5 }}
					>{`#${task.taskNumber}`}</Text>
				</View>

				<Text style={[styles.taskTitle, { color: colors.primary }]} numberOfLines={2}>
					{task.title}
				</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					width: "40%",
					alignItems: "center",
					zIndex: 1000,
					justifyContent: "space-between",
				}}
			>
				<View>
					<TaskStatus iconsOnly={true} task={task} containerStyle={styles.statusContainer} />
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						width: "27%",
					}}
				>
					<View style={{ flexDirection: "row" }}>
						{assigneeImg1 ? <Image source={{ uri: assigneeImg1 }} style={$usersProfile} /> : null}
						{assigneeImg2 ? <Image source={{ uri: assigneeImg2 }} style={$usersProfile2} /> : null}
					</View>
					{task.status === "Closed" ? (
						<EvilIcons name="refresh" size={24} color="#8F97A1" onPress={() => reOpen()} />
					) : (
						<Entypo name="cross" size={15} color="#8F97A1" onPress={() => setShowDel(!showDel)} />
					)}
					{showDel && <DeletePopUp onCloseTask={onCloseTask} setShowDel={setShowDel} />}
				</View>
			</View>
		</TouchableOpacity>
	)
})

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderTopColor: "rgba(0, 0, 0, 0.06)",
		borderTopWidth: 1,
		width: "100%",
		justifyContent: "space-between",
		paddingVertical: 12,
		zIndex: 1000,
	},
	wrapBugIcon: {
		alignItems: "center",
		backgroundColor: "#C24A4A",
		borderRadius: 3,
		height: 20,
		justifyContent: "center",
		marginRight: 3,
		width: 20,
	},
	statusDisplay: {
		flexDirection: "row",
	},
	taskTitle: {
		color: "#282048",
		fontSize: 10,
		width: "67%",
		fontFamily: typography.fonts.PlusJakartaSans.semiBold,
	},
	statusContainer: {
		paddingHorizontal: 7,
		alignItems: "center",
		marginRight: 6,
		width: 50,
		height: 27,
		backgroundColor: "#ECE8FC",
		borderColor: "transparent",
		zIndex: 1000,
	},
	wrapTaskNumber: {
		flexDirection: "row",
	},
})

const $usersProfile: ImageStyle = {
	...GS.roundedFull,
	backgroundColor: colors.background,
	width: spacing.extraLarge - spacing.tiny,
	height: spacing.extraLarge - spacing.tiny,
	borderColor: "#fff",
	borderWidth: 2,
}

const $usersProfile2: ImageStyle = {
	...GS.roundedFull,
	backgroundColor: colors.background,
	width: spacing.extraLarge - spacing.tiny,
	height: spacing.extraLarge - spacing.tiny,
	borderColor: "#fff",
	borderWidth: 2,
	position: "absolute",
	left: -15,
}

export default IndividualTask
