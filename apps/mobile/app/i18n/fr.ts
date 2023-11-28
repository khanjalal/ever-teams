const fr = {
	common: {
		ok: 'OK!',
		cancel: 'Annuler',
		loading: 'Patientez',
		back: 'Retour',
		save: 'Sauvegarder',
		logOut: 'Se déconnecter', // @demo remove-current-line
		edit: 'Edit',
		confirm: 'Confirm',
		discard: 'Discard'
	},
	welcomeScreen: {
		postscript:
			"psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
		readyForLaunch: 'Your app, almost ready for launch!',
		exciting: '(ohh, this is exciting!)',
		letsGo: "Let's go!" // @demo remove-current-line
	},
	errorScreen: {
		title: 'Something went wrong!',
		friendlySubtitle:
			"This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
		reset: 'RESET APP',
		traceTitle: 'Error from %{name} stack' // @demo remove-current-line
	},
	emptyStateComponent: {
		generic: {
			heading: 'So empty... so sad',
			content: 'No data found yet. Try clicking the button to refresh or reload the app.',
			button: "Let's try this again"
		}
	},
	// @demo remove-block-start
	errors: {
		invalidEmail: 'Invalid email address.'
	},
	loginScreen: {
		name: 'Connexion',
		enterDetails: 'Créer une nouvelle équipe',
		enterDetails2: "Rejoignez l'équipe existante",
		enterDetails3: 'Espace de travail',
		hintDetails: 'Veuillez entrer les détails pour créer une nouvelle équipe.',
		hintDetails2: "Veuillez entrer l'e-mail et le code d'invitation pour rejoindre l'équipe existante.",
		hintDetails3: "L'email associé aux prochains espaces de travail",
		joinTeam: 'Rejoindre une équipe',
		joinExistTeam: 'Rejoindre une équipe existante ?',
		joinTeamHint: "Entrez le code d'invitation que nous vous avons envoyé par e-mail",
		step1Title: "Sélectionnez le nom de l'équipe",
		step2Title: 'Fournir plus de détails',
		step3Title: "Code d'invitation",
		confirmDetails: 'Veuillez vérifier votre e-mail pour confirmer le code',
		confirmDetails2: "Veuillez saisir le code d'invitation que nous vous avons envoyé par e-mail",
		sendCode: 'Renvoyer le code',
		codeNotReceived: "Vous n'avez pas reçu le code ?",
		inviteStepLabel: 'Indiquez votre e-mail',
		emailFieldLabel: 'Votre e-mail',
		teamNameFieldLabel: "Nom de l'équipe",
		inviteCodeFieldLabel: "Saisir le code d'invitation",
		selectWorkspaceFieldLabel: 'Sélectionnez un espace de travail',
		emailFieldPlaceholder: 'Entrez votre adresse email',
		teamNameFieldPlaceholder: 'Veuillez saisir le nom de votre équipe',
		userNameFieldPlaceholder: 'Entrez votre nom',
		tapContinue: 'Continuer',
		tapJoin: 'Rejoindre',
		createTeam: "Créer l'équipe"
	},
	myWorkScreen: {
		name: 'Travail',
		estimateLabel: 'Estimation',
		statusText: 'Statut',
		taskFieldPlaceholder: 'Sur quoi tu travailles',
		sizeText: 'Tailles',
		prioritiesText: 'Priorités',
		tabCreateTask: 'Créer une Nouvelle Tâche',
		labelText: 'Étiquette'
	},
	teamScreen: {
		name: 'Équipes',
		cardTotalTimeLabel: 'Temps total',
		cardTodayWorkLabel: "Travail d'aujourd'hui",
		cardTotalWorkLabel: 'Travail total',
		inviteButton: 'Inviter',
		inviteModalTitle: 'Inviter un membre dans votre équipe',
		inviteModalHint: "Envoyer une invitation à un membre de l'équipe par e-mail",
		inviteEmailFieldPlaceholder: "Saisir l'adresse e-mail",
		inviteNameFieldPlaceholder: "Saisir le nom du membre de l'équipe",
		sendButton: 'Créer',
		createNewTeamButton: 'Créer une nouvelle équipe'
	},
	taskDetailsScreen: {
		characterLimitErrorTitle: "Nous n'avons pas pu mettre à jour le titre de la tâche.",
		characterLimitErrorDescription: 'Le titre de la tâche ne peut pas dépasser 255 caractères.',
		copyTitle: 'Titre copié.',
		changeParent: 'Changer de parent',
		addParent: 'Ajouter un parent',
		taskScreen: 'Écran des tâches',
		details: 'Détails',
		taskPublic: 'Cette tâche est publique',
		makePrivate: 'Créer un privé',
		taskPrivate: 'Cette tâche est privée',
		makePublic: 'Faire un public',
		typeIssue: "Type d'Issue",
		creator: 'Créateur',
		assignees: 'Bénéficiaires',
		startDate: 'Date de début',
		dueDate: "Date d'échéance",
		daysRemaining: 'Jours restants',
		version: 'Version',
		epic: 'Épique',
		status: 'Statut',
		labels: 'Étiquettes',
		size: 'Taille',
		priority: 'Priorité',
		manageAssignees: 'Gérer les destinataires',
		setDueDate: "Définir la date d'échéance",
		setStartDate: 'Définir la date de début',
		items: 'Articles',
		estimate: 'Estimation',
		estimations: 'Estimations',
		time: 'Temps',
		progress: 'Progrès',
		timeToday: "Temps Aujourd'hui",
		totalGroupTime: 'Temps Total du Groupe',
		timeRemaining: 'Temps Restant',
		blocks: 'Blocs',
		clones: 'Clones',
		duplicates: 'Doublons',
		isBlockedBy: 'Est bloqué par',
		isClonedBy: 'Est cloné par',
		isDuplicatedBy: 'Est dupliqué par',
		relatesTo: 'Se rapporte à',
		linkedIssues: 'Problèmes liés',
		description: 'Description',
		descriptionBlockPlaceholder: 'Écrivez une description complète de votre projet...',
		copyDescription: 'Description copiée.',
		showMore: 'Afficher plus'
	},
	tasksScreen: {
		name: 'Tâches',
		now: 'Maintenant',
		last24hours: 'Dernières 24 heures',
		totalTimeLabel: 'Temps total',
		workedTab: 'Travaillée',
		assignedTab: 'Attribué',
		unassignedTab: 'Non attribué',
		createTaskButton: 'Créer une tâche',
		assignTaskButton: 'Attribuer une tâche',
		createButton: 'Créer',
		assignButton: 'Attribuer',
		resendInvitation: "Renvoyer l'invitation",
		editTaskLabel: 'Modifier la tâche',
		unassignTaskLabel: "Annuler l'attribution d'une tâche",
		unMakeManager: 'Défaire un manager',
		makeManager: 'Créer un gestionnaire',
		remove: 'Supprimer',
		filter: 'Filtre',
		apply: 'Appliquer',
		reset: 'Réinitialiser'
	},
	settingScreen: {
		name: 'Réglages',
		personalSection: {
			name: 'Personnel',
			fullName: 'Nom Complet',
			yourContact: 'Votre contact',
			yourContactHint: 'Vos coordonnées',
			themes: 'Thèmes',
			darkModeToLight: 'Mode sombre en mode clair',
			lightModeToDark: 'Mode clair au mode sombre',
			language: 'Langue',
			changeAvatar: "Changer d'avatar",
			timeZone: 'Fuseau horaire',
			workSchedule: 'Horaire de travail',
			workScheduleHint: 'Définissez votre horaire de travail maintenant',
			removeAccount: 'Supprimer le compte',
			removeAccountHint: 'Le compte sera supprimé de toutes les équipes, sauf si vous êtes le seul responsable',
			deleteAccount: 'Supprimer le compte',
			deleteAccountHint: 'Votre compte sera définitivement supprimé avec la suppression de toutes les équipes',
			detect: 'Détecter'
		},

		teamSection: {
			name: 'Équipe',
			teamName: "Nom de l'équipe",
			timeTracking: 'Suivi du temps',
			timeTrackingHint: 'Activer le suivi du temps',
			taskStatuses: 'Statuts des tâches',
			taskPriorities: 'Priorités des tâches',
			taskSizes: 'Tailles des tâches',
			taskLabel: 'Libellé de la tâche',
			changeLogo: 'Changer de logo',
			teamRole: 'Membre gestionnaire et rôle',
			workSchedule: 'Horaire de travail',
			workScheduleHint: 'Définissez votre horaire de travail maintenant',
			transferOwnership: 'Transfert de propriété',
			transferOwnershipHint: "Transférer la pleine propriété de l'équipe à un autre utilisateur",
			removeTeam: "Supprimer l'équipe",
			removeTeamHint:
				"L'équipe sera complètement supprimée du système et les membres de l'équipe perdront l'accès",
			quitTeam: "Quitter l'équipe",
			quitTeamHint: "Vous êtes sur le point de quitter l'équipe",
			areYouSure: 'Etes-vous sûr ?',
			changeTeamName: {
				mainTitle: 'Change Team Name',
				inputPlaceholder: 'Team Name'
			}
		},
		dangerZone: 'Zone dangereuse',
		modalChangeLanguageTitle: 'Changer de langue',
		languages: {
			english: 'Anglais ( États-Unis )',
			french: 'Français (France)',
			arabic: 'Arabe',
			russian: 'Russe',
			bulgarian: 'bulgare',
			spanish: 'Espagnol',
			korean: 'Coréen',
			hebrew: 'Hébreu'
		},
		versionScreen: {
			mainTitle: 'Versions de la tâche',
			listOfVersions: 'Liste des versions',
			noActiveVersions: 'Aucune version active',
			createNewVersionButton: 'Créer une nouvelle version',
			createNewVersionText: 'Créer une nouvelle version',
			versionNamePlaceholder: 'Nom de la version',
			cancelButtonText: 'Annuler',
			createButtonText: 'Créer',
			updateButtonText: 'Mettre à jour'
		},
		statusScreen: {
			mainTitle: 'Task Statuses',
			listStatuses: 'List of Statuses',
			noActiveStatuses: 'There are no active statuses',
			createStatusButton: 'Create new status',
			createNewStatusText: 'Create New Status',
			statusNamePlaceholder: 'Status Name',
			statusIconPlaceholder: 'Choose Icon',
			statusColorPlaceholder: 'Colors',
			cancelButtonText: 'Cancel',
			createButtonText: 'Create',
			updateButtonText: 'Update'
		},
		noTeamScreen: {
			createYourTeam: 'Create your own team or join existed',
			hintMessage: 'Lorem ipsum dolor sit amet consectetur. Blandit lobortis dui risus neque.'
		},
		priorityScreen: {
			mainTitle: 'Task Priorities',
			listPriorities: 'List of Priorities',
			noActivePriorities: 'There are no active priorities',
			createPriorityButton: 'Create new priority',
			createNewPriorityText: 'Create New Priority',
			priorityNamePlaceholder: 'Priority Name',
			priorityIconPlaceholder: 'Search Icon',
			priorityColorPlaceholder: 'Colors',
			cancelButtonText: 'Cancel',
			createButtonText: 'Create',
			updateButtonText: 'Update'
		},
		labelScreen: {
			mainTitle: 'Task Labels',
			listLabels: 'List of Labels',
			noActiveLabels: 'There are no active labels',
			createLabelButton: 'Create new label',
			createNewLabelText: 'Create New Labels',
			labelNamePlaceholder: 'Labels Name',
			labelIconPlaceholder: 'Choose Icon',
			labelColorPlaceholder: 'Colors',
			cancelButtonText: 'Cancel',
			createButtonText: 'Create',
			updateButtonText: 'Update'
		},
		sizeScreen: {
			mainTitle: 'Task Sizes',
			listSizes: 'List of Sizes',
			noActiveSizes: 'There are no active sizes',
			createSizeButton: 'Create new size',
			createNewSizeText: 'Create New Sizes',
			sizeNamePlaceholder: 'Size Name',
			sizeIconPlaceholder: 'Choose Icon',
			sizeColorPlaceholder: 'Colors',
			cancelButtonText: 'Cancel',
			createButtonText: 'Create',
			updateButtonText: 'Update'
		},
		membersSettingsScreen: {
			mainTitle: 'Membres et rôles',
			deleteUserConfirmation: "Êtes-vous sûr de vouloir supprimer l'utilisateur sélectionné?",
			changeRole: 'Changer le rôle',
			delete: 'Supprimer'
		},
		changeAvatar: {
			recentPictures: 'Photos récentes',
			recentFiles: 'Fichiers récents',
			selectFromGalery: 'Sélectionner depuis la galerie',
			selectFromFiles: 'Sélectionner depuis les fichiers',
			continueButton: 'Continuer',
			logoDeleteConfirmation: 'Êtes-vous sûr de vouloir supprimer le logo?',
			avatarDeleteConfirmation: 'Are you sure you want to delete the avatar?'
		},
		changeFullName: {
			firstNamePlaceholder: 'First Name',
			lastNamePlaholder: 'Last Name',
			mainTitle: 'Change Full Name'
		},
		contact: {
			mainTitle: 'Change Your Contact',
			emailPlaceholder: 'Email Address',
			phonePlaceholder: 'Phone Number',
			emailNotValid: 'Please provide a valid Email',
			phoneNotValid: 'Please provide a valid Phone Number'
		},
		changeTimezone: {
			mainTitle: 'Changer le fuseau horaire',
			selectTimezoneTitle: 'Choisir le fuseau horaire'
		},
		changeLanguage: {
			mainTitle: 'Changer la langue',
			selectLanguageTitle: 'Choisir la langue'
		}
	},
	hamburgerMenu: {
		darkMode: 'Mode sombre'
	},
	inviteModal: {
		accept: 'Accepter',
		reject: 'Rejeter',
		inviteHint: 'Vous avez été invité à rejoindre'
	},
	accountVerificationModal: {
		verify: 'Vérifier'
	},
	demoNavigator: {
		componentsTab: 'Components',
		debugTab: 'Debug',
		communityTab: 'Community',
		podcastListTab: 'Podcast'
	},
	demoCommunityScreen: {
		title: 'Connect with the community',
		tagLine:
			"Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
		joinUsOnSlackTitle: 'Join us on Slack',
		joinUsOnSlack:
			'Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.',
		joinSlackLink: 'Join the Slack Community',
		makeIgniteEvenBetterTitle: 'Make Ignite even better',
		makeIgniteEvenBetter:
			"Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
		contributeToIgniteLink: 'Contribute to Ignite',
		theLatestInReactNativeTitle: 'The latest in React Native',
		theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
		reactNativeRadioLink: 'React Native Radio',
		reactNativeNewsletterLink: 'React Native Newsletter',
		reactNativeLiveLink: 'React Native Live',
		chainReactConferenceLink: 'Chain React Conference',
		hireUsTitle: 'Hire Infinite Red for your next project',
		hireUs: "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
		hireUsLink: 'Send us a message'
	},
	demoShowroomScreen: {
		jumpStart: 'Components to jump start your project!',
		lorem2Sentences:
			'Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.',
		demoHeaderTxExample: 'Yay',
		demoViaTxProp: 'Via `tx` Prop',
		demoViaSpecifiedTxProp: 'Via `{{prop}}Tx` Prop'
	},
	demoDebugScreen: {
		howTo: 'HOW TO',
		title: 'Debug',
		tagLine:
			"Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
		reactotron: 'Send to Reactotron',
		reportBugs: 'Report Bugs',
		demoList: 'Demo List',
		demoPodcastList: 'Demo Podcast List',
		androidReactotronHint:
			"If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
		iosReactotronHint: "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
		macosReactotronHint: "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
		webReactotronHint: "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
		windowsReactotronHint: "If this doesn't work, ensure the Reactotron desktop app is running and reload app."
	},
	demoPodcastListScreen: {
		title: 'React Native Radio episodes',
		onlyFavorites: 'Only Show Favorites',
		favoriteButton: 'Favorite',
		unfavoriteButton: 'Unfavorite',
		accessibility: {
			cardHint: 'Double tap to listen to the episode. Double tap and hold to {{action}} this episode.',
			switch: 'Switch on to only show favorites',
			favoriteAction: 'Toggle Favorite',
			favoriteIcon: 'Episode not favorited',
			unfavoriteIcon: 'Episode favorited',
			publishLabel: 'Published {{date}}',
			durationLabel: 'Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds'
		},
		noFavoritesEmptyState: {
			heading: 'This looks a bit empty',
			content: 'No favorites have been added yet. Tap the heart on an episode to add it to your favorites!'
		}
	}
	// @demo remove-block-end
};

export default fr;
export type Translations = typeof fr;
