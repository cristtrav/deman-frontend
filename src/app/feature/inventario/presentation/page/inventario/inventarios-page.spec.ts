import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosPage } from './inventarios-page';

describe('Inventarios Page', () => {
  let component: InventariosPage;
  let fixture: ComponentFixture<InventariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventariosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
