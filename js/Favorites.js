import { GithubUsers } from "./GithubUser.js"

//class que vai conter a lógica dos dados
// como os dados são estruturados 

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()




    }



    load() {

        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username) {

        try {

            const userExists = this.entries.find(entry => entry.login === username)

            console.log(userExists)
            if(userExists){
                throw new Error('Usuário já cadastrado')
            }



            const user = await GithubUsers.search(username)
         

            if (user.login === undefined) {
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch (error) {
            alert(error.message)

        }


    }

    delete(user) {
        // Higher-order functions (map, filter, find, reduce )
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries


        console.log(filteredEntries)

        this.update()
        this.save()
    }
}



//classe que vai criar a visualização e eventos do HTML

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.onadd()
        this.update()
    }

    onadd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }

    }

    update() {
        this.removeAllTer()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `http://GitHub.com/${user.login}.png`
            row.querySelector('.user a').href = `http://GitHub.com/${user.login}`

            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user spam').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOK = confirm('Tem certeza que deseja deletar essa linha?')

                if (isOK) {
                    this.delete(user)

                }
            }

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