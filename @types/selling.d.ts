interface Selling {
  id: number
  'Código Venda': number
  Data: string
  'ID Loja': string
  Produto: string
  Quantidade: number
  'Valor Unitário': number
  'Valor Final': number
}

type DateOrder = 'default' | 'asc' | 'desc'
