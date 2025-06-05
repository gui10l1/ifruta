import oranges from '../assets/pCjw_ygKCv0.png';
import carrot from '../assets/ZgDHMMd72I8.png';
import cuke from '../assets/Za9HGBK5ALA.png';
import tomatoes from '../assets/idealbookshelfcp524-wgbhamericanexperience-bannedbooks-2000web 1.png';
import leafs from '../assets/vegetable-salad-spinach-leaf-hd-png-11653148602v7y8oymh2y 3.png';
import { ImageSourcePropType } from 'react-native';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  owner: string;
  price: number;
  image: ImageSourcePropType;
  ownerId: number;
}

const products: IProduct[] = [
  {
    id: 1,
    name: 'Oranges',
    description: 'Juicy, sweet citrus fruits with a bright orange peel. High in vitamin C and commonly eaten fresh or as juice.',
    owner: 'Atacadão Dia a Dia',
    price: 10,
    image: oranges,
    ownerId: 1,
  },
  {
    id: 2,
    name: 'Carrots',
    description: 'Crunchy, orange root vegetables with a mildly sweet flavor. Rich in beta-carotene, which the body converts to vitamin A.',
    owner: 'Assaí Atacadista',
    price: 6,
    image: carrot,
    ownerId: 2,
  },
  {
    id: 3,
    name: 'Cuke',
    description: 'Short for "cucumber." A green-skinned vegetable with a mild taste and high water content. Often eaten raw in salads or pickled.',
    owner: 'Atacadista Super Adega',
    price: 5,
    image: cuke,
    ownerId: 3,
  },
  {
    id: 4,
    name: 'Tomatoes',
    description: 'Red (sometimes yellow or green) fruits with a juicy texture and slightly tangy flavor. Widely used fresh or cooked in many dishes.',
    owner: 'Assaí Atacadista',
    price: 7,
    image: tomatoes,
    ownerId: 2,
  },
  {
    id: 5,
    name: 'Leafs',
    description: 'A general term for vegetables like lettuce, spinach, or kale. Packed with fiber, vitamins, and minerals; often eaten raw in salads.',
    owner: 'Atacadão Dia a Dia',
    price: 3.5,
    image: leafs,
    ownerId: 1,
  },
]

export default products;
