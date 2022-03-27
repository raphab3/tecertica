interface Address {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

export default interface IManagersDto {
  id: string
  full_name: string
  cpf: string
  address: Address
  email: string
  phone: string
  disabled: boolean
  profile_image_url: string
  user_id: string
}
