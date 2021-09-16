import { Recipe } from './../recipes-list/recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeId !: number
  editMode = false
  recipeForm!: FormGroup
  forList = []
  

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }
  recipes!: Recipe[]

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.recipeId = param['id']
      this.editMode = param['id'] != null;
      this.initForm()
    })   
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(),
        'amount' : new FormControl()
      })
    )
  }

   initForm() {
    let recipeName = ''
    let imagePath = ''
    let description = ''
    let recipeIngredients = new FormArray([])    
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId)
      recipeName = recipe.name
      imagePath = recipe.imagePath
      description = recipe.description
      
      // if(recipe['ingredients']) {
      //   for( let ingredient of recipe.ingredients){
      //     recipeIngredients.push(
      //       new FormGroup({
      //         'name' : new FormControl(ingredient.name),
      //         'amount' : new FormControl(ingredient.count)
      //       })
      //     )
      //   }
      // }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(description),
      
    })
  }

 

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value)
    } else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
  }
}
