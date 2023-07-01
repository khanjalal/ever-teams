import moment from 'moment';
import { Avatar, InputField, Text } from 'lib/components';
import { imgTitle } from '@app/helpers';
import { clsxm } from '@app/utils';
import stc from 'string-to-color';
import { OT_Member, RoleNameEnum, OT_Role } from '@app/interfaces';
import { Paginate } from 'lib/components/pagination';
import { usePagination } from '@app/hooks/features/usePagination';
import { MemberTableStatus } from './member-table-status';
import { TableActionPopover } from './table-action-popover';
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useSettings } from '@app/hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationTeamsState, activeTeamIdState } from '@app/stores';

export const MemberTable = ({ members }: { members: OT_Member[] }) => {
	const {
		total,
		onPageChange,
		itemsPerPage,
		itemOffset,
		endOffset,
		setItemsPerPage,
		currentItems,
	} = usePagination<OT_Member>(members);
	const { updateAvatar } = useSettings();

	const activeTeamId = useRecoilValue(activeTeamIdState);
	const [organizationTeams, setOrganizationTeams] = useRecoilState(
		organizationTeamsState
	);
	const [editMember, setEditMember] = useState<OT_Member | null>(null);
	const handleEdit = (member: OT_Member) => {
		setEditMember(member);
	};

	const handelNameChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const name = event.target.value || '';
			if (name === editMember?.employee.fullName) {
				return;
			}

			const names = name.split(' ');
			const tempMember: OT_Member | null = cloneDeep(editMember);
			if (tempMember && tempMember.employee.user) {
				tempMember.employee.fullName = name;
				tempMember.employee.user.firstName = names[0] || '';
				tempMember.employee.user.lastName = names[1] || '';
				setEditMember(tempMember);
			}
		},
		[editMember]
	);
	const handleEditMemberSave = useCallback(() => {
		if (editMember) {
			updateAvatar({
				firstName: editMember?.employee?.user?.firstName || '',
				lastName: editMember?.employee?.user?.lastName || '',
				id: editMember.employee.userId,
			}).then(() => {
				const teamIndex = organizationTeams.findIndex(
					(team) => team.id === activeTeamId
				);
				const tempOrganizationTeams = cloneDeep(organizationTeams);
				const memberIndex = tempOrganizationTeams[teamIndex].members.findIndex(
					(member) => member.id === editMember.id
				);

				tempOrganizationTeams[teamIndex].members[memberIndex] = editMember;
				setOrganizationTeams(tempOrganizationTeams);
				setEditMember(null);
			});
		}
	}, [
		editMember,
		organizationTeams,
		activeTeamId,
		setOrganizationTeams,
		updateAvatar,
	]);
	const handleOnKeyUp = (event: KeyboardEvent<HTMLElement>) => {
		if (event.key === 'Enter') {
			handleEditMemberSave();
		}
	};

	return (
		<div>
			<div className="overflow-x-auto  sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:bg-dark--theme-light">
					<thead className="text-xs text-gray-700 uppercase border-b">
						<tr>
							<th
								scope="col"
								className="pl-0 py-3 text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-56"
							>
								Name
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-40"
							>
								Position
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-44"
							>
								Roles
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-48"
							>
								Joined / Left
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-32"
							>
								Status
							</th>
							<th
								scope="col"
								className="text-sm font-normal capitalize text-[#B1AEBC] dark:text-white w-6"
							></th>
						</tr>
					</thead>
					<tbody className="dark:bg-dark--theme-light">
						{currentItems.map((member, index) => (
							<tr
								className="bg-white dark:bg-dark--theme-light dark:border-gray-700"
								key={index}
							>
								<th
									scope="row"
									className="flex items-center pl-0 py-4 text-gray-900 whitespace-nowrap dark:text-white"
								>
									{member.employee.user?.imageId ? (
										<Avatar
											size={20}
											className="relative cursor-pointer"
											imageUrl={
												member.employee.user?.image?.thumbUrl ||
												member.employee.user?.image?.fullUrl ||
												member.employee.user?.imageUrl
											}
											alt="User Avatar"
										/>
									) : member.employee.user?.name ? (
										<div
											className={clsxm(
												'w-[20px] h-[20px]',
												'flex justify-center items-center',
												'rounded-full text-xs text-default dark:text-white',
												'shadow-md font-normal'
											)}
											style={{
												backgroundColor: `${stc(
													member.employee.user?.name || ''
												)}80`,
											}}
										>
											{imgTitle(member.employee.user?.name)}
										</div>
									) : (
										''
									)}
									<div className="pl-3 flex flex-col gap-1">
										{editMember && editMember.id === member.id ? (
											<InputField
												type="text"
												placeholder={'Enter Name'}
												className="mb-0 h-5 border-none pl-0 py-0 rounded-none border-b-1"
												noWrapper
												autoFocus
												defaultValue={member.employee.fullName}
												onBlur={handleEditMemberSave}
												onChange={handelNameChange}
												onKeyUp={handleOnKeyUp}
											/>
										) : (
											<div
												className="text-sm font-semibold text-[#282048] dark:text-white"
												onDoubleClick={() => {
													handleEdit(member);
												}}
											>
												{member.employee.fullName}
											</div>
										)}
										<Text className="text-xs dark:text-white text-[#B1AEBC] font-normal">
											{member.employee.user?.email || ''}
										</Text>
									</div>
								</th>
								<td className="text-sm font-semibold py-4 text-[#282048] dark:text-white">
									{/* TODO Position */}-
								</td>
								<td className="text-sm font-semibold py-4 text-[#282048] dark:text-white">
									<span className="capitalize">
										{getRoleString(member.role)}
									</span>
								</td>
								<td className="text-sm font-semibold py-4 text-[#282048] dark:text-white">
									{/* 12 Feb 2020 12:00 pm */}
									{moment(member.employee.createdAt).format(
										'DD MMM YYYY hh:mm a'
									)}
								</td>
								<td className="text-sm font-semibold py-4">
									{/* TODO dynamic */}
									<MemberTableStatus
										status={
											member.employee.isActive
												? 'Member'
												: !member.employee.isActive
												? 'Suspended'
												: 'Left'
										}
									/>
								</td>
								<td className="flex py-4 justify-center items-center absolute">
									<TableActionPopover member={member} handleEdit={handleEdit} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Paginate
				total={total}
				onPageChange={onPageChange}
				pageCount={1} // Set Static to 1 - It will be calculated dynamically in Paginate component
				itemsPerPage={itemsPerPage}
				itemOffset={itemOffset}
				endOffset={endOffset}
				setItemsPerPage={setItemsPerPage}
			/>
		</div>
	);
};

const getRoleString = (role: OT_Role | undefined) => {
	if (!role) {
		return 'member';
	}

	let roleString = '';
	switch (role.name) {
		case RoleNameEnum.SUPER_ADMIN:
			roleString = 'Manager (Admin)';
			break;
		case RoleNameEnum.MANAGER:
			roleString = 'Manager';
			break;
		case RoleNameEnum.VIEWER:
			roleString = 'Viewer';
			break;
		default:
			roleString = 'Member';
			break;
	}

	return roleString;
};