'use strict';
import { Application, Router, renderFileToString } from "./deps.js";

let list = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Potatoes" },
    { id: 3, name: "2 Eggs" },
    { id: 4, name: "Toilet paper" },
    { id: 5, name: "Hairspray" },
];

const app = new Application();
const router = new Router();

let arrayLength = 5;

router.get("/", async (ctx) => {
    ctx.response.body = await renderFileToString(Deno.cwd() + "/index.ejs", {
        title: "Shopping list",
        products: list
    });
});

router.post("/addProduct", async (ctx) => {
    let formContent = await ctx.request.body({ type: 'form' }).value; 
    let name = formContent.get("newProductName"); 
    if (name) {
        list.push(
            { id: arrayLength++, name: name } 
        );
    }
    ctx.response.redirect("/"); 
});

router.post("/deleteProduct", async (ctx) => {
    let formContent = await ctx.request.body({ type: 'form' }).value; 
    let deleteProduct = formContent.get("productId"); 
    const index = list.findIndex(function (list, index) {
        if (list.id == deleteProduct)
            return true;
    });
    list.splice(index, 1);
    ctx.response.redirect("/"); 
})


router.post("/updateProduct", async (ctx) => {
    let formContent = await ctx.request.body({ type: 'form' }).value; 
    let oldProductId = formContent.get("oldProductIdVal"); 
    let newProductName = formContent.get("newProductName");
    if (newProductName) {
        const index = list.findIndex(function (list, index) {
            if (list.id == oldProductId)
                return true;
        });
        list.splice(index, 1, { id: oldProductId, name: newProductName });
    }
    ctx.response.redirect("/"); 
})

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
    console.log("Server is running");
});

await app.listen({ port: 8080 });