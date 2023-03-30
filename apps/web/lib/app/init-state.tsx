import {
	useLanguageSettings,
	useOrganizationTeams,
	useTaskStatistics,
	useTeamInvitations,
	useTeamTasks,
	useTimer,
	useAutoAssignTask,
	useTaskStatus,
	useTaskPriorities,
	useTaskSizes,
	useTaskLabels,
	useOTRefreshInterval,
	useIssueType,
} from '@app/hooks';
import { publicState, userState } from '@app/stores';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export function AppState() {
	const user = useRecoilValue(userState);

	return <>{user && <InitState />}</>;
}

function InitState() {
	const publicTeam = useRecoilValue(publicState);
	const { loadTeamsData, firstLoadTeamsData } = useOrganizationTeams();
	const { firstLoadTasksData } = useTeamTasks();
	const { firstLoadTeamInvitationsData } = useTeamInvitations();
	const { getTimerStatus, firstLoadTimerData } = useTimer();
	const { firstLoadtasksStatisticsData } = useTaskStatistics();
	const { loadLanguagesData, firstLoadLanguagesData } = useLanguageSettings();

	const { firstLoadData: firstLoadAutoAssignTask } = useAutoAssignTask();

	const { firstLoadTaskStatusData } = useTaskStatus();
	const { firstLoadTaskPrioritiesData } = useTaskPriorities();
	const { firstLoadTaskSizesData } = useTaskSizes();
	const { firstLoadTaskLabelsData } = useTaskLabels();
	const { firstLoadIssueTypeData } = useIssueType();

	useEffect(() => {
		//To be called once, at the top level component (e.g main.tsx | _app.tsx);
		firstLoadTeamsData();
		firstLoadTasksData();
		firstLoadTeamInvitationsData();
		firstLoadTimerData();
		firstLoadtasksStatisticsData();
		firstLoadLanguagesData();
		firstLoadAutoAssignTask();

		firstLoadTaskStatusData();
		firstLoadTaskPrioritiesData();
		firstLoadTaskSizesData();
		firstLoadTaskLabelsData();
		firstLoadIssueTypeData();
		// --------------

		getTimerStatus();
		loadTeamsData();
		loadLanguagesData();
	}, [
		firstLoadTasksData,
		firstLoadTeamInvitationsData,
		firstLoadTeamsData,
		loadTeamsData,
		getTimerStatus,
		firstLoadTimerData,
		firstLoadtasksStatisticsData,
		firstLoadLanguagesData,
		loadLanguagesData,
		firstLoadAutoAssignTask,
		firstLoadTaskStatusData,
		firstLoadTaskPrioritiesData,
		firstLoadTaskSizesData,
		firstLoadTaskLabelsData,
	]);

	/**
	 * Refresh Teams data every 5 seconds.
	 *
	 * So that if Team is deleted by manager it updates the UI accordingly
	 */
	useOTRefreshInterval(loadTeamsData, 5000, publicTeam);
	return <></>;
}
