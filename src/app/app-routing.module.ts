import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path: 'home/add-movies', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/movies/add-movies/add-movies.module').then(m => m.AddMoviesModule)},
  {path: 'shows/add-show', canActivate: [AuthGuard], loadChildren: () => import('./pages/shows/add-show/add-show.module').then(m => m.AddShowModule)},
  {path: 'login', loadChildren:() => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren:() => import('./pages/register/register.module').then(m => m.RegisterModule)},
  {path: 'shows', loadChildren:() => import('./pages/shows/shows.module').then(m => m.ShowsModule)},
  {path: 'profile',canActivate: [AuthGuard], loadChildren:() => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
  {path: 'not-found', loadChildren:() => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: 'login/forgot-pswd', loadChildren: () => import('./pages/login/forgot-pswd/forgot-pswd.module').then(m => m.ForgotPswdModule) },
  {path: 'logout', loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
