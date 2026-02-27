import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');
  await prisma.stockMovement.deleteMany();
  await prisma.product.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.phoneModel.deleteMany();
  await prisma.category.deleteMany();

  const cats = await Promise.all([
    prisma.category.create({ data: { name: 'Capinha Silicone' } }),
    prisma.category.create({ data: { name: 'Capinha Anti-Impacto' } }),
    prisma.category.create({ data: { name: 'Capinha Carteira' } }),
    prisma.category.create({ data: { name: 'Pelicula Vidro' } }),
    prisma.category.create({ data: { name: 'Pelicula Gel' } }),
    prisma.category.create({ data: { name: 'Carregador' } }),
    prisma.category.create({ data: { name: 'Cabo USB' } }),
    prisma.category.create({ data: { name: 'Fone de Ouvido' } }),
  ]);
  console.log('  OK ' + cats.length + ' categorias');

  const phones = await Promise.all([
    prisma.phoneModel.create({ data: { brand: 'Apple', name: 'iPhone 15' } }),
    prisma.phoneModel.create({ data: { brand: 'Apple', name: 'iPhone 15 Pro' } }),
    prisma.phoneModel.create({ data: { brand: 'Apple', name: 'iPhone 14' } }),
    prisma.phoneModel.create({ data: { brand: 'Samsung', name: 'Galaxy S24' } }),
    prisma.phoneModel.create({ data: { brand: 'Samsung', name: 'Galaxy S24 Ultra' } }),
    prisma.phoneModel.create({ data: { brand: 'Samsung', name: 'Galaxy A54' } }),
    prisma.phoneModel.create({ data: { brand: 'Xiaomi', name: 'Redmi Note 13' } }),
    prisma.phoneModel.create({ data: { brand: 'Motorola', name: 'Moto G84' } }),
  ]);
  console.log('  OK ' + phones.length + ' modelos');

  const slots: any[] = [];
  for (let i = 1; i <= 20; i++) {
    slots.push(await prisma.slot.create({ data: { label: 'Gancho ' + i } }));
  }
  console.log('  OK ' + slots.length + ' ganchos');

  const products: any[] = [];
  let slotIdx = 0;
  for (let c = 0; c < 3; c++) {
    for (let p = 0; p < 4; p++) {
      const stock = Math.floor(Math.random() * 30) + 5;
      const price = Math.floor(Math.random() * 60) + 15 + Math.random();
      const prod = await prisma.product.create({
        data: { categoryId: cats[c].id, phoneModelId: phones[p].id, slotId: slots[slotIdx % slots.length].id, name: cats[c].name + ' ' + phones[p].























$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$serverSrc = "$HOME\cellstore\packages\server\src"

$seed = @'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');
  await prisma.stockMovement.deleteMany();
  await prisma.product.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.phoneModel.deleteMany();
  await prisma.category.deleteMany();

  const cats = await Promise.all([
    prisma.category.create({ data: { name: 'Capinha Silicone' } }),
    prisma.category.create({ data: { name: 'Capinha Anti-Impacto' } }),
    prisma.category.create({ data: { name: 'Capinha Carteira' } }),
    prisma.category.create({ data: { name: 'Pelicula Vidro' } }),
    prisma.category.create({ data: { name: 'Pelicula Gel' } }),
    prisma.category.create({ data: { name: 'Carregador' } }),
    prisma.category.create({ data: { name: 'Cabo USB' } }),
    prisma.category.create({ data: { name: 'Fone de Ouvido' } }),
  ]);
  console.log('  OK ' + cats.length + ' categorias');

  const phones = await Promise.all([
    prisma.phoneModel.create({ data: { brand: 'Apple', name: 'iPhone 15' } }),
    prisma.phoneModel.create({ data: { brand: 'Apple', name: 'iPhone 15 Pro' } }),
    prisma.phoneModel.create({ data: { brand: 'Apple', name: 'iPhone 14' } }),
    prisma.phoneModel.create({ data: { brand: 'Samsung', name: 'Galaxy S24' } }),
    prisma.phoneModel.create({ data: { brand: 'Samsung', name: 'Galaxy S24 Ultra' } }),
    prisma.phoneModel.create({ data: { brand: 'Samsung', name: 'Galaxy A54' } }),
    prisma.phoneModel.create({ data: { brand: 'Xiaomi', name: 'Redmi Note 13' } }),
    prisma.phoneModel.create({ data: { brand: 'Motorola', name: 'Moto G84' } }),
  ]);
  console.log('  OK ' + phones.length + ' modelos');

  const slots = [];
  for (let i = 1; i <= 20; i++) {
    slots.push(await prisma.slot.create({ data: { label: 'Gancho ' + i } }));
  }
  console.log('  OK ' + slots.length + ' ganchos');

  const products = [];
  let slotIdx = 0;
  for (let c = 0; c < 3; c++) {
    for (let p = 0; p < 4; p++) {
      const stock = Math.floor(Math.random() * 30) + 5;
      const price = Number((Math.floor(Math.random() * 60) + 15 + Math.random()).toFixed(2));
      const prod = await prisma.product.create({
        data: {
          categoryId: cats[c].id,
          phoneModelId: phones[p].id,
          slotId: slots[slotIdx % slots.length].id,
          name: cats[c].name + ' ' + phones[p].name,
          price: price,
          stock: stock,
          isActive: true,
        },
      });
      products.push(prod);
      slotIdx++;
    }
  }
  console.log('  OK ' + products.length + ' produtos');

  let movCount = 0;
  for (const prod of products.slice(0, 8)) {
    await prisma.stockMovement.create({ data: { productId: prod.id, type: 'ENTRY', quantity: 20, reason: 'Entrada inicial' } });
    await prisma.stockMovement.create({ data: { productId: prod.id, type: 'EXIT', quantity: Math.floor(Math.random() * 5) + 1, reason: 'Venda balcao' } });
    movCount += 2;
  }
  console.log('  OK ' + movCount + ' movimentacoes');
  console.log('Seed finalizado!');
}

main().catch((e) => { console.error('Erro:', e); process.exit(1); }).finally(() => prisma.$disconnect());