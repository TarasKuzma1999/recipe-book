import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipes-list/recipe.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe!: Recipe;
  id!: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  onAddToShoppingList() {
    this.recipeService.getIngredientsToSoppingList(this.recipe.ingredients)

  }

  onToEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
    this.http.get<Recipe[]>('https://recipe-book-3d667-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').subscribe(recipes => {
      console.log(recipes)
      this.recipeService.setRecipes(recipes)
  })
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
  }

}
