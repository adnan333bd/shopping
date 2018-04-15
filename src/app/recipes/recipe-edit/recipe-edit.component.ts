import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSave() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.formBuilder.group({
        'name': '',
        'amount': ''
      })
    );
  }


  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredientsArray: FormArray = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.map(i => this.formBuilder.group({
            'name': [i.name, Validators.required],
            'amount': [i.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
          })
        ).map(g => recipeIngredientsArray.push(g));
      }
    }

    this.recipeForm = this.formBuilder.group({
      'name': [recipeName, Validators.required],
      'imagePath': [recipeImagePath, Validators.required],
      'description': [recipeDescription, Validators.required],
      'ingredients': recipeIngredientsArray
    });
  }

  public getArrayControls(arrayName: string) {
    return (<FormArray>this.recipeForm.get(arrayName)).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
