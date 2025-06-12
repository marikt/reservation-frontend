export class ServiceConfig {
  public badge: ServiceBadge;
  public rating: number;

  /**
   * if true dont allow book particular events, allow book only all evens within course
   */
  public bookOnlyWholeCourse: boolean;
}

export class ServiceBadge {
  public label;
  public type = 'success';

}
