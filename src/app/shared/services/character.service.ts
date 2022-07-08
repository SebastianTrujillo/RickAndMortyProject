import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Character } from '@core/interfaces/character.interface';
import { environment } from '@environment/environment';
import { HttpError } from '@app/core/models/httpError';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

	constructor(
		private http: HttpClient
	) {}

	public searchCharacters(query = '', page = 1): Observable<Character[] | HttpError> {
		const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
		return this.http.get<Character[]>(filter)
		.pipe(catchError((err) => this.handleHttpError(err)));
	}

	private handleHttpError(error: HttpErrorResponse): Observable<HttpError> {
		let dataError = new HttpError();
		dataError.errorNumber = error.status;
		dataError.message = error.statusText;
		dataError.friendlyMessage = 'An error occured.';
		return throwError(dataError);
	}

}
