import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { Character } from '@core/interfaces/character.interface';
import { RequestInfo } from '@core/interfaces/requestInfo.interface';
import { CharacterService } from '@shared/services/character.service';
import { HttpError } from '@app/core/models/httpError';
import { ObjectUnsubscribedError } from 'rxjs';


@Component({
	selector: 'app-character-list',
	templateUrl: './character-list.component.html',
	styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

	public characters:Character[] = [];
	public requestInfo:RequestInfo = {};
	public showGoUpButton:boolean = false;
	private pageNum:number = 1;
	private query: string = "";
  
	constructor(
		@Inject(DOCUMENT) private document:Document,
		private characterSvc: CharacterService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.onUrlChanged();
	}
  
	ngOnInit(): void {
		this.getCharactersByQuery();
	}
  
	public onScrollDown(): void {
		if (this.requestInfo.next) {
			this.pageNum++;
			this.getDataFromService();
		}
	}
  
	public onScrollTop(): void {
		this.document.body.scrollTop = 0;
		this.document.documentElement.scrollTop = 0;
	}
  
	private onUrlChanged(): void {
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				this.characters = [];
				this.pageNum = 1;
				this.getCharactersByQuery();
			}
		);
	}

	private getCharactersByQuery(): void {
		this.route.queryParams.pipe(take(1)).subscribe((params: any) => {
			this.query = params['query'];
			this.getDataFromService();
		});
	}

	private getDataFromService(): void {
		this.characterSvc.searchCharacters(this.query, this.pageNum).pipe(take(1)).subscribe((res: any) => {
			if (res?.results?.length) {
				const { info, results } = res;
				this.characters = [...this.characters, ...results.slice(0, 8)];
				this.characters = this.characters.filter((characters, index, array) => index === array.findIndex(obj => (obj.id === characters.id)));
				this.requestInfo = info;
			} else {
				this.characters = [];
			}
		}, (error:HttpError) => console.log((error.friendlyMessage)));
	}

}