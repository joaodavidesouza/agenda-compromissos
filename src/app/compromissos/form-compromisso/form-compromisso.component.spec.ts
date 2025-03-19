import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompromissoComponent } from './form-compromisso.component';

describe('FormCompromissoComponent', () => {
  let component: FormCompromissoComponent;
  let fixture: ComponentFixture<FormCompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCompromissoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
