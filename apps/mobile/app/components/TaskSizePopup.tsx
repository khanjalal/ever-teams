/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useState } from 'react';
import {
	View,
	ViewStyle,
	Modal,
	Animated,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { spacing, useAppTheme, typography } from '../theme';
import { useTaskSizes } from '../services/hooks/features/useTaskSizes';
import { ITaskSizeItem } from '../services/interfaces/ITaskSize';
import { BadgedTaskSize } from './SizeIcon';
import { translate } from '../i18n';
import { BlurView } from 'expo-blur';
import TaskSizeForm from '../screens/Authenticated/TaskSizeScreen/components/TaskSizeForm';

export interface Props {
	visible: boolean;
	onDismiss: () => unknown;
	sizeName: string;
	setSelectedSize: (status: ITaskSizeItem) => unknown;
	canCreateSize?: boolean;
}

const ModalPopUp = ({ visible, children, onDismiss }) => {
	const [showModal, setShowModal] = React.useState(visible);
	const scaleValue = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		toggleModal();
	}, [visible]);
	const toggleModal = () => {
		if (visible) {
			setShowModal(true);
			Animated.spring(scaleValue, {
				toValue: 1,
				useNativeDriver: true
			}).start();
		} else {
			setTimeout(() => setShowModal(false), 200);
			Animated.timing(scaleValue, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true
			}).start();
		}
	};
	return (
		<Modal animationType="fade" transparent visible={showModal}>
			<BlurView
				intensity={15}
				tint="dark"
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%'
				}}
			/>
			<TouchableWithoutFeedback onPress={() => onDismiss()}>
				<View style={$modalBackGround}>
					<Animated.View style={{ transform: [{ scale: scaleValue }] }}>{children}</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const TaskStatusPopup: FC<Props> = function FilterPopup({
	visible,
	onDismiss,
	setSelectedSize,
	sizeName,
	canCreateSize
}) {
	const { allTaskSizes } = useTaskSizes();
	const { colors, dark } = useAppTheme();
	const { createSize, updateSize } = useTaskSizes();

	const [createSizeMode, setCreateSizeMode] = useState<boolean>(false);

	const onStatusSelected = (size: ITaskSizeItem) => {
		setSelectedSize(size);
		onDismiss();
	};

	return (
		<ModalPopUp visible={visible} onDismiss={onDismiss}>
			<View
				style={{
					...styles.container,
					backgroundColor: colors.background,
					height: canCreateSize ? 460 : 396,
					overflow: canCreateSize ? 'hidden' : 'scroll'
				}}
			>
				{!createSizeMode ? (
					<>
						<Text style={{ ...styles.title, color: colors.primary }}>
							{translate('settingScreen.sizeScreen.sizes')}
						</Text>
						<FlatList
							data={allTaskSizes}
							contentContainerStyle={{ paddingHorizontal: 10 }}
							renderItem={({ item }) => (
								<Item currentSizeName={sizeName} onSizeSelected={onStatusSelected} size={item} />
							)}
							legacyImplementation={true}
							showsVerticalScrollIndicator={true}
							keyExtractor={(_, index) => index.toString()}
						/>
						{canCreateSize && (
							<TouchableOpacity
								style={{
									...styles.createButton,
									borderColor: dark ? '#6755C9' : '#3826A6'
								}}
								onPress={() => setCreateSizeMode(true)}
							>
								<Ionicons name="add" size={24} color={dark ? '#6755C9' : '#3826A6'} />
								<Text
									style={{
										...styles.btnText,
										color: dark ? '#6755C9' : '#3826A6'
									}}
								>
									{translate('settingScreen.sizeScreen.createNewSizeText')}
								</Text>
							</TouchableOpacity>
						)}
					</>
				) : (
					<TaskSizeForm
						onDismiss={() => setCreateSizeMode(false)}
						onCreateSize={createSize}
						onUpdateSize={updateSize}
						isEdit={false}
					/>
				)}
			</View>
		</ModalPopUp>
	);
};

export default TaskStatusPopup;
interface ItemProps {
	currentSizeName: string;
	size: ITaskSizeItem;
	onSizeSelected: (size: ITaskSizeItem) => unknown;
}
const Item: FC<ItemProps> = ({ currentSizeName, size, onSizeSelected }) => {
	const { colors } = useAppTheme();
	const selected = size.value === currentSizeName;

	return (
		<TouchableOpacity onPress={() => onSizeSelected(size)}>
			<View style={{ ...styles.wrapperItem, borderColor: colors.border }}>
				<View style={{ ...styles.colorFrame, backgroundColor: size.color }}>
					<BadgedTaskSize iconSize={16} TextSize={14} status={size.name} />
				</View>
				<View>
					{!selected ? (
						<Feather name="circle" size={24} color={colors.divider} />
					) : (
						<AntDesign name="checkcircle" size={24} color="#27AE60" />
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

const $modalBackGround: ViewStyle = {
	flex: 1,
	justifyContent: 'center'
};

const styles = StyleSheet.create({
	btnText: {
		color: '#3826A6',
		fontFamily: typography.primary.semiBold,
		fontSize: 16,
		fontStyle: 'normal'
	},
	colorFrame: {
		borderRadius: 10,
		height: 44,
		justifyContent: 'center',
		paddingLeft: 16,
		width: 180
	},
	container: {
		alignSelf: 'center',
		backgroundColor: '#fff',
		borderRadius: 20,
		height: 396,
		paddingHorizontal: 6,
		paddingVertical: 16,
		width: '90%'
	},
	createButton: {
		alignItems: 'center',
		alignSelf: 'center',
		borderColor: '#3826A6',
		borderRadius: 12,
		borderWidth: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		padding: 12,
		width: '80%'
	},
	title: {
		fontSize: spacing.medium - 2,
		marginBottom: 16,
		marginHorizontal: 10
	},
	wrapperItem: {
		alignItems: 'center',
		borderColor: 'rgba(0,0,0,0.13)',
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		padding: 6,
		paddingRight: 18,
		width: '100%'
	}
});
