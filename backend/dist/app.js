"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DocumentController_1 = __importDefault(require("./interfaces/DocumentController"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hola Mundo en express!');
});
app.use('/documents', DocumentController_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
