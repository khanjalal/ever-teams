/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, InputField, Text, Toggler } from 'lib/components';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { userState } from '@app/stores';
import { useRecoilState } from 'recoil';

export const TeamSettingForm = () => {
	const [user] = useRecoilState(userState);
	const { register, setValue, handleSubmit } = useForm();

	useEffect(() => {
		setValue('teamName', '');
		setValue('teamType', '');
		setValue('teamLink', '');
	}, [user, setValue]);

	const onSubmit = useCallback(async (values: any) => {
		console.log(values);
	}, []);

	return (
		<>
			<form
				className="w-[98%] md:w-[930px]"
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
			>
				<div className="flex flex-col justify-between items-center">
					<div className="w-full mt-5">
						<div className="">
							<div className="flex w-full items-center justify-between gap-12">
								<Text className="flex-none flex-grow-0 text-md text-gray-400 font-normal mb-2 w-1/5">
									Team Name
								</Text>
								<div className="flex flex-row flex-grow-0 items-center justify-between w-4/5">
									<InputField
										type="text"
										placeholder="Team Name"
										{...register('teamName', { required: true, maxLength: 80 })}
										className=""
									/>
								</div>
							</div>
							<div className="flex w-full items-center justify-between gap-12 mt-8">
								<Text className="flex-none flex-grow-0 text-md text-gray-400 font-normal mb-2 w-1/5">
									Team Type
								</Text>
								<div className="items-center justify-between w-1/4">
									<div>
										<input
											id="default-radio-1"
											type="radio"
											value=""
											name="default-radio"
											className="w-4 h-4 text-[#3826A6] bg-gray-100 border-gray-300 focus:ring-[#3826A6] dark:focus:ring-[#3826A6] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<Text.Label>Public Team</Text.Label>
									</div>
									<div>
										<input
											checked
											id="default-radio-2"
											type="radio"
											value=""
											name="default-radio"
											className="w-4 h-4 text-[#3826A6] bg-gray-100 border-gray-300 focus:ring-[#3826A6] dark:focus:ring-[#3826A6] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<Text.Label>Private Team</Text.Label>
									</div>
								</div>
								<div className="flex gap-4 items-center">
									<div className="flex flex-row flex-grow-0 items-center justify-between w-64 mb-0">
										<InputField
											type="text"
											placeholder="https://teamA.gauzy.com"
											className="mb-0 h-[54px]"
											wrapperClassName="mb-0 h-[54px]"
										/>
									</div>
									<div className="flex flex-row flex-grow-0 items-center justify-between w-1/5">
										<Button
											type="submit"
											variant="outline"
											className="border rounded-[10px] h-[54px]"
										>
											Copy Link
										</Button>
									</div>
								</div>
							</div>
							<div className="flex w-full items-center justify-between gap-12 mt-[2rem]">
								<Text className="flex-none font-normal text-gray-400 flex-grow-0 text-md md-2 w-1/5">
									Time Tracking
								</Text>
								<div className="flex flex-row flex-grow-0 items-center justify-between w-4/5">
									<Toggler />
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};