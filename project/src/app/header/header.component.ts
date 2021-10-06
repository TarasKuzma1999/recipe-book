import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    
  }
  onSaveRecipes(){
    this.dataStorageService.storeRecipes()
  }

  onFetchRecipe() {
    console.log('click')
    this.dataStorageService.fetchRecipes()
  }
}
