/* eslint-disable no-mixed-spaces-and-tabs */
import {
	useAuthenticateUser,
	useModal,
	useOrganizationTeams,
} from '@app/hooks';
import { activeTeamManagersState } from '@app/stores';
import { Button, Text } from 'lib/components';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TransferTeamModal } from './transfer-team-modal';
import { RemoveModal } from './remove-modal';
import { useTranslation } from 'lib/i18n';

export const DangerZoneTeam = () => {
	const { activeTeam } = useOrganizationTeams();
	const { user, isTeamManager } = useAuthenticateUser();
	const activeTeamManagers = useRecoilValue(activeTeamManagersState);
	const [isOpenDisposeModal, setIsOpenDisposeModal] = useState(false);
	const [isOpenQuitModal, setIsOpenQuitModal] = useState(false);

	const { isOpen, closeModal, openModal } = useModal();
	const { trans } = useTranslation();

	const openQuitModal = useCallback(() => {
		setIsOpenQuitModal(true);
	}, []);

	const openDisposeModal = useCallback(() => {
		setIsOpenDisposeModal(true);
	}, []);

	return (
		<>
			<div className="flex flex-col justify-between items-center">
				<div className="w-full mt-5">
					<div className="">
						{/* Current User is the Manager of the Team and there are more that 1 Managers */}
						<div className="flex w-full items-center justify-between gap-6">
							<div className="flex-auto w-64">
								<Text className="text-xl  font-normal">Transfer Ownership</Text>
							</div>
							<div className="flex-auto w-64">
								<Text className="text-md text-gray-400 font-normal">
									Transfer full ownership of team to another user
								</Text>
							</div>
							<div className="flex-auto w-10">
								<Button
									variant="danger"
									type="submit"
									className="float-right w-full bg-[#DE5536]"
									onClick={openModal}
									disabled={!(isTeamManager && activeTeamManagers.length >= 2)}
								>
									Transfer
								</Button>
							</div>
						</div>

						{/* Current User is the Only Manager of the Team*/}
						<div className="flex w-full items-center justify-between gap-6 mt-5">
							<div className="flex-auto w-64">
								<Text className="text-xl  font-normal">Remove Team</Text>
							</div>
							<div className="flex-auto w-64">
								<Text className="text-md text-gray-400 font-normal">
									Team will be completely removed for the system and team
									members lost access
								</Text>
							</div>
							<div className="flex-auto w-10">
								<Button
									variant="danger"
									type="submit"
									className="float-right w-full bg-[#DE5536]"
									onClick={() => {
										openDisposeModal();
									}}
									disabled={!(isTeamManager && activeTeamManagers.length === 1)}
								>
									Dispose Team
								</Button>
							</div>
						</div>

						<div className="flex w-full items-center justify-between gap-6 mt-5">
							<div className="flex-auto w-64">
								<Text className="text-xl  font-normal">Quit the Team</Text>
							</div>
							<div className="flex-auto w-64">
								<Text className="text-md text-gray-400 font-normal">
									You are about to quit the team
								</Text>
							</div>
							<div className="flex-auto w-10">
								<Button
									variant="danger"
									type="submit"
									className="float-right w-full bg-[#DE5536]"
									onClick={() => {
										openQuitModal();
									}}
									disabled={
										!(
											(isTeamManager && activeTeamManagers.length > 1) ||
											(!isTeamManager &&
												activeTeam?.members?.some(
													(member) => member.employee.userId === user?.id
												))
										)
									}
								>
									Quit
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Transfer Team Modal */}
			<TransferTeamModal open={isOpen} closeModal={closeModal} />

			{/* Dispose Team Modal */}
			<RemoveModal
				open={isOpenDisposeModal}
				close={() => setIsOpenDisposeModal(false)}
				title={trans.pages.settingsTeam.DISPOSE_TEAM}
				onDispose
				team
			/>

			{/* Quit Team Modal */}
			<RemoveModal
				open={isOpenQuitModal}
				close={() => setIsOpenQuitModal(false)}
				title={trans.pages.settingsTeam.QUIT_TEAM}
				team
			/>
		</>
	);
};
