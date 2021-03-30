export class IGetUserPointsRequestDTO {
  id: number;
}

export interface IGetUserPointsResponseDTO {
  approved_points: number;
  under_analysis: number;
  failed_points: number;
}
