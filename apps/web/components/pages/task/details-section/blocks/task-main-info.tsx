import { calculateRemainingDays, formatDateString } from '@app/helpers';
import { useOrganizationTeams, useSyncRef, useTeamMemberCard, useTeamTasks } from '@app/hooks';
import { ITeamTask, OT_Member } from '@app/interfaces';
import { detailedTaskState } from '@app/stores';
import { clsxm } from '@app/utils';
import { Popover, Transition } from '@headlessui/react';
import { TrashIcon } from 'lib/components/svgs';
import { ActiveTaskIssuesDropdown } from 'lib/features';
import { useTranslation } from 'react-i18next';
import { Fragment, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import ProfileInfo from '../components/profile-info';
import TaskRow from '../components/task-row';

import { DatePicker } from 'components/ui/DatePicker';
import Link from 'next/link';

const TaskMainInfo = () => {
	const [task] = useRecoilState(detailedTaskState);
	const { activeTeam } = useOrganizationTeams();
	const { t } = useTranslation();

	return (
		<section className="flex flex-col gap-4 p-[0.9375rem]">
			<TaskRow labelIconPath="/assets/svg/calendar-2.svg" labelTitle={t('pages.taskDetails.TYPE_OF_ISSUE')}>
				<ActiveTaskIssuesDropdown
					key={task?.id}
					task={task}
					showIssueLabels={true}
					sidebarUI={true}
					taskStatusClassName="rounded-[0.1875rem] border-none h-5 text-[0.5rem] 3xl:text-xs"
					forParentChildRelationship={true}
				/>
			</TaskRow>
			<TaskRow labelIconPath="/assets/svg/profile.svg" labelTitle={t('pages.taskDetails.CREATOR')}>
				{task?.creator && (
					<Link
						title={`${task?.creator?.firstName || ''} ${task?.creator?.lastName || ''}`}
						href={`/profile/${task.creatorId}`}
					>
						<ProfileInfo
							profilePicSrc={task?.creator?.imageUrl}
							names={`${task?.creator?.firstName || ''} ${task?.creator?.lastName || ''}`}
						/>
					</Link>
				)}
			</TaskRow>
			<TaskRow labelIconPath="/assets/svg/people.svg" labelTitle={t('pages.taskDetails.ASSIGNEES')}>
				<div className="flex flex-col gap-3">
					{task?.members?.map((member: any) => (
						<Link key={member.id} title={member.fullName} href={`/profile/${member.userId}`}>
							<ProfileInfo names={member.fullName} profilePicSrc={member.user?.imageUrl} />
						</Link>
					))}

					{ManageMembersPopover(activeTeam?.members || [], task)}
				</div>
			</TaskRow>

			<DueDates />
		</section>
	);
};

const DateCustomInput = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>((props, ref) => {
	return <div {...props} ref={ref} />;
});

DateCustomInput.displayName = 'DateCustomInput';

function DueDates() {
	const { updateTask } = useTeamTasks();
	const [task] = useRecoilState(detailedTaskState);
	const { t } = useTranslation();
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [dueDate, setDueDate] = useState<Date | null>(null);

	const $startDate = useSyncRef(startDate || (task?.startDate ? new Date(task.startDate) : null));

	const $dueDate = useSyncRef(dueDate || (task?.dueDate ? new Date(task.dueDate) : null));

	const remainingDays = task ? calculateRemainingDays(new Date().toISOString(), task.dueDate) : undefined;

	const handleResetDate = useCallback(
		(date: 'startDate' | 'dueDate') => {
			if (date === 'startDate') {
				setStartDate(null);
				$startDate.current = null;
			}
			if (date === 'dueDate') {
				setDueDate(null);
				$dueDate.current = null;
			}

			if (task) {
				updateTask({ ...task, [date]: null });
			}
		},
		[$startDate, $dueDate, task, updateTask]
	);

	return (
		<div className="flex flex-col gap-[0.4375rem]">
			<TaskRow labelIconPath="/assets/svg/calendar-2.svg" labelTitle={t('pages.taskDetails.START_DATE')}>
				<DatePicker
					// Button Props
					buttonVariant={'link'}
					buttonClassName={'p-0 decoration-transparent h-[0.875rem] w-20'}
					// Calendar Props
					customInput={
						<div
							className={clsxm(
								'not-italic cursor-pointer font-semibold text-[0.625rem] 3xl:text-xs',
								'leading-[140%] tracking-[-0.02em] text-[#282048] dark:text-white'
							)}
						>
							{startDate
								? formatDateString(startDate.toISOString())
								: task?.startDate
								? formatDateString(task?.startDate)
								: 'Set Start Date'}
						</div>
					}
					selected={$startDate.current ? (new Date($startDate.current) as Date) : undefined}
					onSelect={(date) => {
						if (date && (!$dueDate.current || date <= $dueDate.current)) {
							setStartDate(date);

							if (task) {
								updateTask({ ...task, startDate: date?.toISOString() });
							}
						}
					}}
					mode={'single'}
				/>
				{task?.startDate ? (
					<span
						className="flex flex-row items-center justify-center text-xs border-0 cursor-pointer"
						onClick={() => {
							handleResetDate('startDate');
						}}
					>
						<TrashIcon className="w-[14px] h-[14px]" />
					</span>
				) : (
					<></>
				)}
			</TaskRow>

			<TaskRow labelTitle={t('pages.taskDetails.DUE_DATE')} alignWithIconLabel={true}>
				<DatePicker
					// Button Props
					buttonVariant={'link'}
					buttonClassName={'p-0 decoration-transparent h-[0.875rem] w-20'}
					// Calendar Props
					customInput={
						<div
							className={clsxm(
								'not-italic cursor-pointer font-semibold text-[0.625rem] 3xl:text-xs',
								'leading-[140%] tracking-[-0.02em] text-[#282048] dark:text-white'
							)}
						>
							{dueDate
								? formatDateString(dueDate.toISOString())
								: task?.dueDate
								? formatDateString(task?.dueDate)
								: 'Set Due Date'}
						</div>
					}
					selected={$dueDate.current ? (new Date($dueDate.current) as Date) : undefined}
					onSelect={(date) => {
						if (
							(!$startDate.current && date) ||
							($startDate.current && date && date >= $startDate.current)
						) {
							setDueDate(date);
							if (task) {
								updateTask({ ...task, dueDate: date?.toISOString() });
							}
						}
					}}
					mode={'single'}
				/>
				{task?.dueDate ? (
					<span
						className="flex flex-row items-center justify-center text-xs border-0 cursor-pointer"
						onClick={() => {
							handleResetDate('dueDate');
						}}
					>
						<TrashIcon className="w-[14px] h-[14px]" />
					</span>
				) : (
					<></>
				)}
			</TaskRow>

			{task?.dueDate && (
				<TaskRow labelTitle={t('pages.taskDetails.DAYS_REMAINING')} alignWithIconLabel={true}>
					<div className="not-italic font-semibold text-[0.625rem] leading-[140%] tracking-[-0.02em] text-[#282048] dark:text-white">
						{remainingDays !== undefined && remainingDays < 0 ? 0 : remainingDays}
					</div>
				</TaskRow>
			)}
		</div>
	);
}

const ManageMembersPopover = (memberList: OT_Member[], task: ITeamTask | null) => {
	const { t } = useTranslation();
	const [member, setMember] = useState<OT_Member>();
	const [memberToRemove, setMemberToRemove] = useState<boolean>(false);
	const [memberToAdd, setMemberToAdd] = useState<boolean>(false);

	const memberInfo = useTeamMemberCard(member);

	const unassignedMembers = useMemo(
		() =>
			memberList.filter((member) =>
				member.employee ? !task?.members.map((item) => item.userId).includes(member.employee.userId) : false
			),
		[memberList, task?.members]
	);

	const assignedTaskMembers = useMemo(
		() =>
			memberList.filter((member) =>
				member.employee ? task?.members.map((item) => item.userId).includes(member.employee?.userId) : false
			),
		[memberList, task?.members]
	);

	useEffect(() => {
		if (task && member && memberToRemove) {
			memberInfo
				.unassignTask(task)
				.then(() => {
					setMember(undefined);
					setMemberToRemove(false);
				})
				.catch(() => {
					setMember(undefined);
					setMemberToRemove(false);
				});
		} else if (task && member && memberToAdd) {
			memberInfo
				.assignTask(task)
				.then(() => {
					setMember(undefined);
					setMemberToAdd(false);
				})
				.catch(() => {
					setMember(undefined);
					setMemberToAdd(false);
				});
		}
	}, [task, member, memberInfo, memberToAdd, memberToRemove]);

	return (
		<>
			{task && memberList.length > 1 ? (
				<Popover className="relative w-full no-underline border-none">
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel
							className="z-10 absolute right-0 bg-white rounded-2xl min-w-[9.5rem] flex flex-col px-4 py-2 mt-10 mr-10  dark:bg-[#1B1D22] dark:border-[0.125rem] border-[#0000001A] dark:border-[#26272C]"
							style={{ boxShadow: 'rgba(0, 0, 0, 0.12) -24px 17px 49px' }}
						>
							{({ close }) => (
								<div className="overflow-y-scroll max-h-72 scrollbar-hide">
									{assignedTaskMembers.map((member, index) => (
										<div
											className="flex items-center justify-between w-auto h-8 gap-1 mt-1 hover:cursor-pointer hover:brightness-95 dark:hover:brightness-105"
											onClick={() => {
												setMember(member);
												setMemberToRemove(true);
												close();
											}}
											key={index}
										>
											<ProfileInfo
												profilePicSrc={member.employee?.user?.imageUrl}
												names={member.employee?.fullName}
											/>

											<TrashIcon />
										</div>
									))}
									{unassignedMembers.map((member, index) => (
										<div
											className="flex items-center justify-between w-auto h-8 mt-1 hover:cursor-pointer hover:brightness-95 dark:hover:brightness-105"
											onClick={() => {
												setMember(member);
												setMemberToAdd(true);
												close();
											}}
											key={index}
										>
											<ProfileInfo
												profilePicSrc={member.employee?.user?.imageUrl}
												names={member.employee?.fullName}
											/>
										</div>
									))}
								</div>
							)}
						</Popover.Panel>
					</Transition>

					<Popover.Button className="flex items-center w-auto h-8 outline-none hover:cursor-pointer">
						<div className="flex items-center justify-center w-full px-2 py-0 text-black border border-gray-200 rounded-full cursor-pointer dark:text-white">
							<p className="font-semibold text-[0.625rem] leading-none m-[6px]">
								{t('pages.settingsTeam.MANAGE_ASSIGNEES')}
							</p>
						</div>
					</Popover.Button>
				</Popover>
			) : (
				<></>
			)}
		</>
	);
};

export default TaskMainInfo;
