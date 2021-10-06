import { Ingredient } from 'src/app/shared/ingredient.module';
import { Injectable } from '@angular/core';
import { Recipe } from './recipes-list/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()

    private recipes: Recipe[] = [
        new Recipe('A test resipes',
         'A simple text',
         'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
         [ new Ingredient('meat', 4)]
         )
        
    ]

    constructor(private slService: ShoppingListService){}

   

    getRecipes() {
        return this.recipes.slice()
    }

    getRecipe(id: number) {
        return this.recipes[id]
    }

    getIngredientsToSoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredientsFromRecipe(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(id: number, recipe: Recipe) {
        this.recipes[id] = recipe     
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
    }

    setRecipes(recipes: Recipe[]) {        
        this.recipes = recipes;
        console.log(this.recipes)
        this.recipesChanged.next(this.recipes.slice())   
    }
}