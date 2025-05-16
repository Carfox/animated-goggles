"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const DocumentController_1 = __importDefault(require("./interfaces/DocumentController"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.options('*', cors());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', ['http://localhost:3000', 'http://backend:3000', 'http://frontend']);
    res.send('Hola Mundo en express!');
});
app.use('/documents', DocumentController_1.default);
app.all('/{*any}', (req, res, next) => { });
app.listen(port, '0.0.0.0');
