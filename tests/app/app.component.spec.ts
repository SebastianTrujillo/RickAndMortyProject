import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../src/app/app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
		imports: [
			RouterTestingModule
		],
		declarations: [
			AppComponent
		],
		}).compileComponents();
	});

	test('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const component = fixture.componentInstance;
		expect(component).toBeTruthy();
	});

	test(`should have as title 'RickAndMortyProject'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const component = fixture.componentInstance;
		expect(component.title).toEqual('RickAndMortyProject');
	});

});
