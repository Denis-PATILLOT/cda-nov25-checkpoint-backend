// fichier exécuté à chaque lancement de jest !
import { beforeEach } from "node:test";
import db from "./src/db/index";

beforeAll(async() => {
  await db.initialize();
});

beforeEach(async() => {
  await db.synchronize(true)
});

afterAll(async() => {
    await db.destroy();
});



