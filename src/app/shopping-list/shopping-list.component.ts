import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList$: Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ shoppingList: {ingredients: Ingredient[]} }>) {
  }

  ngOnInit() {
    this.shoppingList$ = this.store.select('shoppingList');
  }

  onSelectItem(index: number) {
    this.shoppingListService.ingredientSelectedInList.next(index);
  }

}
