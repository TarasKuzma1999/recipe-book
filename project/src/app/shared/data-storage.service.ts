import { Recipe } from './../recipes/recipes-list/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http.put('https://recipe-book-3d667-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
            console.log(response)
        })
    }

    fetchRecipes() {
        this.http.get<Recipe[]>('https://recipe-book-3d667-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').subscribe(recipes => {
            console.log(recipes)
            this.recipeService.setRecipes(recipes)
        })
    }
}