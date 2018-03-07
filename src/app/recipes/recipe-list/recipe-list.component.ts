import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Tandori',
      'Spicy Tandori',
      'https://search.chow.com/thumbnail/640/0/www.chowstatic.com/assets/2014/09/30264_3000x2000_basic_whole_roasted_chicken.jpg'),

    new Recipe('Chicken Masala',
      'Yammi yammi',
      'https://cdn5.norecipes.com/wp-content/uploads/2015/05/23053212/recipechicken-chow-mein.1024x1024.jpg')
  ];
  @Output() recipeSelectedEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelected(recipeItem: Recipe) {
    this.recipeSelectedEvent.emit(recipeItem);
  }

}
