/* eslint-disable camelcase */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { StyleSheet, Text, Image, ImageStyle, TouchableOpacity } from "react-native"
import { spacing, typography, useAppTheme } from "../../../../theme"
import { GLOBAL_STYLE as GS } from "../../../../../assets/ts/styles"
import { observer } from "mobx-react-lite"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ScrollView } from "react-native-gesture-handler"
import TaskStatus from "../../../../components/TaskStatus"
import { ITeamTask } from "../../../../services/interfaces/ITask"
import { I_TeamMemberCardHook } from "../../../../services/hooks/features/useTeamMemberCard"
import { View } from "react-native-animatable"
import UserHeaderCard from "./UserHeaderCard"
import { TodayWorkedTime } from "./TodayWorkTime"

interface IUnassignedTasksList {
	memberInfo: I_TeamMemberCardHook
	setShowUnassignedList: React.Dispatch<React.SetStateAction<boolean>>
}

const UnassignedTasksList = observer(
	({ memberInfo, setShowUnassignedList }: IUnassignedTasksList) => {
		const { colors, dark } = useAppTheme()

		return (
			<View
				style={[
					{
						...GS.p3,
						...GS.positionRelative,
						backgroundColor: dark ? "#1E2025" : colors.background,
					},
					{ borderRadius: 14 },
				]}
			>
				<View style={[styles.firstContainer, { marginBottom: 16 }]}>
					<UserHeaderCard user={memberInfo.memberUser} member={memberInfo.member} />
					<View style={styles.wrapTotalTime}>
						<TodayWorkedTime isAuthUser={memberInfo.isAuthUser} memberInfo={memberInfo} />
					</View>
				</View>
				<ScrollView style={{ height: 150 }}>
					{memberInfo.memberUnassignTasks.map((task: ITeamTask, index: number) => {
						if (task?.status !== "closed") {
							return (
								<TouchableOpacity
									onPress={() => {
										memberInfo?.assignTask(task)
										setShowUnassignedList(false)
									}}
									key={index}
									style={[
										styles.unassignedTaskContainer,
										index === memberInfo?.memberUnassignTasks.length - 1 && { marginBottom: 10 },
									]}
								>
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

										<Text
											style={[styles.unasignedTaskTitle, { color: colors.primary }]}
											numberOfLines={2}
										>
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
											<TaskStatus
												iconsOnly={true}
												task={task}
												containerStyle={styles.statusContainer}
											/>
										</View>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
												width: "35%",
											}}
										>
											<View style={{ flexDirection: "row" }}>
												{task.members[0]?.user?.imageUrl ? (
													<Image
														source={{ uri: task.members[0]?.user?.imageUrl }}
														style={$usersProfile}
													/>
												) : null}
												{task.members[1]?.user?.imageUrl ? (
													<Image
														source={{ uri: task.members[1]?.user?.imageUrl }}
														style={$usersProfile2}
													/>
												) : null}
											</View>
											{/* {task.status === "closed" ? (
											<EvilIcons name="refresh" size={24} color="#8F97A1" />
										) : (
											<View>
												<Entypo name="cross" size={15} color="#8F97A1" />
											</View>
										)} */}
										</View>
									</View>
								</TouchableOpacity>
							)
						} else return null
					})}
				</ScrollView>
			</View>
		)
	},
)
export default UnassignedTasksList

const $usersProfile: ImageStyle = {
	...GS.roundedFull,
	backgroundColor: "#FFFFFF",
	width: spacing.extraLarge - spacing.tiny,
	height: spacing.extraLarge - spacing.tiny,
	borderColor: "#fff",
	borderWidth: 2,
}

const $usersProfile2: ImageStyle = {
	...GS.roundedFull,
	backgroundColor: "#F2F2F2",
	width: spacing.extraLarge - spacing.tiny,
	height: spacing.extraLarge - spacing.tiny,
	borderColor: "#fff",
	borderWidth: 2,
	position: "absolute",
	left: -15,
}

const styles = StyleSheet.create({
	firstContainer: {
		alignItems: "center",
		flexDirection: "row",
		width: "95%",
	},
	statusContainer: {
		alignItems: "center",
		backgroundColor: "#ECE8FC",
		borderColor: "transparent",
		height: 27,
		marginRight: 6,
		paddingHorizontal: 7,
		width: 50,
		zIndex: 1000,
	},
	unasignedTaskTitle: {
		color: "#282048",
		fontFamily: typography.fonts.PlusJakartaSans.semiBold,
		fontSize: 10,
		width: "67%",
	},
	unassignedTaskContainer: {
		alignItems: "center",
		borderTopColor: "rgba(0, 0, 0, 0.06)",
		borderTopWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		width: "100%",
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
	wrapTaskNumber: {
		flexDirection: "row",
	},
	wrapTotalTime: {
		alignItems: "center",
		justifyContent: "center",
		marginRight: 30,
		position: "absolute",
		right: 0,
	},
})
