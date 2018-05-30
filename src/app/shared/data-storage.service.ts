import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes(): Promise<Recipe[]> {
    return this.httpClient.put<Recipe[]>('https://shoppinglist-9c9f6.firebaseio.com/recipes.json',
      this.recipeService.getRecipes())
      .toPromise();
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>('https://shoppinglist-9c9f6.firebaseio.com/recipes.json')
      .map((recipes: Recipe[]) => {
        return recipes.map(recipe => {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
          return recipe;
        });
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }, (error) => {
        console.log(error);
      });
  }
}
