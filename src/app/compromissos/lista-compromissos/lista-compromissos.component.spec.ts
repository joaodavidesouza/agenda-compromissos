import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCompromissosComponent } from './lista-compromissos.component';

describe('ListaCompromissosComponent', () => {
  let component: ListaCompromissosComponent;
  let fixture: ComponentFixture<ListaCompromissosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCompromissosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCompromissosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
