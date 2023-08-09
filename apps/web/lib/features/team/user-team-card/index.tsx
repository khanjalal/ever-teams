import {
	useTeamMemberCard,
	useTMCardTaskEdit,
	useTaskStatistics,
} from '@app/hooks';
import { IClassName, IOrganizationTeamList } from '@app/interfaces';
import { clsxm } from '@app/utils';
import { Card, VerticalSeparator, Text } from 'lib/components';
import { DraggerIcon } from 'lib/components/svgs';
import { TaskTimes, TodayWorkedTime } from 'lib/features';
import { useTranslation } from 'lib/i18n';
import { TaskEstimateInfo } from './task-estimate';
import { TaskInfo } from './task-info';
import { UserInfo } from './user-info';
import { UserTeamCardMenu } from './user-team-card-menu';
import { secondsToTime } from '@app/helpers';
import { useRecoilValue } from 'recoil';
import { timerSecondsState } from '@app/stores';

export function UserTeamCardHeader() {
	const { trans } = useTranslation();
	return (
		<ul className="sm:flex row font-normal justify-between pb-5 pt-8 hidde dark:text-[#7B8089]">
			{/* <li className="pr-[50px]">{trans.common.STATUS}</li> */}
			<li className="2xl:w-[22.688rem] text-center w-[28.6%]">
				{trans.common.NAME}
			</li>
			<li className="2xl:w-[20.313rem] text-center w-[21%]">
				{trans.common.TASK}
			</li>
			<li className="2xl:w-48 text-center w-[21%]">
				{trans.common.WORKED_ON_TASK}
			</li>
			<li className="2xl:w-[13.188rem] text-center w-[20.5%]">
				{trans.common.ESTIMATE}
			</li>
			<li className="2xl:w-[11.75rem] text-center w-1/6">
				{trans.common.TOTAL_WORKED_TODAY}
			</li>
		</ul>
	);
}

type IUserTeamCard = {
	active?: boolean;
	member?: IOrganizationTeamList['members'][number];
	publicTeam?: boolean;
	members?: IOrganizationTeamList['members'];
} & IClassName;

export function UserTeamCard({
	className,
	active,
	member,
	publicTeam = false,
}: IUserTeamCard) {
	const memberInfo = useTeamMemberCard(member);
	const taskEdition = useTMCardTaskEdit(memberInfo.memberTask);

	const seconds = useRecoilValue(timerSecondsState);
	const { activeTaskTotalStat, addSeconds } = useTaskStatistics(seconds);

	let totalWork = <></>;
	if (memberInfo.isAuthUser) {
		const { h, m } = secondsToTime(
			((member?.totalTodayTasks &&
				member?.totalTodayTasks.reduce(
					(previousValue, currentValue) =>
						previousValue + currentValue.duration,
					0
				)) ||
				activeTaskTotalStat?.duration ||
				0) + addSeconds
		);

		totalWork = (
			<div
				className={clsxm(
					'flex space-x-2 items-center font-normal flex-col mr-4'
				)}
			>
				<span className="text-gray-500 text-xs">Total time:</span>
				<Text className="text-xs">
					{h}h : {m}m
				</Text>
			</div>
		);
	}

	return (
		<div>
			<Card
				shadow="bigger"
				className={clsxm(
					'relative sm:flex items-center py-3 hidden dark:bg-[#1E2025] min-h-[7rem]',
					active
						? ['border-primary-light border-[0.1875rem]']
						: ['dark:border dark:border-[#FFFFFF14]'],

					className
				)}
			>
				<div className="absolute -left-0">
					<DraggerIcon className="fill-[#CCCCCC] dark:fill-[#4F5662]" />
				</div>

				{/* Show user name, email and image */}
				<UserInfo
					memberInfo={memberInfo}
					className="2xl:w-[20.625rem] w-1/4"
					publicTeam={publicTeam}
				/>
				<VerticalSeparator />

				{/* Task information */}
				<TaskInfo
					edition={taskEdition}
					memberInfo={memberInfo}
					className="2xl:w-80 w-1/5 lg:px-4 px-2"
					publicTeam={publicTeam}
				/>
				<VerticalSeparator className="ml-2" />

				{/* TaskTimes */}
				<TaskTimes
					activeAuthTask={true}
					memberInfo={memberInfo}
					task={memberInfo.memberTask}
					isAuthUser={memberInfo.isAuthUser}
					className="2xl:w-48 w-1/5 lg:px-4 px-2 flex flex-col gap-y-[1.125rem] justify-center"
				/>
				<VerticalSeparator />

				{/* TaskEstimateInfo */}
				<TaskEstimateInfo
					memberInfo={memberInfo}
					edition={taskEdition}
					activeAuthTask={true}
					className="lg:px-3 2xl:w-52 w-1/5"
				/>
				<VerticalSeparator />

				{/* TodayWorkedTime */}
				<TodayWorkedTime
					isAuthUser={memberInfo.isAuthUser}
					className="flex-1 lg:text-base text-xs"
					memberInfo={memberInfo}
				/>

				{/* Card menu */}
				<UserTeamCardMenu memberInfo={memberInfo} edition={taskEdition} />
			</Card>
			<Card
				shadow="bigger"
				className={clsxm(
					'relative flex py-3 sm:hidden flex-col',
					active && ['border-primary-light border-[2px]'],
					className
				)}
			>
				<div className="flex justify-between mb-4 items-center">
					<UserInfo
						memberInfo={memberInfo}
						publicTeam={publicTeam}
						className="w-9/12"
					/>
					{/*@ts-ignore*/}
					{totalWork}
				</div>

				<div className="flex justify-between items-start pb-4 border-b flex-wrap">
					<TaskInfo
						edition={taskEdition}
						memberInfo={memberInfo}
						className=" px-4"
						publicTeam={publicTeam}
					/>
				</div>

				<div className="flex justify-between mt-4 mb-4 space-x-5">
					<div className="flex space-x-4">
						<TaskTimes
							activeAuthTask={true}
							memberInfo={memberInfo}
							task={memberInfo.memberTask}
							isAuthUser={memberInfo.isAuthUser}
						/>
					</div>

					<TaskEstimateInfo
						memberInfo={memberInfo}
						edition={taskEdition}
						activeAuthTask={true}
					/>
				</div>
				<UserTeamCardMenu memberInfo={memberInfo} edition={taskEdition} />
			</Card>
		</div>
	);
}

export function UserTeamCardSkeleton() {
	return (
		<div
			role="status"
			className="p-4 rounded-xl border divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center space-x-3">
					<div className="w-5 h-5 mr-8 rounded-[50%] bg-gray-200 dark:bg-gray-700"></div>
					<div className="w-14 h-14 rounded-[50%] bg-gray-200 dark:bg-gray-700"></div>
					<div>
						<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
					</div>
				</div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
			</div>
		</div>
	);
}

export function InviteUserTeamSkeleton() {
	return (
		<div
			role="status"
			className="p-4 mt-3 rounded-xl border divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center space-x-3">
					<div className="w-5 h-5 mr-8 rounded-[50%] bg-gray-200 dark:bg-gray-700"></div>
					<div className="w-24 h-9 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
				</div>
			</div>
		</div>
	);
}
