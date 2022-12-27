import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookViewComponent } from './library-book-view.component';

describe('LibraryBookViewComponent', () => {
  let component: LibraryBookViewComponent;
  let fixture: ComponentFixture<LibraryBookViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryBookViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
