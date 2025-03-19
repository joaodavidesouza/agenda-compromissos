import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheCompromissoComponent } from './detalhe-compromisso.component';

describe('DetalheCompromissoComponent', () => {
  let component: DetalheCompromissoComponent;
  let fixture: ComponentFixture<DetalheCompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheCompromissoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
