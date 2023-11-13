describe('add product to cart', () => {
  it('should be able to navigate to the product page and add it to the cart', () => {
    // Acessando a página
    cy.visit('http://localhost:3000')

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
    // Acessando a página
    cy.visit('http://localhost:3000')

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
    // Acessando a página
    cy.visit('http://localhost:3000')

    // Buscando por um produto digitando na barra de pesquisa
    cy.get('input[name=q]').type('moletom').parent('form').submit()

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
