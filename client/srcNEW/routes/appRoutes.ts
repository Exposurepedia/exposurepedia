export enum appRoutes {
  landing = '',
  about = 'about',
  contact = 'contact',
  register = 'register',
  login = 'login',
  exposurepedia = 'exposurepedia',
  hierarchies = 'hierarchies',
  resources = 'resources',
}

export const AppRouteLabels = {
  [appRoutes.landing]: 'Home',
  [appRoutes.about]: 'About',
  [appRoutes.contact]: 'Contact Us',
  [appRoutes.register]: 'Sign Up',
  [appRoutes.login]: 'Login',
  [appRoutes.exposurepedia]: 'Exposurepedia',
  [appRoutes.hierarchies]: 'Hierarchies',
  [appRoutes.resources]: 'Resources',
};

export const publicNavBarRoutes = [
  appRoutes.landing,
  appRoutes.about,
  appRoutes.contact,
  appRoutes.register,
  appRoutes.login,
];
export const authorizedNavBarRoutes = [
  appRoutes.exposurepedia,
  appRoutes.hierarchies,
  appRoutes.resources,
];
