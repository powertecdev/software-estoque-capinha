import { describe, it, expect } from 'vitest';
import { ProductVariant } from '../../src/domain/entities/ProductVariant';

describe('ProductVariant Entity', () => {
  const createVariant = () =>
    ProductVariant.create({
      id: 'test-id',
      productId: 'prod-1',
      batchId: 'batch-1',
      phoneModelId: 'phone-1',
      sku: 'TEST-SKU-001',
      price: 29.9,
      stock: 50,
    });

  it('should create a variant with correct defaults', () => {
    const variant = createVariant();

    expect(variant.isActive).toBe(true);
    expect(variant.isInStock).toBe(true);
    expect(variant.price).toBe(29.9);
    expect(variant.stock).toBe(50);
  });

  it('should report not in stock when stock is zero', () => {
    const variant = createVariant();
    variant.updateStock(0);

    expect(variant.isInStock).toBe(false);
  });

  it('should report not in stock when deactivated', () => {
    const variant = createVariant();
    variant.deactivate();

    expect(variant.isInStock).toBe(false);
    expect(variant.isActive).toBe(false);
  });

  it('should throw when setting negative stock', () => {
    const variant = createVariant();

    expect(() => variant.updateStock(-1)).toThrow('Estoque não pode ser negativo');
  });

  it('should throw when setting zero or negative price', () => {
    const variant = createVariant();

    expect(() => variant.updatePrice(0)).toThrow('Preço deve ser positivo');
    expect(() => variant.updatePrice(-10)).toThrow('Preço deve ser positivo');
  });

  it('should update price and stock correctly', () => {
    const variant = createVariant();

    variant.update({ price: 49.9, stock: 100 });

    expect(variant.price).toBe(49.9);
    expect(variant.stock).toBe(100);
  });
});
