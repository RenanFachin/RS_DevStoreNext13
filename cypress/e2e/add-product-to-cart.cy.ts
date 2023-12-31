describe('add product to cart', () => {
  beforeEach(() => {
    // Acessando a página
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    // Clicando no primeiro produto que ele encontrar
    cy.get('a[href^="/product"]').first().click()

    // Garantindo a url que o usuário foi navegado para uma url que contenha product
    cy.url().should('include', '/product')

    // Procurar pelo botão "adicionar ao carrinho"
    cy.contains('Adicionar ao carrinho').click()

    // Fazendo a procura por Cart(1), o que significa que foi adicionado de maneira correta
    cy.contains('Cart(1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    // Clicando no primeiro produto que ele encontrar
    cy.get('a[href^="/product"]').first().click()

    // Garantindo a url que o usuário foi navegado para uma url que contenha product
    cy.url().should('include', '/product')

    // Procurar pelo botão "adicionar ao carrinho" e clicar 2 vezes
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    // Fazendo a procura por Cart(1), o que significa que foi adicionado de maneira correta
    cy.contains('Cart(1)').should('exist')
  })

  it('should be able to search for a product and add it to cart', () => {
    cy.searchByQuery('moletom')

    // Clicando no primeiro produto que ele encontrar
    cy.get('a[href^="/product"]').first().click()

    // Garantindo a url que o usuário foi navegado para uma url que contenha product
    cy.url().should('include', '/product')

    // Procurar pelo botão "adicionar ao carrinho"
    cy.contains('Adicionar ao carrinho').click()

    // Fazendo a procura por Cart(1), o que significa que foi adicionado de maneira correta
    cy.contains('Cart(1)').should('exist')
  })
})
