export interface IShowACCWithUserRequestDTO {
  id: number;
}

export interface IShowACCWithUserResponseDTO {
  id: number;
  quantity: string;
  certificate_id: number;
  user: {
    id: number;
    name: string;
    cpf: string;
  };
  acc_type: {
    id: number;
    name: string;
    unity_of_measurement: {
      id: number;
      name: string;
    };
  };
}
