fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => displayData(json))



const displayData = (data) => {
    const root = document.getElementById("root")
console.log(data)

let header = document.createElement("header")
let hero = document.createElement("h1")
hero.setAttribute("class","hero")
hero.innerText = "fauxMazon"
header.append(hero)
root.append(header)
    // let nightBtn = document.createElement("button")
    // nightBtn.innerText = "Stuff"
    // root.append(nightBtn)
    // let state = {
    //     modal: true,
    //     nightMode: false,
    // }
    // console.log(state.nightMode)

    // nightBtn.addEventListener("click", () => {
    //     state.nightMode = true
    // })
    let deps = data.reduce((a, b) => {
        if (!a[b.category]) {
            a[b.category] = [];
        }
        a[b.category].push(b)
        return a
    }, {})

    for (let category in deps) {
        let catCaps = category.split(" ").map(word => word.replace(word[0], word[0].toUpperCase())).join(" ")
        let department = document.createElement("div")
        // let departmentInner = document.createElement("div")
        department.setAttribute("class", "department")
        root.append(department)
        let departmentHeader = document.createElement("h1")
        departmentHeader.setAttribute("class", "dep-header")
        departmentHeader.innerText = catCaps
        department.append(departmentHeader)
        for (let i = 0; i < deps[category].length; i++) {
            department.append(card(deps[category][i]))

        }
    }
}

const card = (item) => {
    let card = document.createElement("div")
    card.setAttribute("class", "card")

    // let cardTitle = document.createElement("h3")
    // cardTitle.innerText = item.category
    // card.append(cardTitle)
    let figure = document.createElement("figure")
    let img = document.createElement("img")
    img.setAttribute("src", item.image)
    figure.append(img)
    card.append(figure)
    let itemTitle = document.createElement("h4")
    itemTitle.innerText = item.title
    card.append(itemTitle)


    //////////Modal

    //     let dialog = document.createElement("dialog")
    //     let xBtn = document.createElement("button")
    //     xBtn.innerText = "X"
    //     xBtn.addEventListener("click", ()=> {
    //         dialog.toggleAttribute("open")
    //     })
    //     dialog.append(xBtn)

    //     let description = document.createElement("p")
    //     description.innerText = item.description
    //     dialog.append(description)

    //     let diaBtn = document.createElement("button")
    //     diaBtn.innerText = "More Info"

    //    diaBtn.addEventListener("click", ()=> {
    //     dialog.setAttribute("open",state.modalOpen)
    //    })


    //     card.append(diaBtn)

    //     card.append(dialog)




    // let pricerat = document.createElement("div")
    // let price = document.createElement("p")

    // price.innerText = Number.isInteger(item.price) ? `$${item.price} each USD` : item.price.toString().split(".")[1].length < 2 ? `$${item.price.toString() + "0"} each USD` : `$${item.price} each USD`

    // let rat = document.createElement("p")
    // rat.innerText = `Rating ${"✔".repeat(Math.round(item.rating.rate))} (${item.rating.rate})`
    // pricerat.append(price)
    // pricerat.append(rat)

    // card.append(pricerat)


    ////////HomeMade modal/////////////////////////////////


    let description = document.createElement("p")
    description.innerText = item.description
    let pricerat = document.createElement("div")
    let price = document.createElement("p")

    price.innerText = Number.isInteger(item.price) ? `$${item.price.toString()+".00"} each USD` : item.price.toString().split(".")[1].length < 2 ? `$${item.price.toString() + "0"} each USD` : `$${item.price} each USD`

    let rat = document.createElement("p")
    rat.innerText = `Rating ${"✔".repeat(Math.round(item.rating.rate))} (${item.rating.rate}) average of ${item.rating.count} reviews`
    let goodReview = document.createElement("h1")
    goodReview.style.color = "green"
    if (item.rating.rate > 4) {
        goodReview.innerText = "Great Reviews!!"
    }
    pricerat.append(price)
    pricerat.append(goodReview)
    pricerat.append(rat)

    let desDiv = document.createElement("div")
    let showLess = document.createElement("button")
    showLess.innerText = "Show Less"
    desDiv.append(description)
    desDiv.append(pricerat)

    desDiv.append(showLess)
    desDiv.style = "display: none"

    showLess.addEventListener("click", () => {
        desDiv.style = "display: none"
        moreInfo.style = "opacity: 100"
        card.removeAttribute("class", "displayCard")
        card.setAttribute("class", "card")
    })

    let moreInfo = document.createElement("button")
    moreInfo.innerText = "More Info"
    card.append(moreInfo)


    moreInfo.addEventListener("click", () => {
        moreInfo.style = "display: none"
        desDiv.style = "opacity: 100"
        card.setAttribute("class", "displayCard")
    })

    card.append(desDiv)



    /////////////////////////////////////////////////////////
    return card
}

//Number.isInteger(item.price)?`$${item.price} each USD`:item.price.toString().split(".")[1].length < 2?`$${item.price.toString() + "0"} each USD`:`$${item.price} each USD`