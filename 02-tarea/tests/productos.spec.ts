import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => { await page.goto('/') })

test('muestra exactamente cinco productos iniciales', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Gestión de productos' })).toBeVisible()
  await expect(page.locator('tbody tr')).toHaveCount(5)
  await expect(page.getByRole('cell', { name: 'Coca cola', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Fanta', exact: true })).toBeVisible()
})

test('registra, actualiza sin navegar, limpia y genera códigos distintos', async ({ page }) => {
  let navegaciones = 0
  page.on('framenavigated', () => navegaciones++)
  for (const descripcion of ['Café molido', 'Pan integral']) {
    await page.getByLabel('Descripción', { exact: false }).fill(descripcion)
    await page.getByLabel('Precio de venta').fill('12.50')
    await page.getByLabel('Categoría', { exact: false }).fill('Abarrotes')
    await page.getByRole('button', { name: 'Registrar producto' }).click()
    await expect(page.getByRole('cell', { name: descripcion, exact: true })).toBeVisible()
    await expect(page.getByRole('status')).toContainText('registrado correctamente')
    await expect(page.locator('#descripcion')).toHaveValue('')
    await expect(page.locator('#precio')).toHaveValue('')
    await expect(page.locator('#categoria')).toHaveValue('')
  }
  await expect(page.locator('tbody tr')).toHaveCount(7)
  const codigos = await page.locator('tbody tr td:first-child').allTextContents()
  expect(new Set(codigos).size).toBe(7)
  expect(navegaciones).toBe(0)
})

for (const descripcion of ['', 'ab', '   ']) {
  test(`rechaza descripción ${JSON.stringify(descripcion)}`, async ({ page }) => {
    await page.locator('#descripcion').fill(descripcion)
    await page.locator('#precio').fill('5')
    await page.locator('#categoria').fill('Bebidas')
    await page.getByRole('button', { name: 'Registrar producto' }).click()
    await expect(page.locator('#error-descripcion')).toBeVisible()
    await expect(page.locator('tbody tr')).toHaveCount(5)
  })
}

for (const precio of ['', '0', '-1']) {
  test(`rechaza precio ${JSON.stringify(precio)}`, async ({ page }) => {
    await page.locator('#descripcion').fill('Producto válido')
    await page.locator('#precio').fill(precio)
    await page.locator('#categoria').fill('Bebidas')
    await page.getByRole('button', { name: 'Registrar producto' }).click()
    await expect(page.locator('#error-precio')).toBeVisible()
    await expect(page.locator('tbody tr')).toHaveCount(5)
  })
}

test('rechaza categoría vacía', async ({ page }) => {
  await page.locator('#descripcion').fill('Producto válido')
  await page.locator('#precio').fill('5')
  await page.getByRole('button', { name: 'Registrar producto' }).click()
  await expect(page.locator('#error-categoria')).toBeVisible()
  await expect(page.locator('tbody tr')).toHaveCount(5)
})

test('Limpiar borra campos y mensajes de validación', async ({ page }) => {
  await page.locator('#descripcion').fill('ab')
  await page.locator('#precio').fill('-1')
  await page.getByRole('button', { name: 'Registrar producto' }).click()
  await expect(page.getByRole('alert')).toHaveCount(3)
  await page.getByRole('button', { name: 'Limpiar' }).click()
  for (const campo of ['descripcion', 'precio', 'categoria']) await expect(page.locator(`#${campo}`)).toHaveValue('')
  await expect(page.getByRole('alert')).toHaveCount(0)
  await expect(page.locator('tbody tr')).toHaveCount(5)
})

test('registros temporales y sin peticiones a un backend', async ({ page }) => {
  const peticiones: string[] = []
  page.on('request', request => { if (['fetch', 'xhr'].includes(request.resourceType())) peticiones.push(request.url()) })
  await page.locator('#descripcion').fill('Producto temporal')
  await page.locator('#precio').fill('5')
  await page.locator('#categoria').fill('Prueba')
  await page.getByRole('button', { name: 'Registrar producto' }).click()
  await expect(page.locator('tbody tr')).toHaveCount(6)
  expect(peticiones).toEqual([])
  await page.reload()
  await expect(page.locator('tbody tr')).toHaveCount(5)
  await expect(page.getByText('Producto temporal', { exact: true })).toHaveCount(0)
})

test('pantalla móvil sin desbordamiento de la página', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('heading', { name: 'Gestión de productos' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Registrar producto' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
