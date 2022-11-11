import { PaginationResponse } from "@app/interfaces/IDataResponse";
import {
  IOrganizationTeam,
  IOrganizationTeamCreate,
  IOrganizationTeamList,
} from "@app/interfaces/IOrganizationTeam";
import { serverFetch } from "../fetch";

export function createOrganizationTeamRequest(
  datas: IOrganizationTeamCreate,
  bearer_token: string
) {
  return serverFetch<IOrganizationTeam>({
    path: "/organization-team",
    method: "POST",
    body: datas,
    bearer_token,
  });
}

export function updateOrganizationTeamRequest(
  datas: IOrganizationTeamCreate & { id: string },
  bearer_token: string
) {
  const { id, ...body } = datas;
  return serverFetch<IOrganizationTeam>({
    path: `/organization-team/${id}`,
    method: "PUT",
    body,
    bearer_token,
  });
}

export function getOrganizationTeamRequest(id: string, bearer_token: string) {
  return serverFetch<IOrganizationTeamList>({
    path: `/organization-team/${id}`,
    method: "GET",
    bearer_token,
  });
}

type TeamRequestParams = {
  organizationId: string;
  tenantId: string;
  relations?: string[];
};

export function getAllOrganizationTeamRequest(
  {
    organizationId,
    tenantId,
    relations = [
      "members",
      "members.role",
      "members.employee",
      "members.employee.user",
    ],
  }: TeamRequestParams,
  bearer_token: string
) {
  const params = {
    "where[organizationId]": organizationId,
    "where[tenantId]": tenantId,
  } as { [x: string]: string };

  relations.forEach((rl, i) => {
    params[`relations[${i}]`] = rl;
  });

  const query = new URLSearchParams(params);

  return serverFetch<PaginationResponse<IOrganizationTeamList>>({
    path: `/organization-team?${query.toString()}`,
    method: "GET",
    bearer_token,
    tenantId,
  });
}
