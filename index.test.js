const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
//require('selenium-webdriver/safari')
require('chromedriver')
require('geckodriver')
const { querySelector } = require('./helpers')


const rootURL = 'http://www.google.com/ncr'
let driver, elementName, texto
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

beforeAll(async () => {
  driver = await new Builder().forBrowser('firefox').build()
})

//afterAll(async () => driver.quit())

it('initialises the context', async () => {
  await driver.get(rootURL)
})

it('Open google and search', async () => {

  await driver.findElement(By.name('q')).sendKeys('tottus sucursales', Key.RETURN);
 await driver.wait(until.titleIs('tottus sucursales - Buscar con Google'), 3000);
})

it('click on search result', async () => {

  await driver.wait(until.elementLocated(By.xpath("//*[@data-hveid='CAsQIw']")),50000);
  driver.findElement(By.xpath("//*[@data-hveid='CAsQIw']")).click();
//click sitio web
  await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div[3]/div[8]/div[1]/div[3]/div/div[2]/async-local-kp/div/div/div[1]/div/div/div/div[1]/div/div[1]/div/div[1]/div/div[1]/div/div[2]/div[1]/a")),50000);
  driver.findElement(By.xpath("/html/body/div[5]/div[3]/div[8]/div[1]/div[3]/div/div[2]/async-local-kp/div/div/div[1]/div/div/div/div[1]/div/div[1]/div/div[1]/div/div[1]/div/div[2]/div[1]/a")).click();

})

it('click on sitio web', async () => {
  await driver.wait(until.elementLocated(By.xpath("//*[@src='//www.tottus.cl/static/2538a//img/img-com/icons/sup_ico_recetas.png']")),50000);
  await driver.get("http://www.tottusrecetas.cl/");

  await driver.wait(until.elementLocated(By.xpath("//*[@src='wp-content/uploads/iconos/iconos_landing_tottus-3.png']")),50000);
  driver.findElement(By.xpath("//*[@src='wp-content/uploads/iconos/iconos_landing_tottus-3.png']")).click();

  //await driver.findElement(By.css(".btnfilter:nth-child(4)")).click();
  await driver.findElement(By.id("search")).click();
  await driver.findElement(By.id("search")).sendKeys("rollitos");
  //await driver.findElement(By.css("h3:nth-child(1)")).click();
  await driver.wait(until.elementLocated(By.xpath("//*[@src='wp-content/uploads/recetas/corona_rollito/principal.png']")),50000);
  driver.findElement(By.xpath("//*[@src='wp-content/uploads/recetas/corona_rollito/principal.png']")).click();

await driver.wait(until.elementLocated(By.id("tablePreparation")),50000);
texto = await driver.findElement(By.id("tablePreparation")).getText();


})

it('Tiene canela', () => {
  expect(texto).toContain('canela');
});

it('azucar rubia', () => {
  expect(texto).toContain('car rubia');
});

//it('pebre', () => {
//  expect(texto).toContain('pebre');
//});

async function getElementById(id) {
  const el = await driver.wait(until.elementLocated(By.id(id)), waitUntilTime)
  return await driver.wait(until.elementIsVisible(el), waitUntilTime)
}
async function getElementByXPath(xpath) {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), waitUntilTime)
  return await driver.wait(until.elementIsVisible(el), waitUntilTime)
}
