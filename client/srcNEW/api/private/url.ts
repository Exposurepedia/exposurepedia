/**
 * todo: UPDATE DURING DEPLOYMENT USING ENVIRONMENT VARIABLES
 */
export const BACKENDURL = process.env.PUBLIC_URL
  ? process.env.PUBLIC_URL
  : 'http://localhost:3000';

export const URLPREFIX = `${BACKENDURL}/api`;
