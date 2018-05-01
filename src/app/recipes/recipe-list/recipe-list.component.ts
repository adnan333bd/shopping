import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangeSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangeSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      console.log(recipes);
      this.recipes = recipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activateRoute});
  }

  ngOnDestroy() {
    this.recipeChangeSubscription.unsubscribe();
  }

}
