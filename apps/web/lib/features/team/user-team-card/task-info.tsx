import { I_TMCardTaskEdit, useCustomEmblaCarousel } from '@app/hooks';
import { IClassName, ITeamTask } from '@app/interfaces';
import { clsxm } from '@app/utils';
import { RoundedButton, Text } from 'lib/components';
import { TaskInput, taskStatus, TaskStatus } from 'lib/features';

type Props = IClassName & {
	task: ITeamTask | undefined | null;
	edition: I_TMCardTaskEdit;
};

export function TaskInfo({ className, task, edition }: Props) {
	const {
		viewportRef,
		nextBtnEnabled,
		scrollNext,
		prevBtnEnabled,
		scrollPrev,
	} = useCustomEmblaCarousel(0, {
		dragFree: true,
		containScroll: 'trimSnaps',
	});

	return (
		<div
			className={clsxm(
				'h-full flex flex-col items-start justify-center',
				className
			)}
		>
			{/* task */}
			<div
				className={clsxm(
					'w-full',
					edition.editMode ? ['h-[50px]'] : ['max-h-[40px] overflow-hidden']
				)}
			>
				{!edition.editMode && (
					<Text
						className="text-sm text-ellipsis text-center cursor-default"
						onDoubleClick={() => edition.setEditMode(true)}
					>
						{task?.title}
					</Text>
				)}

				{task && edition.editMode && (
					<TaskInput
						task={task}
						initEditMode={true}
						onCloseCombobox={() => edition.setEditMode(false)}
						onTaskClick={(e) => {
							console.log(e);
						}}
					/>
				)}
			</div>

			<div className="relative w-full h-full flex flex-col justify-center">
				<div ref={viewportRef} className="overflow-hidden w-full relative">
					<div className="flex space-x-2 mt-2">
						<TaskStatus
							{...taskStatus[task?.status || 'Todo']}
							className="text-xs"
							name={task?.status}
						/>
						<TaskStatus
							{...taskStatus['Blocked']}
							className="text-xs"
							name="Blocked"
						/>
						<TaskStatus
							{...taskStatus['Completed']}
							className="text-xs"
							name="Completed"
						/>
						<TaskStatus
							{...taskStatus['Todo']}
							className="text-xs"
							name="Todo"
						/>
					</div>
				</div>

				{nextBtnEnabled && (
					<RoundedButton
						onClick={scrollNext}
						className={'absolute w-6 h-6 -right-3 -mb-2'}
					>
						{'>'}
					</RoundedButton>
				)}

				{prevBtnEnabled && (
					<RoundedButton
						onClick={scrollPrev}
						className={'absolute w-6 h-6 -left-3  -mb-2'}
					>
						{'<'}
					</RoundedButton>
				)}
			</div>
		</div>
	);
}
