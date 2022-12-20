import { useOrganizationTeams } from '@app/hooks/features/useOrganizationTeams';
import { AppLayout } from '@components/layout';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { useEffect, useMemo, useState } from 'react';
import { Capitalize } from '@components/layout/header/profile';
import StatusDropdown from '@components/common/main/status-dropdown';
import { useTeamTasks } from '@app/hooks/features/useTeamTasks';
import Link from 'next/link';
import Timer from '@components/common/main/timer';
import TaskDetailCard from '@components/home/task-card';
import { withAuthentication } from '@components/authenticator';
import useAuthenticateUser from '@app/hooks/features/useAuthenticateUser';
import { useTaskStatistics } from '@app/hooks/features/useTaskStatistics';
import { IUser } from '@app/interfaces/IUserData';
// import AssignedTask from '@components/home/assigned-tasks';
// import UnAssignedTask from '@components/home/unassigned-task';
import Tooltip from '@components/common/tooltip';
import { useAuthTeamTasks } from '@app/hooks/features/useAuthTeamTasks';
import { LeftArrow } from '@components/common/main/leftArrow';
import { RightArrow } from '@components/common/main/rightArrow';
import { LeftArrowDark } from '@components/common/main/leftArrowDark';
import { useTheme } from 'next-themes';

const Profile = () => {
	const { activeTeam } = useOrganizationTeams();
	const { user: auth } = useAuthenticateUser();
	const router = useRouter();

	const { activeTeamTask, tasks } = useTeamTasks();
	const { getAllTasksStatsData } = useTaskStatistics();

	const [tab, setTab] = useState<'worked' | 'assigned' | 'unassigned'>(
		'worked'
	);

	const user = useMemo(() => {
		const { memberId } = router.query;
		const members = activeTeam?.members || [];
		const currentUser = members.find((m) => {
			return m.employee.userId === memberId;
		});

		return auth?.employee.id === memberId ? auth : currentUser?.employee.user;
	}, [auth, router, activeTeam]);

	const { unassignedTasks, assignedTasks } = useAuthTeamTasks(user);

	const otherTasks = activeTeamTask
		? tasks.filter((t) => t.id !== activeTeamTask.id)
		: tasks;

	useEffect(() => {
		getAllTasksStatsData();
	}, [getAllTasksStatsData]);

	return (
		<AppLayout>
			<Header user={user} />
			<div className="relative z-10 mx-[80px]">
				<div className="my-[41px] text-[18px] text-[#ACB3BB] font-light flex justify-between items-center w-full">
					<div className="flex">
						<Tooltip
							label={
								<span className="flex items-center bg-[#534D6D] text-white text-sm font-medium py-1 px-2 rounded-[8px] shadow-md">
									Here are all the tasks a member started working on
								</span>
							}
						>
							<div
								className={`mr-10 ${
									tab === 'worked' && 'text-[#3826A5]'
								} cursor-pointer`}
								onClick={() => setTab('worked')}
							>
								<div className="flex">
									<div className="flex-1 font-semibold">Worked</div>
									<div
										className={`bg-[#ACB3BB] h-[20px] w-[15px] rounded-[2px] text-white px-0 ml-[15px] mt-1 ${
											tab === 'worked' && 'bg-[#3826A5]'
										} cursor-pointer`}
									>
										<p className="text-center font-medium text-xs">4</p>
									</div>
								</div>
								{tab === 'worked' && (
									<div className="flex">
										<div className="w-[92px] h-[2px] bg-[#3826A5] mt-[10px]"></div>
									</div>
								)}
							</div>
						</Tooltip>
						<Tooltip
							label={
								<span className="flex items-center bg-[#534D6D] text-white text-sm font-medium py-1 px-2 rounded-[8px] shadow-md">
									Here are all the tasks assigned to a member
								</span>
							}
						>
							<div
								className={`mr-10 ${
									tab === 'assigned' && 'text-[#3826A5]'
								} cursor-pointer`}
								onClick={() => setTab('assigned')}
							>
								<div className="flex">
									<div className="flex-1 font-semibold">Assigned</div>
									<div
										className={`bg-[#ACB3BB] h-[20px] w-[15px] rounded-[2px] text-white px-0 ml-[17px] mt-1 ${
											tab === 'assigned' && 'bg-[#3826A5]'
										} cursor-pointer`}
									>
										<p className="text-center font-medium text-xs">2</p>
									</div>
								</div>
								{tab === 'assigned' && (
									<div className="flex">
										<div className="w-[95px] h-[2px] bg-[#3826A5] mt-[10px]"></div>
									</div>
								)}
							</div>
						</Tooltip>
						<Tooltip
							label={
								<span className="flex items-center bg-[#534D6D] text-white text-sm font-medium py-1 px-2 mt-[-5px] rounded-[8px] shadow-md">
									Here are all the tasks unassigned to a member
								</span>
							}
						>
							<div className="flex">
								<div
									className={`mr-10 ${
										tab === 'unassigned' && 'text-[#3826A5]'
									} cursor-pointer flex-1`}
									onClick={() => setTab('unassigned')}
								>
									<div className="flex">
										<div className="flex-1 font-semibold">Unassigned</div>
										<div
											className={`bg-[#ACB3BB] h-[20px] w-[15px] rounded-[2px] text-white px-0 ml-[15px] mt-1 ${
												tab === 'unassigned' && 'bg-[#3826A5]'
											} cursor-pointer`}
										>
											<p className="text-center font-medium text-xs">4</p>
										</div>
									</div>
									{tab === 'unassigned' && (
										<div className="flex">
											<div className="w-[108px] h-[2px] bg-[#3826A5] mt-[10px]"></div>
										</div>
									)}
								</div>
							</div>
						</Tooltip>
					</div>
					<div className="flex items-center">
						<div className="mr-4 h-full relative z-10">
							<StatusDropdown />
						</div>
						<button className="rounded-[7px] hover:bg-opacity-80 w-[140px] text-md h-[36px] bg-primary text-white dark:bg-[#1B1B1E] dark:text-[#ACB3BB] dark:border-white dark:hover:text-white">
							Assign Task
						</button>
					</div>
				</div>

				{/* Tab content (worked) */}
				{tab === 'worked' && (
					<div>
						<div className="flex items-center justify-between">
							<div className="text-[#ACB3BB] text-[16px] w-[35px] font-normal">
								Now
							</div>
							<div className="bg-[#D7E1EB] dark:bg-gray-600 w-full h-[1px] mx-[10px]" />
							<div className="text-[#ACB3BB] text-[16px] w-[164px] font-normal">
								Total time: 03:31
							</div>
						</div>
						<div className="relative">
							{activeTeamTask && (
								<TaskDetailCard
									now={true}
									task={activeTeamTask}
									current="00:00"
								/>
							)}
						</div>
						<div className="flex items-center justify-between mt-[40px]">
							<div className="text-[#ACB3BB] text-[16px] w-[130px] font-normal">
								Last 24 hours
							</div>
							<div className="bg-[#D7E1EB] dark:bg-gray-600 w-full h-[1px] mx-[10px]" />
							<div className="text-[#ACB3BB] text-[16px] w-[164px] font-normal">
								Total time: 03:31
							</div>
						</div>
						{otherTasks.map((ta, i) => (
							<div
								key={ta.id}
								className="relative"
								style={{ zIndex: `-${i + 1}` }}
							>
								<TaskDetailCard task={ta} />
							</div>
						))}
					</div>
				)}

				{/* Tab content (assigned) */}
				{tab === 'assigned' && (
					<>
						{assignedTasks.map((ta, i) => (
							<div
								key={ta.id}
								className="relative"
								style={{ zIndex: `-${i + 1}` }}
							>
								<TaskDetailCard task={ta} current="00:00" />
							</div>
						))}
					</>
				)}

				{/* Tab content (unassigned) */}
				{tab === 'unassigned' && (
					<>
						{unassignedTasks.map((ta, i) => (
							<div
								key={ta.id}
								className="relative"
								style={{ zIndex: `-${i + 1}` }}
							>
								<TaskDetailCard task={ta} current="00:00" />
							</div>
						))}
					</>
				)}
			</div>
		</AppLayout>
	);
};

function Header({ user }: { user: IUser | undefined }) {
	const { theme } = useTheme();
	return (
		<div className="bg-[#FFFF] dark:bg-[#232C3B] mt-[124px] rounded-[20px] w-full flex items-center justify-between mx-[70px]">
			<div className="ml-[16px] mb-[20px] flex flex-col space-y-[15px]">
				<div className="flex flex-row space-x-7 mb-[58px]">
					<div className="">
						<Link href="/main">
							{theme === 'dark' ? <LeftArrowDark /> : <LeftArrow />}
						</Link>
					</div>
					<div className="text-[14px] text-[#B1AEBC]">
						<Link href="/main">Dashboard</Link>
					</div>
					<div className="mt-1">
						<RightArrow />
					</div>
					<div className="text-[#282048] text-[14px] font-semibold dark:text-[#FFFFFF]">
						Task Profile
					</div>
				</div>
				<div className="flex items-center mb-[100px]">
					<div className="relative h-[100px] w-[100px]">
						{user?.imageUrl && (
							<Image
								src={user?.imageUrl}
								alt="User Icon"
								className="rounded-full h-full w-full z-20"
								layout="fill"
								objectFit="cover"
							/>
						)}

						<div className="absolute z-10 inset-0 w-full h-full animate-pulse dark:divide-gray-700 dark:border-gray-700">
							<div className="w-full h-full rounded-[50%] bg-gray-200 dark:bg-gray-700"></div>
						</div>

						<div className="absolute z-30 rounded-full bg-white p-[1px] top-[80px] left-[68px]">
							<div className="bg-[#02C536] w-[20px] h-[20px] rounded-full"></div>
						</div>
					</div>
					<div className="ml-[24px]">
						<div className="text-[36px] text-[#1B005D] dark:text-[#FFFFFF] font-bold flex items-center ">
							<span className="flex items-center mt-[9px]">
								{user?.firstName && Capitalize(user.firstName)}
								{user?.lastName && ' ' + Capitalize(user.lastName)}
							</span>
						</div>
						<div className="text-[#B0B5C7] flex items-center text-[18px] mt-[14px]">
							<span className="flex items-center">{user?.email}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center w-[391px] space-x-[27px] mr-[130px] mt-[34px] border-2 border-[#00000008] dark:bg-[#2E394D] rounded-[20px]">
				<Timer />
			</div>
		</div>
	);
}

export default withAuthentication(Profile, 'ProfilePage');
