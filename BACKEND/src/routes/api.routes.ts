import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CheckoutController } from "../controllers/checkout.controller";
const router = Router();
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);
router.post("/users", UserController.create);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

router.get("/checkout-requests", CheckoutController.getAll);
router.get("/checkout-requests/:id", CheckoutController.getById);
router.post("/checkout-requests", CheckoutController.create);
router.put("/checkout-requests/:id", CheckoutController.update);
router.delete("/checkout-requests/:id", CheckoutController.delete);
export default router;