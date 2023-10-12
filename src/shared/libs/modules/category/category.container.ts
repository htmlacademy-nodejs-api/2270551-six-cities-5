import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AppComponent } from '../../../types/index.js';
import { CategoryService } from './category-service.interface.js';
import { DefaultCategoryService } from './category.service.js';
import { CategoryEntity, CategoryModel } from './category.entity.js';

export function createCategoryContainer() {
  const categoryContainer = new Container();

  categoryContainer.bind<CategoryService>(AppComponent.CategoryService).to(DefaultCategoryService);
  categoryContainer.bind<types.ModelType<CategoryEntity>>(AppComponent.CategoryModel).toConstantValue(CategoryModel);

  return categoryContainer;
}
