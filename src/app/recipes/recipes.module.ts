import {NgModule} from '@angular/core';

import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipesRouterModule} from './recipes-router.module';
import {SharedModule} from '../shared/shared.module';


@NgModule(
  {
    imports: [
      ReactiveFormsModule,
      SharedModule,
      RecipesRouterModule
    ],
    declarations: [
      RecipeEditComponent,
      RecipesComponent,
      RecipeDetailComponent,
      RecipeItemComponent,
      RecipeListComponent,
      RecipeStartComponent
    ]
  }
)
export class RecipesModule {
}
