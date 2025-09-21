import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipBadgeComponent } from './relationship-badge.component';

describe('RelationshipBadgeComponent', () => {
  let component: RelationshipBadgeComponent;
  let fixture: ComponentFixture<RelationshipBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationshipBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationshipBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
