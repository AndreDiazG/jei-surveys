export class Survey {
  id?: number;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  ownerId: number;

  constructor(
    title: string,
    ownerId: number,
    description?: string,
    isActive: boolean = true,
    id?: number,
    createdAt?: Date,
  ) {
    this.title = title;
    this.ownerId = ownerId;
    this.description = description;
    this.isActive = isActive;
    this.id = id;
    this.createdAt = createdAt;
  }
}
