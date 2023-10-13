// useHotkeys.ts
import { useEffect } from 'react';
import hotkeys from 'hotkeys-js';

export const useHotkeys = (key: string, callback: () => void) => {
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		hotkeys(key, (event, handler) => {
			event.preventDefault();
			callback();
		});

		return () => {
			hotkeys.unbind(key);
		};
	}, [key, callback]);
};

export const HostKeys = {
	START_STOP_TIMER: 'ctrl+option+],ctrl+alt+],ctrl+option+[,ctrl+alt+[',
	ASSIGN_TASK: 'shift+a,a',
	SHORTCUT_LIST: 'shift+h,h',
	CREATE_TASK: 'shift+c,c'
};

export const HostKeysMapping = [
	{
		heading: 'Help',
		keySequence: [
			{
				label: 'To Open Shortcut List',
				sequence: {
					MAC: ['H'],
					OTHER: ['H']
				}
			}
		]
	},
	{
		heading: 'Timer',
		keySequence: [
			{
				label: 'Start Timer',
				sequence: {
					MAC: ['Ctrl(⌃)', 'Opt(⌥)', ']'],
					OTHER: ['Ctrl', 'Alt', ']']
				}
			},
			{
				label: 'Stop Timer',
				sequence: {
					MAC: ['Ctrl(⌃)', 'Opt(⌥)', '['],
					OTHER: ['Ctrl', 'Alt', '[']
				}
			}
		]
	},
	{
		heading: 'Task',
		keySequence: [
			{
				label: 'Assign Task',
				sequence: {
					MAC: ['A'],
					OTHER: ['A']
				}
			},
			{
				label: 'Create Task',
				sequence: {
					MAC: ['C'],
					OTHER: ['C']
				}
			}
		]
	}
];
