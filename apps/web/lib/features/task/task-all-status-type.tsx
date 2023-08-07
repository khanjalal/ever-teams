import { useCustomEmblaCarousel, useSyncRef } from '@app/hooks';
import { ITeamTask, Nullable } from '@app/interfaces';
import { RoundedButton } from 'lib/components';
import { useEffect } from 'react';
import {
	TaskStatus,
	useTaskLabelsValue,
	useTaskPrioritiesValue,
	useTaskSizesValue,
	useTaskStatusValue,
} from './task-status';

export function TaskAllStatusTypes({
	task,
	showStatus = false,
}: {
	task?: Nullable<ITeamTask>;
	showStatus?: boolean;
}) {
	const taskPriorities = useTaskPrioritiesValue();
	const taskSizes = useTaskSizesValue();
	const taskLabels = useTaskLabelsValue();
	const taskStatus = useTaskStatusValue();

	const {
		viewportRef,
		nextBtnEnabled,
		scrollNext,
		prevBtnEnabled,
		scrollPrev,
		emblaApi,
	} = useCustomEmblaCarousel(0, {
		dragFree: true,
		containScroll: 'trimSnaps',
	});

	const emblaApiRef = useSyncRef(emblaApi);

	useEffect(() => {
		emblaApiRef.current?.reInit();
	}, [task, emblaApiRef]);

	return (
		<div className="relative w-full h-full flex flex-col justify-center">
			<div ref={viewportRef} className="overflow-hidden w-full relative">
				<div className="flex space-x-2 h-6">
					{showStatus && task?.status && taskStatus[task?.status] && (
						<TaskStatus
							{...taskStatus[task?.status]}
							className="rounded-[0.625rem]"
							active={!!task?.status}
							name={task?.status?.split('-').join(' ') || 'Status'}
							titleClassName={'text-[0.625rem] font-[500]'}
						/>
					)}

					{task?.priority && (
						<TaskStatus
							{...taskPriorities[task?.priority || 'Low']}
							className="rounded-[0.625rem]"
							active={!!task?.priority}
							name={task?.priority?.split('-').join(' ') || 'Priority'}
							titleClassName={'text-[0.625rem] font-[500]'}
						/>
					)}

					{task?.size && (
						<TaskStatus
							{...taskSizes[task?.size || 'Medium']}
							className="rounded-[0.625rem]"
							active={!!task?.size}
							name={task?.size?.split('-').join(' ') || 'Size'}
							titleClassName={'text-[0.625rem] font-[500]'}
						/>
					)}

					{task?.tags && task?.tags?.length > 0 && (
						<TaskStatus
							{...taskLabels[task?.label || 'WEB']}
							className="rounded-[0.625rem]"
							active={!!task?.label}
							name={task?.label?.split('-').join(' ') || 'Label'}
							titleClassName={'text-[0.625rem] font-[500]'}
						/>
					)}
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
	);
}
