import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    this.authService.getToken()
      .then((token: string) => {
        this.httpClient.put<Recipe[]>('https://shoppinglist-9c9f6.firebaseio.com/recipes.json?auth=' + token,
          this.recipeService.getRecipes())
          .subscribe((recipes: Recipe[]) => {
            console.log(recipes);
          }, (error) => {
            console.log(error);
          });
      });
  }

  getRecipes() {
    this.authService.getToken()
      .then((token: string) => {
        this.httpClient.get<Recipe[]>('https://shoppinglist-9c9f6.firebaseio.com/recipes.json?auth=' + token)
          .map((recipes: Recipe[]) => {
            return recipes.map(r => {
              if (!r['ingredients']) {
                r['ingredients'] = [];
              }
              return r;
            });
          })
          .subscribe((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
            console.log(recipes);
          }, (error) => {
            console.log(error);
          });
      });
  }
}
