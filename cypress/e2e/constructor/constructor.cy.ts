import cypress from "cypress";

describe('Добавление ингредиентов в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.viewport(1280, 720);
    cy.visit('');
  });
  
  it('Добавление булок', () => {
    cy.get('[data-cy=1]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains('Булка').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Булка').should('exist');
  });

  it('Добавление ингридиентов', () => {
    cy.get('[data-cy=2]').contains('Добавить').click();
    cy.get('[data-cy=4]').contains('Добавить').click();
    cy.get('[data-cy=Биокотлета]').should('exist')
      //.contains('Биокотлета')
      //.should('exist');
    cy.get('[data-cy=Соус]').should('exist')
      //.contains('Соус')
      //.should('exist');
  });
});

describe('Работы модального окна', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.viewport(1280, 720);
    cy.visit('')
  });

  Cypress.env('ingInfo', 'Информация о ингредиенте')

  it('Открытие модального окна ингредиента', () => {
    cy.contains(Cypress.env('ingInfo')).should('not.exist');
    cy.contains('Булка').click();
    cy.contains(Cypress.env('ingInfo')).should('exist');
    cy.get('#modals').contains('Булка').should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.contains('Булка').click();
    cy.contains(Cypress.env('ingInfo')).should('exist');
    cy.get('[data-cy=close_modal_Ingregient]').click();
    cy.contains(Cypress.env('ingInfo')).should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.contains('Булка').click();
    cy.contains(Cypress.env('ingInfo')).should('exist');
    cy.get('[data-cy=modal-overlay]').click('right', { force: true });
    cy.contains(Cypress.env('ingInfo')).should('not.exist');
  });
});

describe('Создание заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'orders.json' }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1280, 720);
    cy.visit('');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Сбор бургера и оформление заказа', function () {
    cy.get('[data-cy=1]').contains('Добавить').click();
    cy.get('[data-cy=2]').contains('Добавить').click();
    cy.get('[data-cy=4]').contains('Добавить').click();
    cy.get('[data-cy=place-an-order]').click();

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4', '1']
      });
    cy.get('[data-cy=order-num]').as('ordNum')
    cy.get('@ordNum').contains('79603').should('exist');
    cy.get('[data-cy=close_modal_Ingregient]').click();
    cy.get('@ordNum').should('not.exist');
  });

  it('Проверbить, что конструктор пуст', () => {
    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
    cy.get('[data-cy=constructor-bun-2]').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]').should('not.exist');
  });
});