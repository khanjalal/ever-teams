import {
  getAccessTokenCookie,
  getOrganizationIdCookie,
  getTenantIdCookie,
} from "@app/helpers/cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { currentAuthenticatedUserRequest } from "../requests/auth";

export async function authenticatedGuard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = getAccessTokenCookie({ req, res });
  const tenantId = getTenantIdCookie({ req, res });
  const organizationId = getOrganizationIdCookie({ req, res });

  const r_res = await currentAuthenticatedUserRequest(
    access_token?.toString() || ""
  ).catch(console.error);

  if (!r_res || (r_res.data as any).statusCode === 401) {
    res.status(401);
    return {
      $res: () => res.json({ statusCode: 401, message: "Unauthorized" }),
      user: null,
    };
  }

  return {
    $res: res,
    user: r_res.data,
    access_token: access_token as string,
    tenantId,
    organizationId,
  };
}