import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBooklistComponent } from './library-booklist.component';

describe('LibraryBooklistComponent', () => {
  let component: LibraryBooklistComponent;
  let fixture: ComponentFixture<LibraryBooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryBooklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryBooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
