const mapping: Record<string, string> = {
  companies: 'company',
  saunas: 'sauna',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
