import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("inputName")
  // nameInputRef!: ElementRef; 
  // @ViewChild("inputAmount")
  // amountInputRef!: ElementRef; 
  // @Output() ingredientAdded = new EventEmitter<Ingredient>()

  constructor(private slService: ShoppingListService, private http: HttpClient) { }
  @ViewChild('f')
  slFofm!: NgForm;
  private subscription!: Subscription;
  editMode = false;
  editIndex!: number
  editIngredient!: Ingredient

  ngOnInit(): void {
    this.subscription = this.slService.startedEditting.subscribe((index: number) => {
      this.editMode = true;
      this.editIndex = index;
      this.editIngredient = this.slService.getEdditIngredient(index)
      this.slFofm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.count
      })
    })
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      console.log(data)
    })
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount)
    if (this.editMode) {
      this.slService.updateIngredient(this.editIndex, newIngredient)
      this.editMode = false
    } else {
      this.slService.addNewIngredient(newIngredient)
    }
    form.reset()
  }

  onClearForm() {
    this.slFofm.reset()
    this.editMode = false
  }

  onDeleteIngredient() {
    if (this.editMode) {
      this.slService.deleteIngredient(this.editIndex)
      this.onClearForm()
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
