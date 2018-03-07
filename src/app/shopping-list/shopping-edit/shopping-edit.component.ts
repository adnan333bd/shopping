import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() createNewIngredientEvent = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }

  addNewIngredient() {
    const name: string = this.nameInput.nativeElement.value;
    const amount: number = +(this.amountInput.nativeElement.value);
    this.createNewIngredientEvent.emit(new Ingredient(name, amount));
  }
}
