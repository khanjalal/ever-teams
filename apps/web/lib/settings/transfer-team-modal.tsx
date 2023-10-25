import { useAuthenticateUser, useOrganizationTeams } from '@app/hooks';
import { IOrganizationTeamMember } from '@app/interfaces';
import { activeTeamManagersState } from '@app/stores';
import { BackButton, Button, Card, Modal, Text } from 'lib/components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { TransferTeamDropdown } from './transfer-team/transfer-team-dropdown';

/**
 * Transfer team modal
 */
export function TransferTeamModal({ open, closeModal }: { open: boolean; closeModal: () => void }) {
	const { t } = useTranslation();
	const activeTeamManagers = useRecoilValue(activeTeamManagersState);
	const { activeTeam, editOrganizationTeam, editOrganizationTeamLoading } = useOrganizationTeams();
	const { user } = useAuthenticateUser();

	const [selectedMember, setSelectedMember] = useState<IOrganizationTeamMember>();

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (activeTeam && selectedMember) {
				editOrganizationTeam({
					id: activeTeam.id,
					managerIds: [
						...activeTeamManagers
							.filter((manager) => manager.employee.userId !== user?.id)
							.map((manager) => manager.employeeId),
						selectedMember.id
					],
					memberIds: activeTeam.members.map((member) => member.employeeId),
					tenantId: activeTeam.tenantId,
					organizationId: activeTeam.organizationId,
					name: activeTeam.name
				})
					.then(closeModal)
					.catch(closeModal);
			}
		},
		[activeTeam, selectedMember, user, activeTeamManagers, closeModal, editOrganizationTeam]
	);

	return (
		<Modal isOpen={open} closeModal={closeModal}>
			<form className="w-[98%] md:w-[530px]" autoComplete="off" onSubmit={handleSubmit}>
				<Card className="w-full" shadow="custom">
					<div className="flex flex-col items-center justify-between">
						<Text.Heading as="h3" className="text-center">
							{t('common.TRANSFER_TEAM')}
						</Text.Heading>

						<div className="w-full mt-5">
							<TransferTeamDropdown
								setSelectedMember={setSelectedMember}
								members={activeTeam?.members
									?.filter((member) => member.employee.userId !== user?.id)
									?.map((member) => ({
										id: member.employeeId,
										name: member?.employee?.user?.name || '',
										title: member?.employee?.user?.name || '',
										userId: member?.employee?.userId
									}))}
								selectedMember={selectedMember}
							/>
						</div>

						<div className="flex items-center justify-between w-full mt-3">
							<BackButton onClick={closeModal} />

							<Button
								type="submit"
								disabled={editOrganizationTeamLoading}
								loading={editOrganizationTeamLoading}
							>
								{t('common.TRANSFER')}
							</Button>
						</div>
					</div>
				</Card>
			</form>
		</Modal>
	);
}
