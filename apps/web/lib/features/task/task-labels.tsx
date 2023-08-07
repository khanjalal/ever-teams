import { useModal, useTaskLabels, useTeamTasks } from '@app/hooks';
import { ITeamTask, Nullable } from '@app/interfaces';
import { Button, Card, Modal } from 'lib/components';
import { PlusIcon } from 'lib/components/svgs';
import { TaskLabelForm } from 'lib/settings';
import { TaskLabelsDropdown } from './task-status';

type Props = {
	task: Nullable<ITeamTask>;
	className?: string;
	forDetails: boolean;
};
export function TaskLabels({ task, className, forDetails }: Props) {
	const { updateTask } = useTeamTasks();
	const { taskLabels } = useTaskLabels();
	const modal = useModal();

	function onValuesChange(_: any, values: string[] | undefined) {
		if (!task) return;

		updateTask({
			...task,
			tags: taskLabels.filter((tag) =>
				tag.name ? values?.includes(tag.name) : false
			) as any,
		});
	}

	const tags = (task?.tags as typeof taskLabels | undefined)?.map(
		(tag) => tag.name || ''
	);

	return (
		<>
			<TaskLabelsDropdown
				onValueChange={onValuesChange}
				className={className}
				placeholder="Labels"
				defaultValues={tags || []}
				multiple={true}
				forDetails={forDetails}
				sidebarUI={forDetails}
			>
				<Button
					className="w-full py-1 px-2 text-xs mt-3 dark:text-white dark:border-white"
					variant="outline"
					onClick={modal.openModal}
				>
					<PlusIcon className="w-[16px] h-[16px] stroke-dark dark:stroke-white" />
				</Button>
			</TaskLabelsDropdown>

			{/* Modal */}
			<Modal isOpen={modal.isOpen} closeModal={modal.closeModal}>
				<Card className="sm:w-[530px] w-[330px]" shadow="custom">
					<TaskLabelForm onCreated={modal.closeModal} formOnly={true} />
				</Card>
			</Modal>
		</>
	);
}