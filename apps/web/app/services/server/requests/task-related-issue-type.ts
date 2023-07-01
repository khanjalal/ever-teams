import {
	ITaskRelatedIssueTypeCreate,
	ITaskRelatedIssueTypeItemList,
} from '@app/interfaces';
import { serverFetch } from '../fetch';

export function createRelatedIssueTypeRequest(
	datas: ITaskRelatedIssueTypeCreate,
	bearer_token: string,
	tenantId?: any
) {
	return serverFetch<ITaskRelatedIssueTypeItemList>({
		path: '/task-related-issue-types',
		method: 'POST',
		body: datas,
		bearer_token,
		tenantId,
	});
}

export function editTaskRelatedIssueTypeRequest({
	id,
	datas,
	bearer_token,
	tenantId,
}: {
	id: string | any;
	datas: ITaskRelatedIssueTypeCreate;
	bearer_token: string;
	tenantId?: any;
}) {
	return serverFetch<ITaskRelatedIssueTypeItemList>({
		path: `/task-related-issue-types/${id}`,
		method: 'PUT',
		body: datas,
		bearer_token,
		tenantId,
	});
}

export function deleteTaskRelatedIssueTypeRequest({
	id,
	bearer_token,
	tenantId,
}: {
	id: string | any;
	bearer_token: string | any;
	tenantId?: any;
}) {
	return serverFetch<ITaskRelatedIssueTypeItemList>({
		path: `/task-related-issue-types/${id}`,
		method: 'DELETE',
		bearer_token,
		tenantId,
	});
}

export function getTaskRelatedIssueTypeListRequest<
	ITaskRelatedIssueTypeItemList
>(
	{
		organizationId,
		tenantId,
		activeTeamId,
	}: {
		tenantId: string;
		organizationId: string;
		activeTeamId: string | null;
	},
	bearer_token: string
) {
	return serverFetch({
		path: `/task-related-issue-types?tenantId=${tenantId}&organizationId=${organizationId}&organizationTeamId=${activeTeamId}`,
		method: 'GET',
		bearer_token,
	});
}