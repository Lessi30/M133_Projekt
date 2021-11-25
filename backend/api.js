'use strict'
import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { v4 } from "https://deno.land/std@0.77.0/uuid/mod.ts";

let cards = [
    {id: v4.generate(), beschreibung: "Das ist eine Karte"}
];

const router = new Router();

router
    .get("/api/cards", context => context.response.body =cards);

export const apiRoutes = router.routes();