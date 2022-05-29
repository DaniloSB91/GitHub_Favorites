//class que vai conter a lógica dos dados
// como os dados são estruturados 

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries =  [
            {
                login: 'DaniloSB91',
                name: "Danilo SB",
                public_repos: '76',
                followers: '12.000'
            },
            {
                login: 'Jose',
                name: "JJ s",
                public_repos: '768',
                followers: '12.120'
            }
        ]
    
    }
}



//classe que vai criar a visualização e eventos do HTML

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')
        

        this.update()
    }

    update() {
        this.removeAllTer()

        this.entries.forEach(user => {
         const row = this.createRow()
         
         row.querySelector('.user img').src = `http://GitHub.com/${user.login}.png` 
         row.querySelector('.user img').alt = `Imagem de ${user.name}`
         row.querySelector('.user p').textContent = user.name 
         row.querySelector('.user spam').textContent = user.login
         row.querySelector('.repositories').textContent = user.public_repos
         row.querySelector('.followers').textContent = user.followers  


        this.tbody.append(row)

        })
    }


    createRow() {

        const tr = document.createElement('tr')

        const content = `
         <td class="user">
            <img src="http://GitHub.com/DaniloSB91.png" alt="Danilo Barão">
            <a href="http://GitHub.com/DaniloSB91" target="_black">
                <p>Danilo Barão</p>
                <spam>Danilo Barão</spam>
            </a>
        </td>
        <td class="repositories">1</td>
        <td class="followers">1</td>
        <td><button class="remove">&times;</button></td>
    `
        tr.innerHTML = content

        return tr
    }
    removeAllTer() {

        this.tbody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
    }
}