import { useRecoilState } from 'recoil';
import TaskRow from '../components/task-row';
import { detailedTaskState } from '@app/stores';
import ProfileInfoWithTime from '../components/profile-info-with-time';
import { TaskEstimate } from 'lib/features';
import { ChevronDownIcon, ChevronUpIcon } from 'lib/components/svgs';
import { Disclosure } from '@headlessui/react';
import { useTranslation } from 'lib/i18n';
import { useAuthenticateUser } from '@app/hooks';

const TaskEstimationsInfo = () => {
	const [task] = useRecoilState(detailedTaskState);
	const { trans } = useTranslation('taskDetails');
	const { user } = useAuthenticateUser();

	return (
		<section className="flex flex-col gap-4 p-[0.9375rem]">
			<TaskRow
				labelTitle={trans.ESTIMATIONS}
				// TODO
				// Commented icon temporary, will be enable it in future once dynamic implementation done
				// afterIconPath="/assets/svg/estimations.svg"
			>
				<Disclosure>
					{({ open }) => (
						<div className="flex flex-col w-full mt-[0.125rem]">
							<Disclosure.Button className="flex justify-between items-center w-full">
								<TaskEstimate
									_task={task}
									className="not-italic font-semibold text-xs leading-[140%] tracking-[-0.02em] text-[#282048] dark:text-white"
									wrapperClassName="w-4"
								/>

								{!open ? (
									<ChevronUpIcon className="stroke-[#292D32] dark:stroke-white w-4 h-4" />
								) : (
									<ChevronDownIcon className="stroke-[#292D32] dark:stroke-white w-4 h-4" />
								)}
							</Disclosure.Button>
							<Disclosure.Panel>
								<div className="flex flex-col gap-[0.5625rem] mt-2">
									{task?.members.map((member) =>
										// TODO
										// Enable other users estimations in v2
										member.userId === user?.id ? (
											<ProfileInfoWithTime
												key={member.id}
												profilePicSrc={member.user?.imageUrl}
												names={member.fullName}
												//@ts-ignore
												time={
													<TaskEstimate
														_task={task}
														className="not-italic font-medium text-[0.625rem] !text-[#938FA3] dark:text-white"
														wrapperClassName="w-4"
													/>
												}
											/>
										) : (
											<></>
										)
									)}
								</div>
								{/*
								TODO
								Enable it in v2
								*/}
								{/* <button className="flex items-center text-[0.5rem] leading-[140%] border px-2.5 py-1 rounded-xl text-[#292D32] font-semibold dark:text-white gap-1 mt-2">
									<AddIcon className="dark:stroke-white" />
									Add new member
								</button> */}
							</Disclosure.Panel>
						</div>
					)}
				</Disclosure>
			</TaskRow>
		</section>
	);
};

export default TaskEstimationsInfo;
