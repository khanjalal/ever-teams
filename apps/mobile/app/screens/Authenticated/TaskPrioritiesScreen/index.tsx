/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react';
import { View, Text, ViewStyle, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../components';
import { AuthenticatedDrawerScreenProps } from '../../../navigators/AuthenticatedNavigator';
import { translate } from '../../../i18n';
import BottomSheet from 'reanimated-bottom-sheet';
import { typography, useAppTheme } from '../../../theme';
import { ActivityIndicator } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { ITaskPriorityItem } from '../../../services/interfaces/ITaskPriority';
import TaskPriorityForm from './components/TaskPriorityForm';
import { useTaskPriority } from '../../../services/hooks/features/useTaskPriority';
import PriorityItem from './components/PriorityItem';

export const TaskPriorityScreen: FC<AuthenticatedDrawerScreenProps<'TaskPriority'>> =
	function AuthenticatedDrawerScreen(_props) {
		const { colors, dark } = useAppTheme();
		const { navigation } = _props;
		const { isLoading, priorities, deletePriority, updatePriority, createPriority } = useTaskPriority();
		const [editMode, setEditMode] = useState(false);
		const [itemToEdit, setItemToEdit] = useState<ITaskPriorityItem>(null);
		// ref
		const sheetRef = React.useRef(null);

		// variables
		// const snapPoints = useMemo(() => ["25%", "50%"], [])
		const fall = new Animated.Value(1);
		const openForEdit = (item: ITaskPriorityItem) => {
			setEditMode(true);
			setItemToEdit(item);
			sheetRef.current.snapTo(0);
		};

		return (
			<Screen
				contentContainerStyle={[$container, { backgroundColor: colors.background2 }]}
				safeAreaEdges={['top']}
			>
				<Animated.View style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>
					<View style={[$headerContainer, { backgroundColor: colors.background }]}>
						<View style={[styles.container, { backgroundColor: colors.background }]}>
							<TouchableOpacity onPress={() => navigation.navigate('Setting')}>
								<AntDesign name="arrowleft" size={24} color={colors.primary} />
							</TouchableOpacity>
							<Text style={[styles.title, { color: colors.primary }]}>
								{translate('settingScreen.priorityScreen.mainTitle')}
							</Text>
						</View>
					</View>
					<View style={{ width: '100%', padding: 20, maxHeight: '80%' }}>
						<View>
							<Text style={styles.title2}>
								{translate('settingScreen.priorityScreen.listPriorities')}
							</Text>
						</View>
						<View style={{ minHeight: 200, justifyContent: 'center', alignItems: 'center' }}>
							{isLoading ? <ActivityIndicator size={'small'} color={'#3826A6'} /> : null}
							{!isLoading && priorities?.total === 0 ? (
								<Text style={{ ...styles.noStatusTxt, color: colors.primary }}>
									{translate('settingScreen.priorityScreen.noActivePriorities')}
								</Text>
							) : null}

							<FlatList
								bounces={false}
								showsVerticalScrollIndicator={false}
								style={{ width: '100%' }}
								data={priorities?.items}
								renderItem={({ item }) => (
									<PriorityItem
										openForEdit={() => openForEdit(item)}
										onDeletePriority={() => deletePriority(item.id)}
										priority={item}
									/>
								)}
								keyExtractor={(_, index) => index.toString()}
								ListFooterComponent={() => <View style={{ marginBottom: 40 }} />}
							/>
						</View>
					</View>
					<TouchableOpacity
						style={{ ...styles.createButton, borderColor: dark ? '#6755C9' : '#3826A6' }}
						onPress={() => {
							setEditMode(false);
							sheetRef.current.snapTo(0);
						}}
					>
						<Ionicons name="add" size={24} color={dark ? '#6755C9' : '#3826A6'} />
						<Text style={{ ...styles.btnText, color: dark ? '#6755C9' : '#3826A6' }}>
							{translate('settingScreen.priorityScreen.createNewPriorityText')}
						</Text>
					</TouchableOpacity>
				</Animated.View>
				<BottomSheet
					ref={sheetRef}
					snapPoints={[452, 0]}
					borderRadius={24}
					initialSnap={1}
					callbackNode={fall}
					enabledGestureInteraction={true}
					renderContent={() => (
						<TaskPriorityForm
							item={itemToEdit}
							onDismiss={() => {
								setEditMode(false);
								sheetRef.current.snapTo(1);
							}}
							onUpdatePriority={updatePriority}
							onCreatePriority={createPriority}
							isEdit={editMode}
						/>
					)}
				/>
			</Screen>
		);
	};

const $container: ViewStyle = {
	flex: 1
};
const $headerContainer: ViewStyle = {
	padding: 20,
	paddingVertical: 16,
	shadowColor: 'rgba(0, 0, 0, 0.6)',
	shadowOffset: {
		width: 0,
		height: 2
	},
	shadowOpacity: 0.07,
	shadowRadius: 1.0,
	elevation: 1,
	zIndex: 10
};

const styles = StyleSheet.create({
	btnText: {
		color: '#3826A6',
		fontFamily: typography.primary.semiBold,
		fontSize: 18,
		fontStyle: 'normal'
	},
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%'
	},
	createButton: {
		alignItems: 'center',
		alignSelf: 'center',
		borderColor: '#3826A6',
		borderRadius: 12,
		borderWidth: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 24,
		padding: 16,
		width: '90%'
	},
	noStatusTxt: {
		color: '#7E7991',
		fontFamily: typography.primary.semiBold,
		fontSize: 16
	},
	title: {
		alignSelf: 'center',
		fontFamily: typography.primary.semiBold,
		fontSize: 16,
		textAlign: 'center',
		width: '80%'
	},
	title2: {
		color: '#7E7991',
		fontFamily: typography.primary.semiBold,
		fontSize: 16,
		marginBottom: 8
	}
});
