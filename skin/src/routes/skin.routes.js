import { Router } from "express";
import {
  validateSchema,
  validateParams,
} from "../middleware/validator.middleware.js";
import { skinSchema,skinBuySchema } from "../schemas/skin.schema.js";
import {   createSkins,  getSkins,   getMyskins,  updateMySkins,
  deleteMySkins,  getSkinById,  readJson } from "../controllers/skin.controller.js";
import { authenticate } from "../middleware/validateToken.js";

const router = Router();

/* GET /skins/avaible  Devuelve una lista de todas las skins disponibles para comprar. 
http://localhost:4000/skins/avaible */
router.get("/avaible", authenticate, getSkins);

/* POST /skins/buy Permite a los usuarios adquirir una skin y guardarla en la base de
datos. 
http://localhost:4000/skins/buy */
router.post("/buy", authenticate, validateSchema(skinBuySchema), createSkins);
// router.post("/buy", authenticate, validateSchema(skinSchema), createSkins);

/* GET /skins/myskins  Devuelve una lista de las skins compradas por el usuario. 
http://localhost:4000/skins/myskins */
router.get("/myskins", authenticate, getMyskins);

/* PUT /skins/color Permite a los usuarios cambiar el color de una skin comprada. 
http://localhost:4000/skins/1/color/rojo */
router.put("/:id/color/:color", authenticate, validateParams, updateMySkins);

/* DELETE skins/delete/{id} - Permite a los usuarios eliminar una skin comprada. 
http://localhost:4000/skins/delete/1 */
router.delete("/delete/:id", authenticate,validateParams,deleteMySkins);

/* GET /skin/getskin/{id} – Devuelve una determinada skin. 
http://localhost:4000/skins/skin/getskin/1    */
router.get("/skin/getskin/:id", authenticate,validateParams,getSkinById);


/* Implementar una función para leer las skins disponibles desde un archivo 
(por ejemplo, en formato JSON). 
http://localhost:4000/skins/readjson   */
router.get("/readjson", readJson);

export default router;
