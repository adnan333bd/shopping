import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
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
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return {...this.recipes[index]};
  }

  addIngredientsToShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }
}
