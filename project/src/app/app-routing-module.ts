import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRouters: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: EditRecipeComponent },
            { path: ':id', component: RecipesDetailComponent },
            { path: ':id/edit', component: EditRecipeComponent }

        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent }
]


@NgModule({
    imports: [
        RouterModule.forRoot(appRouters)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}