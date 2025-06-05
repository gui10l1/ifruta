import sellerOne from '../assets/diadia.png';
import sellerTwo from '../assets/assai.png';
import sellerThree from '../assets/super-adega.png';
import { ImageSourcePropType } from 'react-native';


export interface ISeller {
  id: number;
  image: ImageSourcePropType;
  name: string;
  email: string;
  phone: string;
}

const sellers: ISeller[] = [
  {
    id: 1,
    name: 'Atacadão Dia a Dia',
    image: sellerOne,
    email: 'contato@diaadia.com.br',
    phone: '(61) 98888-4444',
  },
  {
    id: 2,
    name: 'Assaí Atacadista',
    image: sellerTwo,
    email: 'contato@assai.com.br',
    phone: '(61) 98888-3333',
  },
  {
    id: 3,
    name: 'Atacadista Super Adega',
    image: sellerThree,
    email: 'contato@superadega.com.br',
    phone: '(61) 98888-1111',
  },
]

export default sellers;
