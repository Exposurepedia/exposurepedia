export enum appRoutes {
  home = '',
  about = 'about',
  contact = 'contact',
  signup = 'signup',
  login = 'login',
  exposurepedia = 'exposurepedia',
  hierarchies = 'hierarchies',
  resources = 'resources',
}

export const AppRouteLabels = {
  [appRoutes.home]: 'Home',
  [appRoutes.about]: 'About',
  [appRoutes.contact]: 'Contact Us',
  [appRoutes.signup]: 'Sign Up',
  [appRoutes.login]: 'Login',
  [appRoutes.exposurepedia]: 'Exposurepedia',
  [appRoutes.hierarchies]: 'Hierarchies',
  [appRoutes.resources]: 'Resources',
};

export const publicNavBarRoutes = [
  appRoutes.home,
  appRoutes.about,
  appRoutes.contact,
];
export const authorizedNavBarRoutes = [
  appRoutes.exposurepedia,
  appRoutes.hierarchies,
  appRoutes.resources,
];
