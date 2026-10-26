import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { PRODUCTOS_INICIALES } from './data/productos.seed';

@Injectable()
export class ProductosService {
  // Arreglo donde almacenamos los productos
  private productos: Producto[] = PRODUCTOS_INICIALES.map((producto) => ({ ...producto }));

  // Contador para generar IDs sin repetirlos
  private siguienteId = 17;

  // ======================================
  // GET - CONSULTAR PRODUCTOS
  // ======================================

  findAll() {
    return this.productos;
  }

  // ======================================
  // GET - CONSULTAR UN PRODUCTO POR ID
  // ======================================

  findOne(id: number) {
    const producto = this.productos.find((producto) => producto.id === id);

    // Si no existe, devolver error 404
    if (!producto) {
      throw new NotFoundException(`No existe un producto con id ${id}`);
    }

    return producto;
  }

  // ======================================
  // POST - AGREGAR PRODUCTOS
  // ======================================

  create(datos: CreateProductoDto) {
    // Si la foto ya existe, devolver error 409
    if (this.productos.some((producto) => producto.foto === datos.foto)) {
      throw new ConflictException(
        `Ya existe un producto con la foto "${datos.foto}". Usa otro nombre o elimina el producto existente.`,
      );
    }

    const nuevoProducto = {
      id: this.siguienteId++,
      nombre: datos.nombre,
      linea: datos.linea,
      categoria: datos.categoria,
      material: datos.material,
      precio: datos.precio,
      foto: datos.foto,
      disponible: datos.disponible ?? true,
    };

    // Agregamos el nuevo producto al arreglo
    this.productos.push(nuevoProducto);

    return nuevoProducto;
  }

  // ======================================
  // PATCH - MODIFICAR PRODUCTOS
  // ======================================

  update(id: number, datos: UpdateProductoDto) {
    const producto = this.findOne(id);

    // Si no se envía ningún campo, devolver error 400
    if (Object.keys(datos).length === 0) {
      throw new BadRequestException('Debe enviar al menos un campo para actualizar el producto');
    }

    // Si la foto ya la tiene otro producto, devolver error 409
    if (
      datos.foto &&
      this.productos.some((p) => p.foto === datos.foto && p.id !== id)
    ) {
      throw new ConflictException(
        `Ya existe un producto con la foto "${datos.foto}". Usa otro nombre o elimina el producto existente.`,
      );
    }

    // Actualizar solamente las propiedades recibidas
    Object.assign(producto, datos);

    return producto;
  }

  // ======================================
  // DELETE - ELIMINAR PRODUCTOS
  // ======================================

  remove(id: number) {
    // Buscar la posición del producto en el arreglo
    const indice = this.productos.findIndex((producto) => producto.id === id);

    // Si no existe, devolver error 404
    if (indice === -1) {
      throw new NotFoundException(`No existe un producto con id ${id}`);
    }

    // Eliminar un elemento del arreglo
    const eliminado = this.productos.splice(indice, 1);

    return {
      mensaje: `Producto ${id} eliminado correctamente`,
      producto: eliminado[0],
    };
  }
}
