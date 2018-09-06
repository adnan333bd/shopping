import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

import cloneDeep from 'lodash-es/cloneDeep';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientSelectedInList = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatos', 5)
  ];

  constructor() {
  }

  getIngredient(index: number): Ingredient {
    return {...this.ingredients[index]};
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...cloneDeep<Ingredient[]>(ingredients));
    this.notifyIngredientsChanged();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = {...newIngredient};
    this.notifyIngredientsChanged();
  }


  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.notifyIngredientsChanged();
  }


  private notifyIngredientsChanged() {
    this.ingredientsChanged.next(cloneDeep<Ingredient[]>(this.ingredients));
  }

}
