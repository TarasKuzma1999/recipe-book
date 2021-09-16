import { Ingredient } from 'src/app/shared/ingredient.module';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients!: Ingredient[]; 
  private igChangeSub!: Subscription;
  constructor( private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients()
    this.igChangeSub = this.slService.ingredientChanged.subscribe( (ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }

  onEditIngredient(i: number) {
    this.slService.startedEditting.next(i)
  }
 
  ngOnDestroy() {
    this.igChangeSub.unsubscribe()
  }
}
