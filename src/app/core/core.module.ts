import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRouterModule} from '../app-router.module';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthGuardService} from '../auth/auth-guard.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {httpInterceptors} from '../shared/http-interceptors';
import {MessageService} from '../shared/message.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRouterModule
  ],
  exports:[
    AppRouterModule,
    HeaderComponent
  ],
  providers:[
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    AuthGuardService,
    httpInterceptors,
    MessageService
  ]
})
export class CoreModule {}
