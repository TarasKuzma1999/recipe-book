import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.module';


export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>() 
    startedEditting = new Subject<number>() 

    private ingredients: Ingredient[] = [
        new Ingredient('Potato', 50),
        new Ingredient('Tomato', 10)
      ]

    getIngredients() {
        return this.ingredients.slice()
    }

    getEdditIngredient(index: number){
        return this.ingredients[index]
    }

    addNewIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    addIngredientsFromRecipe(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1)
        this.ingredientChanged.next(this.ingredients.slice())
    }
}