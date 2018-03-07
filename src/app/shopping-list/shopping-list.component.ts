import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 10.5),
    new Ingredient('Tomatos', 5.5)
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onNewIngredientCreated(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
