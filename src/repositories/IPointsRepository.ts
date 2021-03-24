export interface IPointsByStatus {
  status_id: number;
  user_id: number;
}

export interface IACCPoints {
  status_id: number;
  limit: number;
  points: number;
}

export interface IPointsRepository {
  getPointsByStatus(data: IPointsByStatus): Promise<IACCPoints[]>;
}
