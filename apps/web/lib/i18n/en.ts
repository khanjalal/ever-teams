export const en = {
	TITLE: 'Gauzy Teams',
	common: {
		CONTINUE: 'Continue',
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
	},
	form: {
		EMAIL_PLACEHOLDER: 'Enter your email address',
		TEAM_NAME_PLACEHOLDER: 'Please Enter your team name',
	},

	layout: {
		footer: {
			RIGHTS_RESERVERD: 'All rights reserved.',
		},
	},
};

export type Translations = typeof en;
