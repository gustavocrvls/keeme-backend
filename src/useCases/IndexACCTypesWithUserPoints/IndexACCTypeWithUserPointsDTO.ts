export interface IIndexACCTypesWithUserPointsRequestDTO {
  user_id: number;
}

export interface IACCTypesWithUserPointsResponseDTO {
  id: number;
  name: string;
  description: string;
  point_limit: number;
  unit_of_measurement: {
    id: number;
    name: string;
  };
  approved_points: number;
  points_under_analisys: number;
}
