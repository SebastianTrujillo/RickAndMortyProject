import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharacterListComponent } from '@characters/character-list/character-list.component';


@NgModule({
	declarations: [CharacterListComponent],
	imports: [
		CommonModule,
		RouterModule,
		InfiniteScrollModule
	],
	exports: [CharacterListComponent]
})
export class CharactersModule { }
