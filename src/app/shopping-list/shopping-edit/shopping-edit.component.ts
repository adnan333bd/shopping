import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, UpdateIngredient} from '../store/shopping-list.action';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingItemForm') shoppingItemForm: NgForm;

  subscription_ingredientSelected: Subscription;
  edit_mode = false;
  selectedItemIndex = -1;
  selectedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  ngOnInit() {
    this.subscription_ingredientSelected = this.shoppingListService
      .ingredientSelectedInList
      .subscribe((index: number) => {
        this.edit_mode = true;
        this.selectedItemIndex = index;
        this.selectedItem = this.shoppingListService.getIngredient(index);
        this.shoppingItemForm.setValue({
          'name': this.selectedItem.name,
          'amount': this.selectedItem.amount
        });
      });
  }

  onSubmitItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value['name'], form.value['amount']);
    if (this.edit_mode) {
      this.store.dispatch(new UpdateIngredient({index: this.selectedItemIndex, ingredient: newIngredient}));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.shoppingItemForm.reset();
    this.edit_mode = false;
    this.selectedItemIndex = -1;
  }

  onDelete() {
    if (this.selectedItemIndex >= 0) {
      this.store.dispatch(new DeleteIngredient((this.selectedItemIndex)));
      this.onClear();
    }
  }

  ngOnDestroy() {
    this.subscription_ingredientSelected.unsubscribe();
  }
}
