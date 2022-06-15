import { Categoria } from './categoria';

export class Producto{
    id? : string;
    nombre?: string;
    descripcion?: string;
    masdescripcion?: string; 
    imagen?: string;
    images?: string[];
    marca?: string;
    precio?: number;
    categoria?: Categoria;
    stock?: number;
    rating?: number;
    numvisto?: boolean;
    destacado?: string;
}