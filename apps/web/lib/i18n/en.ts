export const en = {
	TITLE: 'Gauzy Teams',
	common: {
		CONTINUE: 'Continue',
		EDIT_TASK: 'Edit Task',
		ESTIMATE: 'Estimate',
		ASSIGN_TASK: 'Assign Task',
		UNASSIGN_TASK: 'Unassign Task',
		MAKE_A_MANAGER: 'Make a Manager',
		REMOVE: 'Remove',
		TODAY: 'Today',
		TOTAL: 'Total',
		ESTIMATED: 'Estimated',
		STATUS: 'Status',
		NAME: 'Name',
		TASK: 'Task',
		WORKED_ON_TASK: 'Worked on Task',
		TOTAL_WORKED_TODAY: 'Total worked Today',
		OPEN: 'Open',
		NOW: 'Now',
		CLOSED: 'Closed',
		INVITE: 'Invite',
		TASK_TITTLE: 'Task Tittle',
		CREATE_TASK: 'Create new task',
		CREATE_TEAM: 'Create new team',
		CREATE: 'Create',
		CREARE_ISSUE: 'Create issue',
		NEW_ISSUE: 'New Issue',
		LOADING: 'Loading',
		TOTAL_TIME: 'Total time',
		LAST_24_HOURS: 'Last 24 Hours',
		WORKED: 'Worked',
		ASSIGNED: 'Assigned',
		UNASSIGNED: 'Unassigned',
		FILTER: 'Filter',
		APPLY: 'Apply',
		RESET: 'Reset',
	},
	pages: {
		home: {
			BREADCRUMB: ['Dashboard', 'Team Page'],
		},

		profile: {
			BREADCRUMB: ['Dashboard', 'Task Profile'],
		},

		auth: {
			SEND_CODE: 'send code',
			JOIN: 'Join',
			UNRECEIVED_CODE: "Didn't recieve code ?",
			JOIN_TEAM: 'Join Team',
			INPUT_INVITE_CODE: 'Input invitation code.',
			INPUT_INVITE_CODE_DESC:
				'Enter the invitation code we sent to your email.',
			WELCOME_TEAMS: 'Welcome to Gauzy teams',

			COVER_TITLE: 'Follow your teams work progress in real-time!',
			COVER_DESCRIPTION:
				'Lorem ipsum dolor sit amet consectetur. Amet est risus etiam vestibulum iaculis montes tellus. Tincidunt mattis',
		},
		authPasscode: {
			HEADING_TITLE: 'Join existing Team',
			HEADING_DESCRIPTION:
				'Please enter email and invitation code to join existing team.',
		},
		authTeam: {
			HEADING_TITLE: 'Create New Team',
			HEADING_DESCRIPTION:
				'Please enter your team details to create a new team.',
			LOADING_TEXT: 'We are now creating your new workplace, hold on...',
			INPUT_TEAM_NAME: 'Input your team name',
			JOIN_EXISTING_TEAM: 'Joining existing team?',
			CREATE_FIRST_TEAM: 'Create your first team',
			CREATE_TEAM: 'Create team',
		},
		settings: {
			BREADCRUMB: ['Dashboard', 'Settings'],
			DANDER_ZONE: 'Danger Zone',
			HEADING_DESCRIPTION: 'Setting dan manage your personal dashboard here',
		},
		settingsPersonal: {
			HEADING_TITLE: 'Personal Settings',
		},
		settingsTeam: {
			HEADING_TITLE: 'Team Settings',
		},

		invite: {
			HEADING_TITLE: 'Invite member to your team',
			HEADING_DESCRIPTION: 'Send invitation to a team member by email',
			SEND_INVITE: 'Send Invitation',
		},
	},

	timer: {
		START_TIMER:
			'Please, select or create a new task to start tracking the time',
	},

	task: {
		tabFilter: {
			WORKED_DESCRIPTION: 'This tab shows all tasks you started working on',
			ASSIGNED_DESCRIPTION: 'This tab shows all tasks that are assigned to you',
			UNASSIGNED_DESCRIPTION:
				'This tab shows all tasks that are not assigned to you',
		},
	},

	form: {
		NAME_PLACEHOLDER: 'Enter your name',
		EMAIL_PLACEHOLDER: 'Enter your email address',

		ISSUE_NAME_PLACEHOLDER: 'Issue name',

		TEAM_NAME_PLACEHOLDER: 'Please Enter your team name',
		TASK_INPUT_PLACEHOLDER: 'What you working on?',

		TEAM_MEMBER_NAME_PLACEHOLDER: 'Team member name',
		TEAM_MEMBER_EMAIL_PLACEHOLDER: 'Team member email address',
	},

	layout: {
		footer: {
			RIGHTS_RESERVERD: 'All rights reserved.',
		},
	},

	errors: {
		NETWORK_ISSUE: 'network issue, please try again later',
	},
};

export type Translations = typeof en;