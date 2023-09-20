/* eslint-disable no-mixed-spaces-and-tabs */
import { CHARACTER_LIMIT_TO_SHOW } from '@app/constants';
import {
	useAuthenticateUser,
	useOrganizationTeams,
	useTimer,
} from '@app/hooks';
import { clsxm, isValidUrl } from '@app/utils';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
	Avatar,
	Card,
	Divider,
	Text,
	ThemeToggler,
	Tooltip,
} from 'lib/components';
import {
	BriefcaseIcon,
	DevicesIcon,
	LogoutIcon2,
	MoonIcon,
	PeopleIcon,
	SettingsOutlineIcon,
} from 'lib/components/svgs';
import { useTranslation } from 'lib/i18n';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import gauzyLight from '../../public/assets/themeImages/gauzyLight.png';
import gauzyDark from '../../public/assets/themeImages/gauzyDark.png';
import ThemesPopup from 'lib/components/themes-popup';
import { ThemeInterface } from '@app/interfaces';
import stc from 'string-to-color';
import { imgTitle } from '@app/helpers';
import { TimerStatus } from './timer/timer-status';
import moment from 'moment';
import { publicState } from '@app/stores';
import { useRecoilValue } from 'recoil';

export function UserNavAvatar() {
	const { user } = useAuthenticateUser();
	const imageUrl =
		user?.image?.thumbUrl || user?.image?.fullUrl || user?.imageUrl;
	const name =
		user?.name || user?.firstName || user?.lastName || user?.username || '';
	const { timerStatus } = useTimer();
	const { activeTeam } = useOrganizationTeams();
	const publicTeam = useRecoilValue(publicState);
	const members = activeTeam?.members || [];
	const currentUser = members.find((m) => {
		return m.employee.userId === user?.id;
	});

	return (
		<Popover className="relative flex items-center">
			<Popover.Button className="outline-none">
				<div
					className={clsxm(
						'w-[3rem] h-[3rem]',
						'flex justify-center items-center',
						'rounded-full text-xs text-default dark:text-white',
						'shadow-md text-lg font-normal'
					)}
					style={{
						backgroundColor: `${stc(name || '')}80`,
					}}
				>
					{imageUrl && isValidUrl(imageUrl) ? (
						<Avatar
							size={48}
							className="relative cursor-pointer dark:border-[0.25rem] dark:border-[#26272C]"
							imageUrl={imageUrl}
							alt="Team Avatar"
							imageTitle={name}
						>
							<TimerStatus
								status={
									!timerStatus?.running &&
									timerStatus?.lastLog &&
									timerStatus?.lastLog?.startedAt &&
									moment().diff(
										moment(timerStatus?.lastLog?.startedAt),
										'hours'
									) < 24 &&
									timerStatus?.lastLog?.source !== 'TEAMS'
										? 'pause'
										: !currentUser?.employee?.isActive && !publicTeam
										? 'suspended'
										: currentUser?.employee?.isOnline &&
										  currentUser?.timerStatus !== 'running'
										? 'online'
										: !currentUser?.totalTodayTasks?.length
										? 'idle'
										: currentUser?.totalTodayTasks?.length
										? 'pause'
										: currentUser?.timerStatus || 'idle'
								}
								className="w-[1.3rem] h-[1.3rem] absolute bottom-3 -right-2 -mb-4 border-[0.125rem] border-white dark:border-[#26272C]"
								tooltipClassName="mt-10"
							/>
						</Avatar>
					) : name ? (
						imgTitle(name).charAt(0)
					) : (
						''
					)}
				</div>
			</Popover.Button>

			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Popover.Panel className="absolute z-50 right-0 xl:-right-5 mt-5">
					<MenuIndicator />
					<UserNavMenu />
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

function MenuIndicator() {
	return (
		<Card
			className={clsxm(
				'absolute -top-4 right-0 -z-10 bg-transparent dark:bg-transparent',
				'nav-items--shadow rounded-none !py-0 !px-0',
				'w-0 h-0',
				'border-l-[15px] border-r-[15px]',
				'xl:border-l-[35px] border-l-transparent xl:border-r-[35px] border-r-transparent',
				'border-solid border-b-light--theme-light dark:border-b-dark--theme-light border-b-[50px]'
			)}
			shadow="custom"
		/>
	);
}

function UserNavMenu() {
	const { user, logOut } = useAuthenticateUser();
	const { trans } = useTranslation();
	const imageUrl =
		user?.image?.thumbUrl || user?.image?.fullUrl || user?.imageUrl;
	const name =
		user?.name || user?.firstName || user?.lastName || user?.username;
	const { timerStatus } = useTimer();
	const { activeTeam } = useOrganizationTeams();
	const publicTeam = useRecoilValue(publicState);
	const members = activeTeam?.members || [];
	const currentUser = members.find((m) => {
		return m.employee.userId === user?.id;
	});

	return (
		<Card
			shadow="custom"
			className="w-[308px] flex flex-col nav-items--shadow z-10 rounded-[10px] shadow-xlcard dark:bg-[#1B1D22] border-[0.125rem] border-transparent dark:border-[#26272C]"
		>
			<div className="flex flex-col justify-center items-center">
				<Link href={`/settings/personal`}>
					<div
						className={clsxm(
							'w-[72px] h-[72px]',
							'flex justify-center items-center',
							'rounded-full text-xs text-default dark:text-white',
							'shadow-md text-4xl font-normal relative cursor-pointer mb-5'
						)}
						style={{
							backgroundColor: `${stc(name || '')}80`,
						}}
					>
						{imageUrl && isValidUrl(imageUrl) ? (
							<Avatar
								size={72}
								className="relative cursor-pointer"
								imageUrl={imageUrl}
								alt="Team Avatar"
							>
								<TimerStatus
									status={
										!timerStatus?.running &&
										timerStatus?.lastLog &&
										timerStatus?.lastLog?.startedAt &&
										moment().diff(
											moment(timerStatus?.lastLog?.startedAt),
											'hours'
										) < 24 &&
										timerStatus?.lastLog?.source !== 'TEAMS'
											? 'pause'
											: !currentUser?.employee?.isActive && !publicTeam
											? 'suspended'
											: currentUser?.employee?.isOnline &&
											  currentUser?.timerStatus !== 'running'
											? 'online'
											: !currentUser?.totalTodayTasks?.length
											? 'idle'
											: currentUser?.totalTodayTasks?.length
											? 'pause'
											: currentUser?.timerStatus || 'idle'
									}
									className="w-[1.3rem] h-[1.3rem] absolute z-20 bottom-3 -right-1 -mb-3 border-[0.125rem] border-white dark:border-[#26272C]"
									tooltipClassName="mt-10"
								/>
							</Avatar>
						) : name ? (
							imgTitle(name).charAt(0)
						) : (
							''
						)}
					</div>
				</Link>

				<Link href={`/settings/personal`} className="text-center  w-full">
					<Tooltip
						label={
							`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || ''
						}
						enabled={
							`${user?.firstName || ''} ${user?.lastName || ''}`.trim().length >
							CHARACTER_LIMIT_TO_SHOW
						}
						placement="auto"
					>
						<Text.Heading
							as="h3"
							className="overflow-hidden text-ellipsis whitespace-nowrap"
						>
							{user?.firstName} {user?.lastName}
						</Text.Heading>
					</Tooltip>

					<Tooltip
						label={user?.email || ''}
						enabled={`${user?.email}`.trim().length > CHARACTER_LIMIT_TO_SHOW}
						placement="auto"
					>
						<Text className="text-sm overflow-hidden text-ellipsis whitespace-nowrap text-[#7E7991]">
							{user?.email}
						</Text>
					</Tooltip>
				</Link>

				<Divider className="mt-6" />

				<ul className="w-full mt-4">
					{/* Task menu */}
					<li className=" mb-3">
						<Link
							href={`/profile/${user?.id}`}
							className="text-center flex space-x-3 items-center font-normal"
						>
							<BriefcaseIcon className="w-5 h-5" />{' '}
							<span>{trans.common.MY_TASKS}</span>
						</Link>
					</li>
					{/* Team menu */}
					<li className="mb-3">
						<Link href="/" className="flex space-x-3 items-center font-normal">
							<PeopleIcon className="w-5 h-5 stroke-default dark:stroke-white" />{' '}
							<span>{trans.common.MY_TEAM}</span>
						</Link>
					</li>
					{/* Settings menu */}

					<li className="mb-3">
						<Link
							href={'/settings/personal'}
							className="flex space-x-3 items-center font-normal"
						>
							<SettingsOutlineIcon className="w-5 h-5" />{' '}
							<span>{trans.common.SETTINGS}</span>
						</Link>
					</li>

					{/* Darkmode menu */}
					<li className="flex space-x-3 items-center justify-between font-normal mb-3">
						<div className="flex-1 flex items-center space-x-3">
							<MoonIcon className="w-5 h-5" />{' '}
							<span>{trans.common.DARK_MODE}</span>
						</div>
						<ThemeToggler className="scale-75" />
					</li>

					{/* 3D Mode menu */}
					{/* TODO
					- Uncomment it when we have 3D mode ready
					*/}
					{/* <li className="flex space-x-3 items-center font-normal mb-3">
						<div className="flex-1 flex items-center space-x-3">
							<BoxIcon className="w-5 h-5" />{' '}
							<span>{trans.common['3D_MODE']}</span>
						</div>
						<TreeModeToggler className="scale-75" />
					</li> */}

					{/* Themes menu */}
					<li className="flex space-x-3 items-center font-normal mb-3">
						<div className="flex-1 flex space-x-3">
							<DevicesIcon className="w-5 h-5" />{' '}
							<span>{trans.common.THEMES}</span>
						</div>
						<ThemeDropdown />
					</li>
				</ul>
				<Divider className="mt-4 mb-3" />
				<ul className="w-full">
					{/* Logout menu */}
					<li>
						<button
							className="flex space-x-3 items-center font-normal mb-3 text-[#DE437B]"
							onClick={logOut}
						>
							<LogoutIcon2 className="w-5 h-5 stroke-[#DE437B]" />{' '}
							<span>{trans.common.LOGOUT}</span>
						</button>
					</li>
				</ul>
			</div>
		</Card>
	);
}

function ThemeDropdown() {
	const { theme, setTheme } = useTheme();

	const themes: ThemeInterface[] = [
		{
			theme: 'light',
			text: 'Gauzy Light 2D',
			image: gauzyLight,
			enabled: theme === 'light',
		},
		{
			theme: 'dark',
			text: 'Gauzy Dark 2D',
			image: gauzyDark,
			enabled: theme === 'dark',
		},
	];

	const selectedThemeText = themes.find(
		(item: ThemeInterface): boolean => item.theme === theme
	)?.text;

	return (
		<Popover className="relative z-30">
			<Popover.Button className="flex items-center">
				<p className="text-sm text-neutral">
					{selectedThemeText?.replace('2D', '')}
				</p>
				<ChevronDownIcon
					className={clsxm(
						'ml-1 h-5 w-5 dark:text-white transition duration-150 ease-in-out group-hover:text-opacity-80'
					)}
					aria-hidden="true"
				/>
			</Popover.Button>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Popover.Panel className="theme-popup-scrollbar absolute z-10 max-w-sm w-[360px] right-[-25px] rounded-xl top-[-50px] shadow-xl p-0">
					<Card
						shadow="bigger"
						className="flex flex-col !px-5 !py-3 !overflow-auto h-[15.5rem] 3xl:h-auto gap-4"
					>
						{themes.map((item: ThemeInterface, index: number) => (
							<ThemesPopup
								currentTheme={theme}
								key={index}
								index={index}
								theme={item.theme}
								text={item.text}
								image={item.image}
								enabled={item.enabled}
								setTheme={setTheme}
							/>
						))}
					</Card>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

// function ThemeDropdown() {
// 	const { theme, setTheme } = useTheme();

// 	const themes = {
// 		dark: 'Gauzy Dark',
// 		light: 'Gauzy light',
// 	};

// 	const selected = themes[theme as keyof typeof themes];

// 	return (
// 		<div className="relative">
// 			<Listbox value={selected} onChange={setTheme as any}>
// 				<Listbox.Button className="flex text-sm items-center text-gray-500 dark:text-gray-300">
// 					{selected}{' '}
// 					<ChevronDownIcon
// 						className={clsxm(
// 							'ml-2 h-5 w-5 dark:text-white transition duration-150 ease-in-out group-hover:text-opacity-80'
// 						)}
// 						aria-hidden="true"
// 					/>
// 				</Listbox.Button>
// 				<Listbox.Options className={'absolute inset-0 flex flex-col mt-6'}>
// 					<Card className="!p-0" shadow="custom">
// 						{Object.keys(themes).map((key) => (
// 							<Listbox.Option
// 								key={key}
// 								value={key}
// 								className="text-sm text-gray-600 dark:text-white cursor-pointer"
// 							>
// 								{themes[key as keyof typeof themes]}
// 							</Listbox.Option>
// 						))}
// 					</Card>
// 				</Listbox.Options>
// 			</Listbox>
// 		</div>
// 	);
// }
