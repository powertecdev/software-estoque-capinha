import { PrismaCategoryRepository, PrismaPhoneModelRepository, PrismaSlotRepository, PrismaProductRepository, PrismaStockMovementRepository } from './infrastructure/database/repositories';
import { ListCategoriesUseCase, CreateCategoryUseCase, UpdateCategoryUseCase, DeleteCategoryUseCase, ListPhoneModelsUseCase, CreatePhoneModelUseCase, UpdatePhoneModelUseCase, DeletePhoneModelUseCase, ListSlotsUseCase, CreateSlotUseCase, UpdateSlotUseCase, DeleteSlotUseCase, SearchProductsUseCase, CreateProductUseCase, UpdateProductUseCase, DeleteProductUseCase, CreateStockMovementUseCase, ListStockMovementsUseCase, GetProductMovementsUseCase } from './domain/use-cases';
import { CategoryController } from './application/controllers/CategoryController';
import { PhoneModelController } from './application/controllers/PhoneModelController';
import { SlotController } from './application/controllers/SlotController';
import { ProductController } from './application/controllers/ProductController';
import { StockMovementController } from './application/controllers/StockMovementController';

export function createContainer() {
  const catRepo = new PrismaCategoryRepository();
  const phoneRepo = new PrismaPhoneModelRepository();
  const slotRepo = new PrismaSlotRepository();
  const prodRepo = new PrismaProductRepository();
  const movRepo = new PrismaStockMovementRepository();

  const categoryCtrl = new CategoryController(new ListCategoriesUseCase(catRepo), new CreateCategoryUseCase(catRepo), new UpdateCategoryUseCase(catRepo), new DeleteCategoryUseCase(catRepo));
  const phoneModelCtrl = new PhoneModelController(new ListPhoneModelsUseCase(phoneRepo), new CreatePhoneModelUseCase(phoneRepo), new UpdatePhoneModelUseCase(phoneRepo), new DeletePhoneModelUseCase(phoneRepo));
  const slotCtrl = new SlotController(new ListSlotsUseCase(slotRepo), new CreateSlotUseCase(slotRepo), new UpdateSlotUseCase(slotRepo), new DeleteSlotUseCase(slotRepo));
  const productCtrl = new ProductController(new SearchProductsUseCase(prodRepo), new CreateProductUseCase(prodRepo), new UpdateProductUseCase(prodRepo), new DeleteProductUseCase(prodRepo));
  const movementCtrl = new StockMovementController(new CreateStockMovementUseCase(movRepo, prodRepo), new ListStockMovementsUseCase(movRepo), new GetProductMovementsUseCase(movRepo));

  return { categoryCtrl, phoneModelCtrl, slotCtrl, productCtrl, movementCtrl };
}