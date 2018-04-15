import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import _cloneDeep = require('lodash/cloneDeep');

@Injectable()
export class RecipeService {

  public recipesChanged: Subject<Recipe[]>;

  private recipes: Recipe[] = [
    new Recipe('Tandori Chicken',
      'Spicy Tandori',
      'https://search.chow.com/thumbnail/640/0/www.chowstatic.com/assets/2014/09/30264_3000x2000_basic_whole_roasted_chicken.jpg',
      [new Ingredient('Chicken', 5),
        new Ingredient('Bun', 5)
      ]),

    new Recipe('Chicken Masala',
      'Yammi yammi',
      'https://cdn5.norecipes.com/wp-content/uploads/2015/05/23053212/recipechicken-chow-mein.1024x1024.jpg',
      [new Ingredient('Thai Chicken', 1),
        new Ingredient('Chilli', 15)
      ]),

    new Recipe('Chicken Masala',
      'Yammi yammi',
      'https://cdn5.norecipes.com/wp-content/uploads/2015/05/23053212/recipechicken-chow-mein.1024x1024.jpg',
      [new Ingredient('Chicken', 5),
        new Ingredient('Bun', 5)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {
    this.recipesChanged = new Subject<Recipe[]>();
  }

  getRecipes() {
    return _cloneDeep(this.recipes);
  }

  getRecipe(index: number) {
    return {...this.recipes[index]};
  }

  addIngredientsToShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.notifyRecipesChange();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = {...recipe};
    this.notifyRecipesChange();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.notifyRecipesChange();
  }

  private notifyRecipesChange() {
    this.recipesChanged.next(_cloneDeep(this.recipes));
  }
}
