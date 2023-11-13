describe('search products', () => {
  it('should be able to search for products', () => {
    cy.visit('/')

    // Buscando por um produto digitando na barra de pesquisa
    cy.get('input[name=q]').type('moletom').parent('form').submit()

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    // Clicando no primeiro produto que ele encontrar
    cy.get('a[href^="/product"]').should('exist')
  })

  it('should not be able to visit search page without a search query', () => {
    // Fazendo o erro não ser "tratado"
    cy.on('uncaught:exception', () => {
      return false
    })

    // Tentando fazer a visita para /search sem passar um parâmetro
    cy.visit('/search')

    // Ao tentar ir para /search sem parâmetro, o usuário deve ser redirecionado para a home
    cy.location('pathname').should('equal', '/')
  })
})
