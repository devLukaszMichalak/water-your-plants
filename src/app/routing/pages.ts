export enum PageRouts {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  TODO = 'todo',
}

export function getRouterLink(path: PageRouts): string[] {
  return ['/' + path];
}
